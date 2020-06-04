const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { createProduct } = require('../../controllers/products');

route.post('/', auth, async (req, res) => {
	console.log(req.body);
	console.log(req.files);
	const a = req.body;
	const product = await createProduct(
		req.user.username,
		a.category,
		a.title,
		a.short_title,
		a.short_des,
		a.des,
		a.tag,
		a.price,
		req.files
	);
	if (product) {
		res.redirect('/');
	} else {
		res.send(product);
	}
});

module.exports = { route };
