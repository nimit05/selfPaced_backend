const exp = require('express')
const app = exp()
const { db  } = require('./data/db')
const apiRouter = require('./routes/api').route
const dotenv = require('dotenv')
dotenv.config();
const upload = require('express-fileupload')
const session = require('express-session')

// middlewares

app.use('/', exp.static('public'));
app.use('/api/pro-img', exp.static(`${__dirname}/routes/api/pro-img`));
app.use(exp.json())
app.use(exp.urlencoded({ extended: true }))
app.use(upload())
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

app.use('/api', apiRouter);



db.sync({force : true}).then(() => {

    app.listen(5132, () => {
        console.log('server-started')
    })
})


