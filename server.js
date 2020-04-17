const exp = require('express')
const app = exp()
const { db } = require('./data/db')
const apiRouter = require('./routes/api').route
const dotenv = require('dotenv')
dotenv.config();

const session = require('express-session')
const { passport } = require('./middleware/passport')


// middlewares

app.use('/', exp.static('public'));
app.use(exp.json())
app.use(exp.urlencoded({ extended: true }))
app.use(
    session({
        secret: process.env.session_sec,
        resave: false,
        saveUninitialized: true,
        cookie: {
            httpOnly: false
        }
    })
)
app.use(passport.initialize());
app.use(passport.session());

app.use('/api', apiRouter);

db.sync({}).then(() => {

    app.listen(5132, () => {
        console.log('server-started')
    })
})
