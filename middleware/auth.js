const {findUserByOTP} = require('../controllers/user')

async function authwire(req , res , next){
    let auth = req.headers['authorization']
    if (auth && auth.startsWith('OTP ')) {
        let OTP = auth.split(' ')[1]
        let user = await findUserByOTP(OTP)
        if (user) {
            req.user = user 
            
            return next()
        }
    } else {
        res.status(401).send({
            "errors":{
              "body": [
                "Incorrect OTP"
              ]
            }
          })
    }
}
module.exports = {authwire}   
