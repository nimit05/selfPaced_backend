const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

function getrandomstring (length) {
    let buff = []
     while(buff.length<length){
         const count = parseInt(Math.random()*(62))
         buff.push(alpha.charAt(count))
     }
   return   buff.join('')

}
module.exports = {getrandomstring}