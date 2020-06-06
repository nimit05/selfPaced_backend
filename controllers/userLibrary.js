const { Library, Users, Products } = require('../data/db');

async function AddToLibrary(userId, ProductId) {
	const item = await Library.create({
		userId,
		ProductId
	});

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
// AddToCart();

async function CartProducts(username) {
	const user = await Users.findOne({
		where: { username }
	});

	if (user.Cart != null) {
		var arr = user.Cart.split(';');
		console.log(user.Cart);
		return arr;
	} else {
		return [];
	}
}

module.exports = {
	AddToLibrary,
	LibraryProducts,
	AddToCart,
	CartProducts
};
