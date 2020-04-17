const {Router} = require('express')
const route = Router()
const {createusers } = require('../../controllers/user')
// const nodemailer = require('nodemailer')


route.post('/' , async(req , res) => {
    const a = req.body.user
    const user = await createusers(
     a.name,
     a.username,
     a.email,
     a.password ,
     a.phone_Number
    )


res.send(user)
})


module.exports = {route}