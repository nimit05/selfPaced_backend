const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { createProduct } = require('../../controllers/products');

route.post('/', auth, async (req, res) => {
	console.log(req.user.username);
	const a = req.body.product;
	console.log(req.body);
	const product = await createProduct(
		req.user.username,
		a.category,
		a.BookName,
		a.BookAuthor,
		a.Edition,
		a.Description,
		a.tag,
		a.MRP
	);

	res.send(product);
});

module.exports = { route };
