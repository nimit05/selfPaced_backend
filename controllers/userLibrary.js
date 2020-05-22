const {Library , Users , Products} = require('../data/db')


async function AddToLibrary(itemsRefrenceId , librarianUsername){
    const item = await Library.create({
        itemsRefrenceId,
        librarianUsername
    })
    
    const newitem = await Library.findOne({
        where :{id : item.id},
        include : [{
            attributes : [
                'username' 
            ],
            model : Users,
            as : 'librarian'
        }],
        include : [{
            attributes : [ 'refrenceId' ,'category' , 'BookName' , 'BookAuthor' , 'Edition' 
            , 'Description' , 'old' , 'Value'],
            model : Products,
            as : 'items'
        }]
    })
    return newitem
}

async function LibraryProducts(username){
    const item = await Library.findAll({
        where : {librarianUsername : username}
    })
    return item.ProductRefrenceId[0]
}

module.exports = {
    AddToLibrary,
    LibraryProducts
}