const {Router} = require('express')
const route = Router()
const {auth} = require('../../middleware/auth')
const nodemailer = require('nodemailer');


route.post('/' , auth , async(req,res) => {

    const output = `
    <p>${req.body.msg} from ${req.user.email} , my name is ${req.body.name} , my phone Number is ${req.body.phone_Number}</p>
    `;
        async function main() {
            let testAccount = await nodemailer.createTestAccount();
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'puranibooks123@gmail.com',
                    pass: 'classmate123.'
                }
            });
    
            // send mail with defined transport object
            let info = await transporter.sendMail({
                from: req.user.email,
                to: "selfpaced <selfpaced123@gmail.com>",
                subject: `${req.body.subject}`,
                text: 'Message from user',
                html: output
            });
    
            console.log('Message sent: %s', info.messageId);
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        }
    
        main().catch(console.error);
    
        res.send(true);
})

module.exports = {route}