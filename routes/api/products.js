const { Router } = require('express')
const route = Router()
const {auth} = require('../../middleware/auth')
const {Users , Products} = require('../../data/db')
const {getAllProducts} = require('../../controllers/products')
const {AddToCart , AddToLibrary} = require('../../controllers/userLibrary')

var lib = []

route.post('/:refrenceId/Buy' , auth, async(req,res) => {
    const item = await AddToLibrary( req.user.username , req.params.refrenceId )

    res.send(item)
})

route.post('/:refrenceId/AddToCart' ,auth ,  async(req,res) => {
    const cart = await AddToCart(req.user.username , req.params.refrenceId)
    res.send(cart)
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