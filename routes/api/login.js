const { Router } = require('express')
const route = Router()
const { findUser } = require('../../controllers/user')


// for login request 
route.post('/', (req, res) => {
  if (req.body.user) {

    let cuser = req.body.user

    let ouser = findUser(cuser.username, cuser.password)

    if (ouser) {

      if (ouser.password === cuser.password) {

        req.session.token = ouser.token
        req.session.save()

        res.send({ "username": ouser.username })
      }
      else {
        res.send({ "error": "Incorrect Password" })
      }



    }

    else {

      res.send({ "error": "Username not found" })
    }


  }

  else {
    res.send({ "error ": "internal error" })
  }
})



route.get('/', auth, (req, res) => {
  let user = req.user
  let senduser = {
    "user": {
      "username": user.username,
      "name": user.name,
      "email": user.email,
      "phone_Number": user.phone_Number,
      "Verified": user.Verified,
      "pro_img": user.pro_img,
    }
  }
    res.send(senduser)

  
})

route.delete('/', auth, (req, res) => {

  req.session.token = null
  req.session.save()

  res.redirect('/home')





})

module.exports = { route }