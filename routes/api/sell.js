const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { createProduct } = require('../../controllers/products');
const { Users } = require('../../data/db');
const { AddToLibrary } = require('../../controllers/userLibrary');

route.post('/', auth, async (req, res) => {
	try {
		const a = req.body;

		const product = await createProduct(
			req.user.username,
			a.category,
			a.title,
			a.short_title,
			a.short_des,
			a.B_des,
			a.tag,
			a.branch,
			req.files
		);
		let pro = await AddToLibrary(req.user.username, product.id);
		if (product) {
			res.status(200).send(true);
		} else {
			res.status(500).send(false);
		}
	} catch (err) {
		console.log(err);
		res.status(500).send(false);
	}
});

module.exports = { route };
