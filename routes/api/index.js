const { Router } = require('express')
const route = Router()

const signuprouter = require('./signup').route
const loginrouter = require('./login').route
const sellrouter = require('./sell').route
const e_VErifyrouter = require('./email-verification').route

route.use('/register', signuprouter)
route.use('/login', loginrouter)
route.use('/sell', sellrouter)
route.use('/email-verification', e_VErifyrouter)

module.exports = { route }