const { Users, Products, Library } = require('../../data/db');
const { Router } = require('express');
route = Router();
const { auth } = require('../../middleware/auth');
const { CartProducts, AddToCart } = require('../../controllers/userLibrary');

route.get('/', auth, async (req, res) => {
	const user = await Users.findOne({
		attributes: [ 'name', 'username', 'email', 'phone_Number', 'Address', 'token', 'Coins' ],
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
				'tag'
			],
			where: { refrenceId: cart[i] }
		});
		products.push(item);
	}

	res.send(products);
});

route.post('/Cart', auth, async (req, res) => {
	let products = [];
	const cart = await AddToCart(req.user.username, req.body.refId);
	if (cart) {
		products = cart;
		console.log(products);

		res.send(products);
	} else {
		res.send({ error: ' internal cart error' });
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

module.exports = { route };
