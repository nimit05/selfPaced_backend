const nodemailer = require("nodemailer");

async function sendOtpToMail(userMailId, otp) {
  let mailBody = `<h3> Email Verification for your PuraniBook Account <h3><br><p>(Do not share this otp if you did not register for puranibook)</p><br><br> <h2>Your OTP is ${otp} </h2> `;

  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.emailId,
      pass: process.env.emailPass
    }
  });

  let info = await transporter.sendMail({
    from: "<selfpaced123@gmail.com>",
    to: userMailId,
    subject: "Verification For Email Id",
    text: "Welcome",
    html: mailBody
  });

  console.log("Message sent: %s", info.messageId);

  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

module.exports = { sendOtpToMail };
