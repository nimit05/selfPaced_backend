const { Router } = require('express');
const route = Router();
const { auth } = require('../../middleware/auth');
const {adminAuth} = require('../../middleware/adminAuth')
const { Users, Products, Library, Review, Transaction } = require('../../data/db');
const { getAllProducts, addreport } = require('../../controllers/products');
const { AddToCart, AddToLibrary, CartProducts } = require('../../controllers/userLibrary');
const { createTransaction } = require('../../controllers/user');
const Sequelize = require('sequelize');

route.post('/Buy', auth, async (req, res) => {
	try {
		const product = await Products.findOne({
			where: { refrenceId: req.body.refrenceId }
		});
		product.ownBy++;
		product.save();
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

			res.send(item);
		} else {
			res.send('already Have');
		}
	} catch (err) {
		res.send({ error: 'internal' });
	}
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
	let pro_ref = await Library.findAll({
		where: { userId: req.user.username },
		include: { model: Products, as: 'Product' }
	}).catch((err) => {
		console.log(err);
		res.send({ error: 'internal error' });
	});

	res.send(pro_ref);
});
route.get('/cat/:category/:limit/:offset', async (req, res) => {
	try {
		let Limit = 10;
		let Offset = 0;

		if (req.params.limit) {
			Limit = parseInt(req.params.limit);
		}
		if (req.params.offset) {
			Offset = parseInt(req.params.offset);
		}

		const products = await Products.findAll({
			attributes: [
				'refrenceId',
				'category',
				'title',
				's_title',
				'short_des',
				'Description',
				'tag',
				'Value',
				'cover_img',
				'createdAt',
				'rating',
				'branch'
			],
			order: [ [ 'createdAt', 'DESC' ] ],
			limit: Limit,
			offset: Offset,
			where: { [Sequelize.Op.and]: [ { deleted: false }, { branch: req.params.category } ] }
		});

		res.send({ products });
	} catch (err) {
		console.log(err);

		res.status(500).send({ error: 'internal Error' });
	}
});
route.get('/mostB/:limit/:offset', async (req, res) => {
	try {
		let Limit = 10;
		let Offset = 0;

		if (req.params.limit) {
			Limit = parseInt(req.params.limit);
		}
		if (req.params.offset) {
			Offset = parseInt(req.params.offset);
		}
		const products = await Products.findAll({
			attributes: [
				'refrenceId',
				'category',
				'title',
				's_title',
				'short_des',
				'Description',
				'tag',
				'Value',
				'cover_img',
				'createdAt',
				'rating'
			],
			order: [ [ 'ownBy', 'DESC' ] ],
			limit: Limit,
			offset: Offset,
			where: { deleted: false }
		});

		res.send({ products });
	} catch (err) {
		console.log(err);

		res.status(500).send({ error: 'internal Error' });
	}
});
route.get('/rated/:limit/:offset', async (req, res) => {
	try {
		let Limit = 10;
		let Offset = 0;

		if (req.params.limit) {
			Limit = parseInt(req.params.limit);
		}
		if (req.params.offset) {
			Offset = parseInt(req.params.offset);
		}
		const products = await Products.findAll({
			attributes: [
				'refrenceId',
				'category',
				'title',
				's_title',
				'short_des',
				'Description',
				'tag',
				'Value',
				'cover_img',
				'createdAt',
				'rating'
			],
			order: [ [ 'rating', 'DESC' ] ],
			limit: Limit,
			offset: Offset,
			where: { deleted: false }
		});

		res.send({ products });
	} catch (err) {
		console.log(err);

		res.status(500).send({ error: 'internal Error' });
	}
});

route.get('/latest/:limit/:offset', async (req, res) => {
	try {
		let Limit = 10;
		let Offset = 0;

		if (req.params.limit) {
			Limit = parseInt(req.params.limit);
		}
		if (req.params.offset) {
			Offset = parseInt(req.params.offset);
		}
		const products = await Products.findAll({
			attributes: [
				'refrenceId',
				'category',
				'title',
				's_title',
				'short_des',
				'Description',
				'tag',
				'Value',
				'cover_img',
				'createdAt',
				'rating'
			],
			order: [ [ 'createdAt', 'DESC' ] ],
			limit: Limit,
			offset: Offset,
			where: { deleted: false }
		});

		res.send({ products });
	} catch (err) {
		console.log(err);

		res.status(500).send({ error: 'internal Error' });
	}
});
route.get('/Name', async (req, res) => {
	const products = await Products.findAll({
		attributes: [ 'refrenceId', 'title' ]
	});

	res.send({ products });
});

route.get('/specific/:refrenceId', async (req, res) => {
	const product = await Products.findOne({
		where: { refrenceId: req.params.refrenceId },
		attributes: [
			'id',
			'refrenceId',
			'category',
			'title',
			's_title',
			'short_des',
			'rating',
			'Description',
			'tag',
			'Value',
			'cover_img',
			'sample_pro',
			'SellerUsername',
			'branch'
		]
	});
	res.send(product);
});
route.delete('/:productId', auth, async (req, res) => {
	try {
		const product = await Library.destroy({
			where: {
				[Sequelize.Op.and]: [ { ProductId: req.params.productId }, { userId: req.user.username } ]
			}
		});

		res.send(true);
	} catch (err) {
		console.error(err);
		res.send({ error: 'Internal Error' });
	}
});

route.get('/search_item/:refId', auth, async (req, res) => {
	const product = await Library.findAll({
		where: {
			userId: req.user.username
		},
		include: { model: Products, as: 'Product' }
	}).catch((err) => {
		console.log(err);
		res.send({ error: 'internal error' });
	});

	if (product) {
		let a = true;
		product.map((e) => {
			if (e.Product.refrenceId === req.params.refId) {
				a = false;
				res.send(true);
			}
		});
		if (a) {
			res.send(false);
		}
	} else {
		res.send({ error: 'not found' });
	}
});

route.get('/search/:name', async (req, res) => {
	var arr = [];

	let s = '%' + req.params.name + '%';
	const products = await Products.findAll({
		attributes: [
			'refrenceId',
			'category',
			'title',
			's_title',
			'short_des',
			'Description',
			'tag',
			'cover_img',
			'rating',
			'keywords'
		],
		where: {
			keywords: { [Sequelize.Op.like]: s }
		}
	});

	res.send(products);
});

route.get('/Sold_products/:username', auth, async (req, res) => {
	const products = await Products.findAll({
		where: { SellerUsername: req.params.username }
	});
	res.send(products);
});



route.post('/report', auth, async (req, res) => {
	const report = await addreport(req.user.username, req.body.refId);
	res.send(report);
});

route.get('/reports/:refId', auth, async (req, res) => {
	const product = await Products.findOne({
		where: { refrenceId: req.params.refId }
	});
	let arr = product.reports.split(';');
	console.log(arr);
	res.send(arr);
});

route.get('/delete/:refId', auth, async (req, res) => {
	const product = await Products.findOne({
		where: { refrenceId: req.params.refId }
	});
	product.deleted = true;
	product.save();
	res.send(true);
});


route.get('/getall' , adminAuth , async(req,res) => {
	const pro = await Products.findAll()
	res.send(pro)
} )
module.exports = { route };
