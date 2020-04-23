const { Router } = require('express')
const route = Router()
const { createusers } = require('../../controllers/user')
const fs = require('fs')
const { getrandomstring } = require('../../utils/string')

// const nodemailer = require('nodemailer')


route.post('/', async (req, res) => {
    const a = req.body
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



    const user = await createusers(
        a.name,
        a.username,
        a.email,
        a.password,
        a.phone_Number,
        img_url
    )


    res.send(user)
})


module.exports = { route }