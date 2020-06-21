const {createReview} = require('../../controllers/products')
const {Review , Products , Transaction} = require('../../data/db')
const { Router } = require('express');
const route = Router();
const Sequelize = require('sequelize')
const { auth } = require('../../middleware/auth');


route.post('/'  ,auth, async(req,res) => {

    const review = await createReview(req.user.username , req.body.comment , req.body.rating , req.body.productId , req.user.pro_img)
    console.log(req.user.pro_img)
    const product = await Products.findOne({
        where : {id : req.body.productId}
    })

    const reviews = await Review.findAll({
        where : {productId : req.body.productId}
    })

    if(product.rating == null){
        product.rating = req.body.rating
        product.save()
    }else{
        let x = product.rating*(reviews.length - 1)
        console.log(product.rating)
        product.rating = ((x + parseInt(req.body.rating))/reviews.length)
        console.log(reviews.length)
        
        console.log(req.body.rating)
        console.log((x + parseInt(req.body.rating))/reviews.length)
        product.save()
      
    }
    
    res.send(review)
})

route.get('/:id', async(req,res) => {
    console.log(req.params.id)
    const comments = await Review.findAll({
        where:    
            {productId : req.params.id}
        
    })

    console.log('comments aaye' + req.params.id)
    res.send(comments)
})

route.get('/isAllowed/:id' , auth , async(req,res) => {
    const bought = await Transaction.findOne({
        where : {
            [Sequelize.Op.and] :[
                {userId : req.user.username},
                {itemId : req.params.id},
                {Debited : true}
            ]
        }
    })
    const comment = await Review.findOne({
        where : {
            [Sequelize.Op.and] :[
                {userId : req.user.username},
                {productId : req.params.id}
            ]
        }
    })
    if(comment){
    console.log('comes in if condition ' + req.params.id)
    res.send(true)
    }
    else if(bought == null){
    res.send(true)
    console.log('comes in else if condition ' + req.params.id)

    }
    else{
        res.send(false)
        console.log('comes in else condition')
    }
})

route.get('/getAll/:userId' , auth , async(req,res) => {
    const reviews = await Review.findAll({
        where : {userId : req.params.userId}
    })
    res.send(reviews)
})

module.exports = {route}