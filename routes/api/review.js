const { createReview } = require('../../controllers/products');
const { Review, Products, Users } = require('../../data/db');
const { Router } = require('express');
const route = Router();
const Sequelize = require('sequelize');
const { auth } = require('../../middleware/auth');
const {adminAuth} = require('../../middleware/adminAuth')

route.post('/', auth, async (req, res) => {
	let name = req.user.f_name
	if(req.user.l_name){
		name = name + req.user.l_name
	}
	const review = await createReview(
		req.user.username,
		req.body.comment,
		req.body.rating,
		req.body.productId,
		req.user.pro_img,
		name
	);
	const product = await Products.findOne({
		where: { id: req.body.productId }
	});

	const reviews = await Review.findAll({
		where: { productId: req.body.productId }
	});

	if (product.rating == null) {
		product.rating = req.body.rating;
		product.save();
	} else {
		let x = product.rating * (reviews.length - 1);
		product.rating = (x + parseInt(req.body.rating)) / reviews.length;

		product.save();
	}

	res.send(review);
});

route.get('/:id', async (req, res) => {
	const comments = await Review.findAll({
		where: { productId: req.params.id }
	});

	res.send(comments);
});

route.get('/isAllowed/:id', auth, async (req, res) => {
	const comment = await Review.findOne({
		where: {
			[Sequelize.Op.and]: [ { userId: req.user.username }, { productId: req.params.id } ]
		}
	});
	if (comment) {
		res.send(true);
	} else {
		res.send(false);
	}
});

route.get('/getAll/:userId', auth, async (req, res) => {
	const reviews = await Review.findAll({
		where: { userId: req.params.userId }
	});
	res.send(reviews);
});

route.post('/report', auth, async (req, res) => {
	const review = await Review.findOne({
		where: { id: req.body.id }
	});
	let arr = review.reports.split(';');
	arr.push(req.user.username);
	console.log(arr)
	review.reports = arr.join(';');
	review.save();
	console.log(review.reports)
	res.send(true);
});

route.delete('/:id', auth, async (req, res) => {
	const review = await Review.findOne({
		where: { id: req.params.id }
	});
	review.destroy();
	
});

route.get('/reports/:id', async (req, res) => {
	const review = await Review.findOne({
		where: { id: req.params.id }
	});
	let arr = review.reports.split(';');
	res.send(arr);
});

route.get('/' , adminAuth , async(req,res) => {
	const review = await Review.findAll()
	res.send(review)
})

route.get('/isReported/:id' , auth , async(req,res) => {
	const review = await Review.findOne({
		where : {id : req.params.id}
	})
	let arr = review.reports.split(';')
	for(let i = 0 ; i < arr.length ; i++){
		if( arr[i] == req.user.username){
			res.send(true)
		}
	}
})

module.exports = { route };
