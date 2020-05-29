const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { Users, Products } = require('../../data/db');
const { getAllProducts } = require('../../controllers/products');
const { AddToCart, AddToLibrary } = require('../../controllers/userLibrary');

var lib = [];

route.post('/:refrenceId/Buy', auth, async (req, res) => {
	const item = await AddToLibrary(req.user.username, req.params.refrenceId);
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

route.post('/:refrenceId/AddToCart', auth, async (req, res) => {
	const cart = await AddToCart(req.user.username, req.params.refrenceId);
	res.send(cart);
});

route.get('/myproducts', auth ,  async (req, res) => {
	const products = await getAllProducts(req.user.username);
	res.send({ products });
});

route.get('/', async (req, res) => {
	const products = await Products.findAll({
		attributes: [ 'refrenceId', 'category', 'BookName', 'BookAuthor', 'Edition', 'Description', 'tag', 'Value' ]
	});

	res.send({ products });
});

module.exports = { route };
