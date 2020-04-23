const { Router } = require('express')
const route = Router()
const { Users } = require('../../data/db')
const { findUser } = require('../../controllers/user')
const { passport } = require('../../middleware/passport');


route.get('/', passport.authenticate('local', {

  failureRedirect: '/login'
}), (req, res) => {
  console.log(req.user)
  res.send(req.user)
})





module.exports = { route }