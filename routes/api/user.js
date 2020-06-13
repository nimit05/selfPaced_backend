const { Users, Products, Library , Transaction } = require('../../data/db');
const { Router } = require('express');
route = Router();
const { auth } = require('../../middleware/auth');
const { CartProducts  , AddToLibrary} = require('../../controllers/userLibrary');
const Sequelize = require('sequelize')

route.get('/', auth, async (req, res) => {
	const user = await Users.findOne({
		attributes: [ 'name', 'username', 'email', 'phone_Number', 'Address', 'pro_img', 'Coins' , 'Earnings' ],
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
				'BookName',
				'BookAuthor',
				'Edition',
				'Description',
				'Value',
				'cover_img'
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
		let arr = []
		if(req.user.Cart != null){
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
				'BookName',
				'BookAuthor',
				'Edition',
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
	if (a.phone_Number) {
		req.user.phone_Number = a.phone_Number;
		req.user.save();
	}
	if (a.Address) {
		req.user.Address = a.Address;
		req.user.save();
	}

	res.send(req.user);
});


route.delete('/CheckoutFromCart' , auth , async(req,res) => {

	const user = await Users.findOne({
		where : {username : req.user.username}
	})


	const  arr = await CartProducts(req.user.username) 
	for(let i = 0 ; i <arr.length;i++){
		const product = await Products.findOne({
			where: { refrenceId: arr[i] }
		});
		if(product){
		const lib_item = await Library.findOne({
			where:{
				[Sequelize.Op.and] :[
					{userId : req.user.username},
					{ProductId : product.id }
				]
			}
		})
		
		if(!lib_item){
			const item = await AddToLibrary(req.user.username, product.id).catch((err) => {
				console.log(err);
				res.send({ error: 'internal error' + err });
			})
			const seller = await Users.findOne({
				where : {username : product.SellerUsername}
			})
		
		
		seller.Coins = seller.Coins + product.Value
		seller.save()
		}
	}
}

		user.Cart = ' '
		user.save()

		user.Coins = req.body.coins
		user.save()

	res.send(user)
})

route.get('/transaction' , auth , async(req,res) => {
	const trans = await Transaction.findAll({
		where : {userUsername : req.user.username}
	})
	console.log(trans)
	res.send(trans)
	
})

route.get('/products' , auth , async(req,res) => {
	const products = await Products.findAll({
		where : {SellerUsername : req.user.username}
	})
	console.log('hogybhaiyaa' )
	res.send(products)
})

module.exports = { route };
