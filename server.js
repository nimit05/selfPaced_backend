const exp = require('express');
const app = exp();
const { db } = require('./data/db');
const apiRouter = require('./routes/api').route;
const dotenv = require('dotenv');
dotenv.config();
const upload = require('express-fileupload');
const session = require('express-session');
const path = require('path');

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
app.use(exp.static(path.join(__dirname, 'build')));
app.use('/api', apiRouter);

app.get('/*', function(req, res) {
	res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api/pro-img', exp.static(`${__dirname}/routes/api/pro-img`));
app.use(upload());

db.sync({}).then(() => {
	app.listen(4444, () => {
		console.log('server-started');
	});
});
