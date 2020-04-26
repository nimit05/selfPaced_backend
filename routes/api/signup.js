const { Router } = require('express')
const route = Router()
const { createusers, findUserByOTP, verified, findUserByEmail } = require('../../controllers/user')
const fs = require('fs')
const { getrandomstring } = require('../../utils/string')
const { auth } = require('../../middleware/auth')
const { sendOtpToMail } = require('../../utils/emailVeri')


route.post('/', async (req, res) => {
    const a = req.body
    let img_url = null;
    let otp = getrandomstring(6)
    sendOtpToMail(a.email, otp).catch((err) => {
        console.log({ error: "unable to send email error :- " + err })
        res.send({ error: "can not register your account internal error" })
    })






    if (req.files) {

        const ran_name = getrandomstring(32)
        const img_name = req.files.pro_img.name
        const data = req.files.pro_img.data



        fs.writeFile(`${__dirname}/pro-img/${ran_name}${img_name}`, data, (err) => {

            if (err) {
                console.log(err)
                res.send({ error: "image can not be uploaded try not to upload that now " })
            }
            else {

                img_url = ran_name + img_name


                console.log("pro_image_saved")
            }

        })
    }



    const user = await createusers(
        a.name,
        a.username,
        a.email,
        a.password,
        a.phone_Number,
        a.Address,
        img_url,
        otp
    )


    res.send(user)
})


route.post('/email-verification', async (req, res) => {

    let user = await findUserByEmail(req.body.email)

    console.log(user.OTP)

    if (user) {
        if (user.OTP === req.body.otp) {

            let ifVeri = await verified(req.body.email)

            if (ifVeri) {
                res.send({ success: req.body.email })
            }
            else {
                res.send({ error: "internal error try again later" })
            }

        }

        else {
            res.send({ error: "wrong otp" })
        }

    }

    else {
        res.send({ error: "email not registered" })
    }
})




route.put('/', auth, async (req, res) => {
    const user = req.user
    let img_url = null;



    if (req.files) {

        const ran_name = getrandomstring(32)
        const img_name = req.files.pro_img.name
        const data = req.files.pro_img.data



        fs.writeFile(`${__dirname}/pro-img/${ran_name}${img_name}`, data, (err) => {

            if (err) {
                console.log(err)
                res.send({ error: "image can not be uploaded try not to upload that now " })
            }
            else {

                img_url = ran_name + img_name


                console.log("pro_image_saved")
            }

        })
    }


    let upUser = updateUserDet(user.name, user.password, img_url ? img_url : user.pro_img)


    res.send(upUser)
})


module.exports = { route }