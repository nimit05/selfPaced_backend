const { Users, Products, Library, Transaction } = require('../../data/db');
const { Router } = require('express');
route = Router();
const { auth } = require('../../middleware/auth');
const { adminAuth } = require('../../middleware/adminAuth');
const { CartProducts, AddToLibrary } = require('../../controllers/userLibrary');
const Sequelize = require('sequelize');
const { createTransaction, addreport } = require('../../controllers/user');

route.get('/', auth, async (req, res) => {
	const user = await Users.findOne({
		
		where: { username: req.user.username }
	});

	res.send(user);
});

route.get('/Cart', auth, async (req, res) => {
	var products = [];
	const cart = await CartProducts(req.user.username);
	for (let i = 0; i < cart.length; i++) {
		let item = await Products.findOne({
			attributes: [
				'id',
				'refrenceId',
				'category',
				'title',
				's_title',
				'short_des',
				'Description',
				'Value',
				'cover_img',
				'tag'
			],
			where: { refrenceId: cart[i] }
		});
		if (item != null) {
			products.push(item);
		}
	}
	console.log(products.length);
	res.send(products);
});

route.get('/CartRefID', auth, async (req, res) => {
	if (req.user) {
		let arr = [];
		if (req.user.Cart != null) {
			arr = req.user.Cart.split(';');
		}
		res.send(arr);
	} else {
		res.send({ error: 'internal cardRefId error' });
	}
});

route.get('/Library', auth, async (req, res) => {
	var items = [];
	const item = await Library.findAll({
		where: { username: req.user.username }
	});
	console.log(item[0].Product_RefrenceId);
	for (let i = 0; i < item.length; i++) {
		let prdct = await Products.findOne({
			attributes: [
				'id',
				'refrenceId',
				'category',
				'title',
				's_title',
				'short_des',
				'Description',
				'old',
				'Value'
			],
			where: { refrenceId: item[i].Product_RefrenceId }
		});
		items.push(prdct);
	}

	res.send(items);
});

route.put('/', auth, (req, res) => {
	const a = req.body;
	if (a.username) {
		req.user.username = 'nimi';
		console.log(req.user.username);
		req.user.save();
		console.log(a.username);
	}
	if (a.email) {
		req.user.email = a.email;
		req.user.save();
	}
	if(a.name){
		req.user.name = a.name;
		req.user.save();
	}
	if (a.phone_Number) {
		req.user.phone_Number = a.phone_Number;
		req.user.save();
	}
	if (a.Address) {
		req.user.Address = a.Address;
		req.user.save();
	}
	if(a.bio){
		req.user.bio = a.bio
		req.user.save();
	}
	if(a.College){
		req.user.College = a.College
		req.user.save();
	}
	if(a.Qualification){
		req.user.Qualification = a.Qualification
		req.user.save();
	}

	res.send(req.user);
});

route.post('/CheckoutFromCart', auth, async (req, res) => {
	const user = await Users.findOne({
		where: { username: req.user.username }
	});

	const arr = await CartProducts(req.user.username);
	for (let i = 0; i < arr.length; i++) {
		const product = await Products.findOne({
			where: { refrenceId: arr[i] }
		});
		if (product) {
			const lib_item = await Library.findOne({
				where: {
					[Sequelize.Op.and]: [ { userId: req.user.username }, { ProductId: product.id } ]
				}
			});

			if (!lib_item) {
				const item = await AddToLibrary(req.user.username, product.id).catch((err) => {
					console.log(err);
					res.send({ error: 'internal error' + err });
				});
				const seller = await Users.findOne({
					where: { username: product.SellerUsername }
				});

				seller.Coins = seller.Coins + product.Value;
				seller.save();

				user.Coins = req.body.coins;
				user.save();

				const trans = await createTransaction(product.id, product.Value, true, req.user.username);
				console.log(trans.TransactionId);

				const trans2 = await createTransaction(product.id, 0.5 * product.Value, false, product.SellerUsername);
				console.log(trans2.refrenceId);
			}
		}
	}

	user.Cart = ' ';
	user.save();

	res.send(user);
});

