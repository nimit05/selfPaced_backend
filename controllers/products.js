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
    attributes : [ 'refrenceId' ,'category' , 'BookName' , 'BookAuthor' , 'Edition' 
, 'Description' , 'old' , 'Value'],
    where : {refrenceId : newproduct.refrenceId},
    include : [{
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