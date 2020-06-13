const { createComment } = require('../../controllers/products');
const { Comments } = require('../../data/db');
const { Router } = require('express');
const route = Router();
const Sequelize = require('sequelize');
const { auth } = require('../../middleware/auth');

route.post('/', auth, async (req, res) => {
	const comment = await createComment(req.user.username, req.body.body, req.body.id);
	res.send(comment);
});

route.get('/:id', async (req, res) => {
	console.log(req.params);
	const comments = await Comments.findAll({
		where: { productId: req.params.id }
	});

	console.log('comments aaye' + req.params.id);
	res.send(comments);
});

module.exports = { route };
