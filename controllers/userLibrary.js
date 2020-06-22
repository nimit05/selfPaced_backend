const { Library, Users, Products } = require('../data/db');

async function AddToLibrary(userId, ProductId) {
	console.log('lib');
	const item = await Library.create({
		userId,
		ProductId
	}).catch((err) => {
		console.log(err);
	});

	console.log(item);

	return item;
}

async function LibraryProducts(username) {
	const item = await Library.findAll({
		where: { librarianUsername: username }
	});
	return item.ProductRefrenceId[0];
}

async function AddToCart(username, refrenceId) {
	try {
		const user = await Users.findOne({
			where: { username }
		});
		const product = await Products.findOne({
			where: { refrenceId }
		});
		console.log(user);
		let arr = user.Cart.split(';');

		console.log(user.Cart);
		arr.push(product.refrenceId);
		user.Cart = arr.join(';');
		user.save();
		// console.log(user.Cart);

		return true;
	} catch (err) {
		return false;
	}
}




async function CartProducts(username) {
	const user = await Users.findOne({
		where: { username }
	});

	if (user.Cart != null) {
		var myset = new Set(user.Cart.split(';'))
		var arr = Array.from(myset)
		return arr;
	} else {
		return [];
	}
}

module.exports = {
	AddToLibrary,
	LibraryProducts,
	AddToCart,
	CartProducts,
	
};
