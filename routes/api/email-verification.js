const { Router } = require('express')
const route = Router()
const { Users } = require('../../data/db')
const { getrandomstring } = require('../../utils/string')
// const {authwirefortoken} = require('../../middleware/authfortoken'
const {auth} = require('../../middleware/auth')
const nodemailer = require('nodemailer')

route.post('/', auth ,  async (req, res) => {

    const user = await Users.findOne({
        where: { token: req.user.token }
    })

    user.OTP = getrandomstring(6)
    user.save()

    setTimeout(() => {
   
        user.OTP = null
        user.save()
    }, 600000)

    const output = `
<b> OTP : ${user.OTP} </b>
`
    async function main() {
        let testAccount = await nodemailer.createTestAccount();
        let transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                user: "puranibooks123@gmail.com",
                pass: "classmate123."
            }
        });

        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: '"puraniBooks" <puranibooks123@gmail.com>',
            to: user.email,
            subject: "OTP Verification",
            text: "this is the otp for signing in puranibooks",
            html: output
        });

        console.log("Message sent: %s", info.messageId);
        console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    }

    main().catch(console.error)

    res.send('otp-sent at ' + user.email)
})

route.put('/', auth ,  async (req, res) => {
    console.log(req.user.username)
    const user = await Users.findOne({
        where: { token: req.user.token }
    })

    if (req.body.OTP == user.OTP) {
        user.Verified = true
        user.save()
    }
    if (user.Verified) {
        res.send(user.username + ' you have succesfully verified your email')
    }
    res.send('Invalid-OTP')
})

module.exports = { route }