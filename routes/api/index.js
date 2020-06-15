const { Router } = require('express')
const route = Router()

const signuprouter = require('./signup').route
const loginrouter = require('./login').route
const userrouter = require('./user').route
const sellrouter = require('./sell').route
const productsrouter = require('./products').route
const commentrouter = require('./review').route
const e_VErifyrouter = require('./email-verification').route

route.use('/register', signuprouter)
route.use('/login', loginrouter)
route.use('/sell', sellrouter)
route.use('/user', userrouter)
route.use('/products', productsrouter)
route.use('/review', commentrouter)
route.use('/email-verification', e_VErifyrouter)

module.exports = { route }