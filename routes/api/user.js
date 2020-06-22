const { Users, Products, Library, Transaction } = require('../../data/db');
const { Router } = require('express');
route = Router();
const { auth } = require('../../middleware/auth');
const { CartProducts, AddToLibrary } = require('../../controllers/userLibrary');
const Sequelize = require('sequelize');
const { createTransaction, addreport } = require('../../controllers/user');

route.get('/', auth, async (req, res) => {
	const user = await Users.findOne({
		attributes: [
			'name',
			'username',
			'email',
			'phone_Number',
			'Address',
			'pro_img',
			'Coins',
			'Earnings',
			'reports'
		],
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

route.delete('/CheckoutFromCart', auth, async (req, res) => {
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
		where: { userId: req.user.username },
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

route.get('/getAll', auth, async (req, res) => {
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

module.exports = { route };
