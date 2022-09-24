const express = require('express');
const authRouter = express.Router();
const userModel = require("../Models/userModel");
const { signup, login, logout, genCode } = require('../Controllers/authController');
const protectRoute = require('../MiddleWare/protectRoute');
const crypto = require('crypto')
const { sendMail } = require('../Controllers/nodemailer')

authRouter
    .route('/signup')
    .put(signup),

    authRouter
        .route('/login')
        .post(login)

authRouter
    .route('/forgetPassword')
    .get(protectRoute, async (req, res) => {
        const user = await userModel.findById(req.id);
        if (user) {
            const token = crypto.randomBytes(32).toString('hex');
            resetLink = `http://localhost:3000/resetpassword/${token}`;
            user.saveToken(resetLink)
            await user.save();
            sendMail("reset password", user)
        }
    })

authRouter
    .route('/resetPassword')
    .post(async (req, res) => {
        const { password, confirm_password, resetLink } = req.body;
        let user = await userModel.findOne({ resetLink: resetLink })
        if (user) {
            user.resetPassword(password, confirm_password)
            await user.save();
            res.status(200).json({
                message: "Password is successfully updated."
            })
        } else {
            res.status(404).json({
                message: "User is not found."
            })
        }
    })

authRouter
    .route('/gencode')
    .post(genCode)


module.exports = authRouter;