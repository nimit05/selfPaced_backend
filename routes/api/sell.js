const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const { createProduct } = require('../../controllers/products');
const { Users } = require('../../data/db');
const { AddToLibrary } = require('../../controllers/userLibrary');

route.post('/', auth, async (req, res) => {
	try {
		const a = req.body;
		console.log(a.branch)
		let sample_end = parseInt(a.sample_pages) + parseInt(a.sample_start) - 1;
		const product = await createProduct(
			req.user.username,
			a.category,
			a.title,
			a.short_title,
			a.short_des,
			a.B_des,
			a.tag,
			a.sample_start,
			a.branch ,
			sample_end,
			req.files
		);
		console.log(product);
		let pro = await AddToLibrary(req.user.username, product.id);
		if (product) {
			res.redirect('/');
		} else {
			res.redirect('/sell-your-product/error');
		}
	} catch (err) {
		console.log(err);
		res.redirect('/sell-your-product/internal-error');
	}
});

module.exports = { route };
