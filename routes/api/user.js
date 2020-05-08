const {Users} = require('../../data/db')
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


module.exports = {route}