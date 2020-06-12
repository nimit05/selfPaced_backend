const { Users, Products , Comments } = require('../data/db');
const { getrandomstring } = require('../utils/string');
const { saveThis } = require('../utils/FileSaver');
const { bookValue } = require('../utils/BookValue');

async function getAllProducts(SellerUsername) {
	const products = await Products.findAll({
		where: { SellerUsername: SellerUsername }
	});

	return products;
}

async function createProduct(SellerUsername, category, BookName, BookAuthor, Edition, Description, tag, MRP, files ) {
	let mrp = parseInt(MRP);
	let cover_img = await saveThis(files.cover_img, 'cover');
	if (cover_img.error) {
		return false;
	}
	let file = { url: null };
	if (files.product_file) {
		file = await saveThis(files.product_file, 'file');
		if (file.error) {
			return false;
		}
	}

	const newproduct = await Products.create({
		refrenceId: getrandomstring(16),
		SellerUsername,
		category,
		BookName,
		BookAuthor,
		Edition,
		Description,
		tag,
		Value: mrp ,
		product_file: file.url,
		cover_img: cover_img.url
	});
	
	return newproduct;
}

async function createComment(  body ,userId ,  productId){
	const comment = await Comments.create({
		body,
		userId,
		productId
	})
	const newcomment = await Comments.findOne({
		where : {id : comment.id},
		attributes : ['id' , 'body' , 'userId' , 'productId']
	})
	return newcomment;
}

module.exports = { createProduct, getAllProducts , createComment };
