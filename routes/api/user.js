const {Users , Products , Library} = require('../../data/db')
const {Router} = require('express')
route = Router()
const {auth} = require('../../middleware/auth')
const {CartProducts} = require('../../controllers/userLibrary')

route.get('/' , auth , async(req , res) => {
    const user = await Users.findOne({
        attributes: ['name', 'username', 'email', 'phone_Number', 'Address', 'token'],
        where : {username : req.user.username}
    })

    res.send(user)
})

route.get('/Cart' , auth, async(req, res) => {
   var products = []
   const cart = await CartProducts(req.user.username)
   for(let i=0;i<cart.length;i++){
       let item = await Products.findOne({
           attributes : ['id','refrenceId' ,'category' , 'BookName' , 'BookAuthor' , 'Edition' 
           , 'Description' , 'old' , 'Value'],
           where:{refrenceId : cart[i]}
       })
       products.push(item)
   }
   console.log(products[0].BookName)
   res.send(products)

})

route.get('/Library' , auth , async(req,res) => {
    const item = await Library.findAll({
        where : {username : req.user.username}
    })
    res.send(item)
})

module.exports = {route}