const nodemailer = require('nodemailer');

module.exports.sendMail = async function sendMail(str, data) {
    let transfer = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: "587",
        secure: false,
        auth: {
            user: "mustafaahmedshaikh125@gmail.com",
            pass: "eyrshufdkjozdnuh"
        }
    });

    var Osubject, Ohtml;

    if (str === 'signup') {
        Osubject = `Thank you so much ${data.username}.`;
        Ohtml = `<h1>Welcome to iNoteBook</h1><p>Thank you again for joining iNoteBook to keep your important notes safe in cloud.</p><p>Hoping you will enjoy my service and use it on daily base for your notes.</p><p><b>Regards.</b></p>`
    } else if (str === 'reset password') {
        Osubject = 'Reset Password'
        Ohtml = `<p>please hit the link below to reset your password.</p><p>Link : ${data.resetLink}</p>`
    } else if (str === 'code') {
        Osubject = `Confirmation Code`;
        Ohtml = `<h1>Your confirmation code.</h1><p>Code : <b>${data.code}</b></p>`
    }

    const info = await transfer.sendMail({
        form: '"iNoteBook." <mustafaahmedshaikh125@gmail.com>',
        to: data.email,
        subject: Osubject,
        html: Ohtml
    });
    console.log("Message send: %s", info.messageId);
}