const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { createProduct } = require('../../controllers/products');
const { Users } = require('../../data/db');
const { AddToLibrary } = require('../../controllers/userLibrary');

route.post('/', auth, async (req, res) => {
	try {
		console.log(req.body);
		console.log(req.files);
		const a = req.body;
		const product = await createProduct(
			req.user.username,
			a.category,
			a.title,
			a.short_title,
			a.short_des,
			a.B_des,
			a.tag,
			a.price,
			req.files
		);
		console.log(product);
		let pro = await AddToLibrary(req.user.username, product.id);
		if (product) {
			res.redirect('/');
		} else {
			res.send(product);
		}
	} catch (err) {
		console.log(err);
		res.send({ error: 'internal error' });
	}
});

module.exports = { route };
