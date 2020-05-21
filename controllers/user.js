const { Users } = require('../data/db');
const { getrandomstring } = require('../utils/string');

async function createusers(name, username, email, password, phone_Number,  pro_img, otp) {
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
		Cart:[],
		Library : []
    })

    const newuser = await Users.findOne({
        attributes: ['name', 'username', 'email', 'phone_Number', 'token'],
        where: { token: user.token }
    })
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

module.exports = { createusers, findUserByOTP, findUserByToken, findUser, findUserByEmail, verified };
