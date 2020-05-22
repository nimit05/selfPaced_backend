const {Library , Users , Products} = require('../data/db')


async function AddToLibrary( username , Product_RefrenceId){
    const item = await Library.create({
        username,
        Product_RefrenceId
    })
    
    return item
}

async function LibraryProducts(username){
    const item = await Library.findAll({
        where : {librarianUsername : username}
    })
    return item.ProductRefrenceId[0]
}

async function AddToCart(username, refrenceId){
    const user = await Users.findOne({
        where : {username}
    })
    const product = await Products.findOne({
        where : {refrenceId}
    })

  let arr = []
  
  if(user.Cart != null){
   var arr2 = user.Cart[0].split(',') 
  }   
 if(user.Cart != null){
   arr =  arr.concat(arr2)
 }
   
  arr.push(product.refrenceId)
 user.Cart = arr
 user.save()

 return arr
} 

async function CartProducts(username){
    const user = await Users.findOne({
        where : {username}
    })
 
if(user.Cart != null){
  var arr = user.Cart[0].split(',') 
   }   
return arr

}

module.exports = {
    AddToLibrary,
    LibraryProducts,
    AddToCart,CartProducts
}