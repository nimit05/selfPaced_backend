const {Users , Products} = require('../data/db')
const {getrandomstring} = require('../utils/string')
const {bookValue} = require('../utils/BookValue')

async function createProduct ( SellerUsername , category , BookName , BookAuthor, Edition ,  Description , old , MRP  ){ 
    const newproduct = await Products.create({
        refrenceId : getrandomstring(16),
        SellerUsername,
        category,
        BookName,
        BookAuthor,
        Edition,
        Description,
        old,
        MRP,
        Value : bookValue(MRP)
    })

const product = await Products.findOne({
    where : {refrenceId : newproduct.refrenceId},
    includes : [{
        attributes : [
            'username' , 'Address' , 'phone_Number' , 'email'
        ],
        model : Users,
        as : 'Seller'
    }]
})

  return product
}

module.exports = {createProduct}