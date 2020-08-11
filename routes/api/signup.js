const { Router } = require('express');
const route = Router();
const {Users} = require('../../data/db')
require('dotenv').config()

const {
	createusers,
	findUserByOTP,
	verified,
	findUserByEmail,
	isUserExistEmail,
	createGoogleUser
} = require('../../controllers/user');
const fs = require('fs');
const { getrandomstring, getrandomnum } = require('../../utils/string');
const { auth } = require('../../middleware/auth');

route.post('/', async (req, res) => {
	const a = req.body.user;
	let img_url = null;
	let otp = getrandomnum(6);

	if (req.files) {
		const ran_name = getrandomstring(32);
		const img_name = req.files.pro_img.name;
		const data = req.files.pro_img.data;

		fs.writeFile(`${__dirname}../../data/pro-img/${ran_name}${img_name}`, data, (err) => {
			if (err) {
				console.log(err);
				res.send({ error: 'image can not be uploaded try not to upload that now ' });
			} else {
				img_url = ran_name + img_name;

				console.log('pro_image_saved');
			}
		});
	}

	const user = await createusers(a.name, a.username, a.email, a.password, a.phone_Number, img_url, otp);

	// const client = require('twilio')(accountSid, authToken);

	// client.messages
	// .create({
	// 	body: `Your otp is ${otp}`,
	// 	from: '+12053509477',
	// 	to: `+${a.phone_Number}`
	// })
	// .then(message => console.log(message))
	// .catch((err) => console.log(err));
	

	res.send(user);
});

route.post('/email-verification', async (req, res) => {
	let user = await findUserByEmail(req.body.email);

	if (user) {
		if (user.OTP === req.body.otp) {
			let ifVeri = await verified(req.body.email);

			if (ifVeri) {
				res.send({ success: req.body.email });
			} else {
				res.send({ error: 'internal error try again later' });
			}
		} else {
			res.send({ error: 'wrong otp' });
		}
	} else {
		res.send({ error: 'email not registered' });
	}
});

route.put('/', auth, async (req, res) => {
	const user = req.user;
	let img_url = null;

	if (req.files) {
		const ran_name = getrandomstring(32);
		const img_name = req.files.pro_img.name;
		const data = req.files.pro_img.data;

		fs.writeFile(`${__dirname}/pro-img/${ran_name}${img_name}`, data, (err) => {
			if (err) {
				console.log(err);
				res.send({ error: 'image can not be uploaded try not to upload that now ' });
			} else {
				img_url = ran_name + img_name;

				console.log('pro_image_saved');
			}
		});
	}

	let upUser = updateUserDet(user.name, user.password, img_url ? img_url : user.pro_img);

	res.send(upUser);
});

const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client('1059529825547-aplj58mp67dhb9j5smat7g5jjf3flgl2.apps.googleusercontent.com');

route.post('/google', async (req, res) => {
	let user = null;

	async function verify() {
		const ticket = await client.verifyIdToken({
			idToken: req.body.tokenId,
			audience: '1059529825547-aplj58mp67dhb9j5smat7g5jjf3flgl2.apps.googleusercontent.com'
		});
		const payload = ticket.getPayload();

		user = {
			email: payload.email,
			name: payload.name,
			pro_pic: payload.picture
		};
	}
	await verify().catch((error) => {
		console.log(error);
		res.send({ error: 'google auth error' });
	});

	if (user) {
		console.log(user);
		let exist = await isUserExistEmail(user.email);
		console.log(exist);
		if (!(exist === false)) {
			req.session.token = exist.token;
			req.session.save();

			res.send({ email: user.email });
		} else if (exist === false) {
			let newUser = await createGoogleUser(user);
			console.log(newUser);

			if (newUser.email) {
				req.session.token = newUser.token;
				req.session.save();

				res.send({
					email: newUser.email
				});
			} else {
				res.send({ error: 'internal error' });
			}
		} else {
			console.log('error');
			res.send('error');
		}
	} else {
		res.send('no');
	}
});

module.exports = { route };
