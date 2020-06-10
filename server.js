const exp = require('express');
const app = exp();
const { db } = require('./data/db');
const apiRouter = require('./routes/api').route;
const dotenv = require('dotenv');
dotenv.config();
const upload = require('express-fileupload');
const session = require('express-session');
const path = require('path');
const { auth } = require('./middleware/auth');

// middlewares
app.use(
	session({
		secret: process.env.session_sec,
		resave: false,
		saveUninitialized: true,
		cookie: {
			httpOnly: false
		}
	})
);
app.use(exp.json());
app.use(exp.urlencoded({ extended: true }));
app.use(upload());
app.use('/home', exp.static(path.join(__dirname, 'build')));

// files
app.use('/covers', exp.static(path.join(__dirname, 'data/covers')));
app.use('/files', auth, exp.static(path.join(__dirname, 'data/files')));

app.use('/api', apiRouter);

// app.get('/*', function(req, res) {
// 	res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/api/pro-img', exp.static(`${__dirname}/routes/api/pro-img`));

db.sync().then(() => {
	app.listen('4444', () => {
		console.log('server-started');
	});
});
