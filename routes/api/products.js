const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { Users, Products } = require('../../data/db');
const { getAllProducts } = require('../../controllers/products');
const { AddToCart, AddToLibrary, CartProducts } = require('../../controllers/userLibrary');

var lib = [];

route.post('/Buy', auth, async (req, res) => {
	const item = await AddToLibrary(req.user.username, req.body.refrenceId);
	const product = await Products.findOne({
		where: { refrenceId: req.params.refrenceId }
	});
	if (req.user.Coins - product.Value < 0) {
		res.send('Insufficient Coins');
	} else {
		req.user.Coins = req.user.Coins - product.Value;
		req.user.save();
	}
	res.send(item);
});

route.post('/AddToCart', auth, async (req, res) => {
	const cart = await AddToCart(req.user.username, req.body.refrenceId);
	res.send(cart);
});

route.post('/RemoveFromCart', auth, async (req, res) => {
	const cart = await CartProducts(req.user.username);
	cart.splice(cart.indexOf(req.body.refrenceId), 1);
	req.user.Cart = cart.join(';');
	req.user.save();
	res.send(req.user.Cart);
});

route.get('/myproducts', auth, async (req, res) => {
	const products = await getAllProducts(req.user.username);
	res.send({ products });
});

route.get('/', async (req, res) => {
	const products = await Products.findAll({
		attributes: [
			'refrenceId',
			'category',
			'BookName',
			'BookAuthor',
			'Edition',
			'Description',
			'tag',
			'Value',
			'cover_img',
			'product_file'
		]
	});

	res.send({ products });
});

module.exports = { route };
