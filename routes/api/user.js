const {Users , Products , Library} = require('../../data/db')
const {Router} = require('express')
route = Router()
const {auth} = require('../../middleware/auth')

route.get('/' , auth , async(req , res) => {
    const user = await Users.findOne({
        attributes: ['name', 'username', 'email', 'phone_Number', 'Address', 'token'],
        where : {username : req.user.username}
    })

    res.send(user)
})

route.get('/Cart' , auth, async(req, res) => {
   const user = await Users.findOne({
       where :{username :req.user.username}
   })
   res.send(user.Cart)
})

route.get('/Library' , auth , async(req,res) => {
    const item = await Library.findAll({
        where : {username : req.user.username}
    })
    res.send(item)
})

module.exports = {route}