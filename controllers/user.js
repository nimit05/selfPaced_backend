const {Users} = require('../data/db')
const{getrandomstring} = require('../utils/string')

async function createusers(name , username , email ,password , phone_Number ){
    const user = await Users.create({
        name ,
        username,
        email ,
        password,
        phone_Number,
        token : getrandomstring(32),
        OTP : null,
        Verified : false
    })

    const newuser = await Users.findOne({
        attributes : ['name' , 'username' , 'email' , 'phone_Number'  , 'token'],
        where : { token : user.token}
    })
return newuser;
}

async function findUserByOTP(OTP) {
    const user = await Users.findOne({
        attributes : ['name' , 'username' , 'email' , 'phone_Number'],
        where: { OTP }
    })

    if (!user) {
        return { body: [ 'Invalid OTP' ]}
    }
const ys = "verified Succesfully"
    return ys
}

async function findUserByToken(token) {
    const user = await Users.findOne({
        where: { token }
    })

    if (!user) {
        return { body: [ 'Invalid token' ]}
    }

    return user
}

async function findUser(username , password) {
    const auth = await Users.findOne({
        where : {username}
    })
    if(!auth){
        return { body: [ 'No user found with that username' ]}
    }
    if(auth.password != password){
        return {body : ['incorrect Password']}
    }
    else{
        return "succesfully login"
    }
}

module.exports = {createusers , findUserByOTP , findUserByToken , findUser}