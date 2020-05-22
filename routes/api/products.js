const { Router } = require('express')
const route = Router()
const {auth} = require('../../middleware/auth')
const {Users , Products} = require('../../data/db')
const {getAllProducts} = require('../../controllers/products')

var lib = []

route.post('/:refrenceId/Buy' , auth, async(req,res) => {
    const user = await Users.findOne({
        where : {username : req.user.username}
    })
    const product = await Products.findOne({
        where : {refrenceId : req.params.refrenceId}
    })

  console.log(user.Library)
                  

 if(user.Library != null){
   lib =  lib.concat(arr3)
 }

 lib.push(product.refrenceId)

 
 user.Library = lib
 user.save()

 res.send(product.BookName + " is added to your Library")

})

route.post('/:refrenceId/AddToCart' ,auth ,  async(req,res) => {
     const user = await Users.findOne({
         where : {username : req.user.username}
     })
     const product = await Products.findOne({
         where : {refrenceId : req.params.refrenceId}
     })

   console.log(user.Cart)
   var arr = []
   
   if(user.Cart != null){
    var arr2 = user.Cart[0].split(',') 
   }   
   console.log(arr2)
  if(user.Cart != null){
    arr =  arr.concat(arr2)
  }
    
   arr.push(product.refrenceId)
  console.log(arr)
  user.Cart = arr
  user.Cart = user.Cart[0].split(',')
  user.save()

   console.log(user.Cart)

  res.send(product.BookName + " is added to your cart")

})

route.get('/myproducts/:username'  ,  async (req,res) => {
    const products = await getAllProducts(req.params.username)
    res.send({products})
})

route.get('/' , auth , async(req,res) => {
    const products = await Products.findAll({
        attributes : [ 'refrenceId' ,'category' , 'BookName' , 'BookAuthor' , 'Edition' 
        , 'Description' , 'old' , 'Value'],
    })

    res.send({products})
})

module.exports = {route}