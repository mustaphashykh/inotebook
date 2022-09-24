const userModel = require('../Models/userModel')
const bcrypt = require('bcrypt')
const JWT = require('jsonwebtoken')
let secretKey = '03172406597'
const { sendMail } = require('../Controllers/nodemailer')

module.exports.signup = async function signup(req, res) {
    try {
        let success = true;
        const { code } = req.body;
        const user = await userModel.findOne({ signupToken: code })
        if (user) {
            // const new_user = {
            //     f_name: req.body.f_name,
            //     l_name: req.body.l_name,
            //     email: req.body.email,
            //     username: req.body.username,
            //     password: req.body.password,
            //     confirm_password: req.body.confirm_password,
            // }
            user.edit_user(req.body.f_name, req.body.l_name, req.body.email, req.body.username, req.body.password, req.body.confirm_password)
            await user.save();
            sendMail("signup", created_user)
            res.json({
                success: success,
                message: "you have successfully signed up"
            })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports.login = async function login(req, res) {
    try {
        let success = true;
        const user = req.body;
        const db_user = await userModel.findOne({ email: user.email });
        if (db_user) {
            const if_matches = await bcrypt.compare(user.password, db_user.password);
            if (if_matches) {
                let payload_id = db_user.id;
                const token = JWT.sign({ payload: payload_id }, secretKey);
                res.status(200).json({
                    success: success,
                    is_logged_in: token,
                    message: "user has successfully loggged in."
                })
            }
            else {
                success = false;
                res.status(404).json({ success: success, errors: "wrong credentials" });
            }
        } else {
            success = false;
            res.status(404).json({ success: success, errors: "user not found" });
        }
    } catch (error) {
        success = false;
        res.status(500).json({ errors: error.message });
    }
}

module.exports.genCode = async function genCode(req, res) {
    const { email } = req.body;
    const val = Math.floor(1000 + Math.random() * 9000);
    const data = {
        code: val,
        email: email
    }
    sendMail("code", data);
    const obj = {
        f_name: 'hales',
        l_name: 'alex',
        email: `halesalex${val}@gmail.com`,
        username: `username${val}`,
        password: '123456789',
        confirm_password: '123456789',
        signupToken: val
    };
    const code = await userModel.create(obj);
    console.log(code)
}