const { Users, Products } = require('../data/db');
const { getrandomstring } = require('../utils/string');
const { bookValue } = require('../utils/BookValue');

async function getAllProducts(SellerUsername) {
	const products = await Products.findAll({
		attributes: [ 'refrenceId', 'category', 'BookName', 'BookAuthor', 'Edition', 'Description', 'old', 'Value' ],
		where: { SellerUsername: SellerUsername }
	});

	return products;
}

async function createProduct(SellerUsername, category, BookName, BookAuthor, Edition, Description, tag, MRP) {
	let mrp = parseInt(MRP);

	const newproduct = await Products.create({
		refrenceId: getrandomstring(16),
		SellerUsername,
		category,
		BookName,
		BookAuthor,
		Edition,
		Description,
		tag,
		Value: mrp + mrp * 0.1
	});

	const product = await Products.findOne({
		attributes: [ 'refrenceId', 'category', 'BookName', 'BookAuthor', 'Edition', 'Description', 'tag', 'Value' ],
		where: { refrenceId: newproduct.refrenceId },
		include: [
			{
				attributes: [ 'username', 'Address', 'phone_Number', 'email' ],
				model: Users,
				as: 'Seller'
			}
		]
	});

	return product;
}

module.exports = { createProduct, getAllProducts };