route.get('/transaction', auth, async (req, res) => {
	const trans = await Transaction.findAll({
		where: {[Sequelize.Op.or] : [
			{Seller : req.user.username},
			{Customer : req.user.username}
		] },
		include: { model: Products, as: 'item' }
	});
	console.log(trans);
	console.log('recieved here');
	res.send(trans);
});

route.get('/products', auth, async (req, res) => {
	const products = await Products.findAll({
		where: { SellerUsername: req.user.username }
	});
	console.log('hogybhaiyaa');
	res.send(products);
});

route.get('/myorders', auth, async (req, res) => {
	const orders = await Transaction.findAll({
		where: {
			[Sequelize.Op.and]: [ { Debited: true }, { userId: req.user.username } ]
		},
		include: { model: Products, as: 'item' }
	});
	console.log(orders);
	console.log('orders has arrived');
	res.send(orders);
});

route.get('/getUser/:username', async (req, res) => {
	const user = await Users.findOne({
		where: { username: req.params.username }
	});
	res.send(user);
});

route.get('/getAll', adminAuth, async (req, res) => {
	const users = await Users.findAll();
	res.send(users);
});

route.post('/report', auth, async (req, res) => {
	const report = await addreport(req.user.username, req.body.username);
	res.send(report);
});

route.get('/reports/:username', async (req, res) => {
	const user = await Users.findOne({
		where: { username: req.params.username }
	});
	let arr = user.reports.split(';');
	console.log(arr + req.params.username);
	res.send(arr);
});

route.delete('/:username', auth, async (req, res) => {
	const user = await Users.findOne({
		where: { username: req.params.username }
	});
	console.log(user.email);
	user.destroy();
});


route.get('/earnings' , auth , async(req,res) => {
	const trans = await Transaction.findAll({
		where : {Seller : req.user.username}
	})

	const products = await Products.findAll({
		where : {SellerUsername : req.user.username}
	})

	var date = new Date();
    let month = date.getMonth() + 1;
	let year = date.getFullYear()

	if (parseInt(month) < 10) {
		month = "0" + month;
	  }

	let sdate = year + '-' + month 

	const monthly_copies = await Transaction.findAll({
		where : {
			[Sequelize.Op.and] : [
				{Seller : req.user.username},
				{date : {[Sequelize.Op.like] : [sdate + '%']}}
			]
		}
	})

	const m_Products = await Products.findAll({
		where : {
			[Sequelize.Op.and] : [
				{SellerUsername : req.user.username},
				{date : {[Sequelize.Op.like] : [sdate + '%']}}
			]
		}
	})

	let m_earnings = 0

	monthly_copies.map(e => {
		m_earnings = parseInt(m_earnings) + parseInt(e.Value)
	})

	res.send({copies : trans.length , products : products.length , 
		mCopies : monthly_copies ,m_Products : m_Products.length  , m_earnings : m_earnings 
	     ,earnings : req.user.Earnings })
})

route.get('/monthReport' , auth , async(req,res) => {
	var date = new Date();
    let month = date.getMonth() + 1;
	let year = date.getFullYear()
	let Det = []

	if (parseInt(month) < 10) {
		month = "0" + month;
	  }
	  let startdate = 1;
	  let enddate = 7;
  
	  while (parseInt(enddate) < 32) {
		if (parseInt(startdate) < 10) {
		  startdate = "0" + startdate;
		}
		if (parseInt(enddate) < 10) {
		  enddate = "0" + enddate;
		}
  
		let sdate = year + "-" + month + "-" + startdate;
		let edate = year + "-" + month + "-" + enddate;
		console.log(sdate + '%')
  
		const earnings = await Transaction.findAll({
		  where: {
			[Sequelize.Op.and]: [
			  { seller: req.user.username },
			  { date: { [Sequelize.Op.between]: [sdate  , edate]} }
			]
		  }
		});
  

  
		Det.push(earnings);
  
		startdate = parseInt(startdate) + 7;
		if(enddate === 21){
		enddate = parseInt(enddate) + 10
		}else{
			enddate = parseInt(enddate) + 7
		}
	  }
  
	  res.status(200).send(Det);
	

})


module.exports = { route };
