const { Router } = require('express')
const route = Router()
const {auth} = require('../../middleware/auth')
const {Users , Products} = require('../../data/db')
const {getAllProducts} = require('../../controllers/products')

var arr = []

route.post('/:refrenceId/favourite' ,auth ,  async(req,res) => {
     const user = await Users.findOne({
         where : {username : req.user.username}
     })
     const product = await Products.findOne({
         where : {refrenceId : req.params.refrenceId}
     })

   console.log(user.favourites)

   let arr2 = user.favourites
    
  if(user.favourites != null){
    arr =  arr.concat(arr2)
  }
 

  arr.push(product.refrenceId)
  
  user.favourites = arr
  user.save()

   console.log(user.favourites)

  res.send(product.BookName + " is added to your favourites")

})

route.get('/myproducts' ,auth ,  async (req,res) => {
    const products = await getAllProducts(req.user.username)
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