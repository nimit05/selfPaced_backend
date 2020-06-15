const { Users , Transaction } = require('../data/db');
const { getrandomstring } = require('../utils/string');
const { sendOtpToMail } = require('../utils/emailVeri');

async function createusers(name, username, email, password, phone_Number, pro_img, otp) {
	let finduser = await Users.findOne({
		where: {
			username: username
		}
	});

	let efinduser = await Users.findOne({
		where: {
			email: email
		}
	});

	let pfinduser = await Users.findOne({
		where: {
			phone_Number: phone_Number
		}
	});

	if (finduser || efinduser || pfinduser) {
		let err = '';

		if (finduser) {
			err = err + ' username exist';
		}
		if (efinduser) {
			err = err + ' email exist';
		}
		if (pfinduser) {
			err = err + ' phonenumber exist';
		}

		return { error: err };
	}

	const user = await Users.create({
		name,
		username,
		email,
		password,
		phone_Number,
		token: getrandomstring(32),
		OTP: otp,
		Verified: false,
		pro_img,
		Coins: '1000'
	});
	await sendOtpToMail(email, otp).catch((err) => {
		user.delete();
		console.log({ error: 'unable to send email error :- ' + err });
		return { error: 'can not register your account internal error' };
	});

	const newuser = await Users.findOne({
		attributes: [ 'name', 'username', 'email', 'phone_Number', 'Coins', 'token',  ],
		where: { token: user.token }
	});
	setTimeout(() => {
		newuser.OTP = null;
		newuser.save();
	}, 150000);
	return newuser;
}

async function findUserByOTP(OTP) {
	const user = await Users.findOne({
		attributes: [ 'name', 'username', 'email', 'phone_Number' ],
		where: { OTP }
	});

	if (!user) {
		return { body: [ 'Invalid OTP' ] };
	}
	const ys = 'verified Succesfully';
	return ys;
}

async function findUserByToken(token) {
	const user = await Users.findOne({
		where: { token }
	});

	if (!user) {
		return { body: [ 'Invalid token' ] };
	}

	return user;
}

async function findUser(username, password) {
	const auth = await Users.findOne({
		where: { username }
	});

	return auth;
}
async function findUserByEmail(email) {
	const auth = await Users.findOne({
		where: { email }
	});

	return auth;
}

async function updateUserDet(username, name, password, img) {
	const user = await User.findOne({
		where: {
			username: username
		}
	});

	if (user) {
		user.name = name;
		user.password = password;
		user.pro_img = img;

		User.save();

		return true;
	} else {
		return false;
	}
}

async function verified(email) {
	let user = await Users.findOne({
		where: {
			email: email
		}
	}).catch(() => {
		return false;
	});

	if (user) {
		user.Verified = true;
		user.save();
		return true;
	} else {
		return false;
	}
}

async function Libraryfounder(username) {
	let user = await Users.findOne({
		where: { username }
	});

	return user.Library[1];
}

async function isUserExistEmail(email) {
	let user = await Users.findOne({
		where: {
			email
		}
	});

	if (user) {
		return user;
	} else {
		return false;
	}
}

async function createGoogleUser(user) {
	try {
		let token = getrandomstring(32);
		let newUser = await Users.create({
			username: user.email,
			email: user.email,
			name: user.name,
			pro_img: user.pro_pic,
			Verified: true,
			Coins: '1000',
			token: token
		});

		return newUser;
	} catch (err) {
		return { error: err };
	}
}


async function createTransaction(itemId , Value , Debited , userId ){
	const trans = await Transaction.create({
		TransactionId : getrandomstring(30),
		itemId,
		Value,
		Debited,
		userId
	})

	const new_transc = await Transaction.findOne({
		where : {TransactionId : trans.TransactionId},
		include : {
			attributes : [
			'id',
			'refrenceId',
			'category',
			'BookName',
			'BookAuthor',
			'Edition',
			'Description',
			'tag',
			'Value',
			'cover_img',
			'product_file',
			'SellerUsername' ],
			model : Products,
			as : 'item'
		}
	})
	return new_transc
}

module.exports = {
	createusers,
	findUserByOTP,
	findUserByToken,
	findUser,
	findUserByEmail,
	verified,
	Libraryfounder,
	isUserExistEmail,
	createGoogleUser,
	createTransaction
};
