const { Users, Products, Review, Comments } = require('../data/db');
const { getrandomstring } = require('../utils/string');
const { saveThis } = require('../utils/FileSaver');
const { bookValue } = require('../utils/BookValue');

async function getAllProducts(SellerUsername) {
	const products = await Products.findAll({
		where: { SellerUsername: SellerUsername }
	});

	return products;
}

async function createProduct(
	SellerUsername,
	category,
	title,
	s_title,
	short_des,
	Description,
	tag,
	MRP,
	start,
	end,
	files
) {
	let mrp = parseInt(MRP);
	let cover_img = await saveThis(files.cover_img, 'cover');
	if (cover_img.error) {
		return false;
	}
	console.log('cp f' + start + ' ' + end);
	let file = { url: null, sample_url: null };
	if (files.product_file) {
		file = await saveThis(files.product_file, 'file', start, end);
		if (file.error) {
			return false;
		}
	}

	let keyword = title + s_title + short_des + Description;
	keyword = keyword.toLowerCase();

	const newproduct = await Products.create({
		refrenceId: getrandomstring(16),
		SellerUsername,
		category,
		title,
		s_title,
		short_des,
		Description,
		tag,
		Value: mrp,
		product_file: file.url,
		cover_img: cover_img.url,
		sample_pro: file.sample_url,
		keywords: keyword
	});

	return newproduct;
}

async function createReview(userId, comment, Rating, productId, user_img) {
	const review = await Review.create({
		comment,
		userId,
		Rating,
		productId,
		user_img
	});
	return review;
}

module.exports = { createProduct, getAllProducts, createReview };
async function createComment(userId, body, productId) {
	const comment = await Comments.create({
		body,
		userId,
		productId
	});
	const newcomment = await Comments.findOne({
		where: { id: comment.id },
		attributes: [ 'id', 'body', 'userId', 'productId' ]
	});
	return newcomment;
}
