const { Users, Products, Review, Comments } = require('../data/db');
const { getrandomstring } = require('../utils/string');
const { saveThis } = require('../utils/FileSaver');

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
	branch,
	start,
	end,
	files
) {
	var date = new Date();
    let month = date.getMonth() + 1;
	let year = date.getFullYear()
	let today = date.getDate()

	if (parseInt(month) < 10) {
		month = "0" + month;
	  }

	  if (parseInt(today) < 10) {
		today = "0" + today;
	  }

	let final = year + '-' + month + '-' + today

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
		branch,
		product_file: file.url,
		cover_img: cover_img.url,
		sample_pro: file.sample_url,
		keywords: keyword,
		date : final
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

async function addreport(username , refId){
	try{
	const product = await Products.findOne({
		where : {refrenceId : refId}
	})	
	let arr = product.reports.split(';')
	arr.push(username)
	product.reports = arr.join(';')
	console.log(arr)
	product.save()
	return true
	  }
	  catch(err){
		return false
	  }
}

module.exports = { createProduct, getAllProducts, createReview , addreport };

