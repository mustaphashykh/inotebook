const mongoose = require('mongoose');
const emailValidator = require('email-validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    profile_image: {
        type: String,
        default: "images/default_profile_image.png"
    },
    f_name: {
        type: String,
        require: true,
        validate: function () {
            return this.f_name !== "" && this.f_name !== " "
        }
    },
    l_name: {
        type: String,
        require: true,
        validate: function () {
            return this.l_name !== "" && this.l_name !== " "
        }
    },
    email: {
        type: String,
        require: true,
        unique: true,
        validate: function () {
            return emailValidator.validate(this.email)
        }
    },
    username: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true,
        validate: function () {
            return this.password.length > 7
        }
    },
    confirm_password: {
        type: String,
        require: true,
        validate: function () {
            return this.password === this.confirm_password;
        }
    },
    signupToken: String
    ,
    resetLink: String
    ,
    date: {
        type: Date,
        default: new Date().toDateString()
    }
});

userSchema.pre('save', function () {
    this.confirm_password = undefined;
})

userSchema.pre('save', async function () {
    let salt = await bcrypt.genSalt();
    let hashed_password = await bcrypt.hash(this.password, salt);
    this.password = hashed_password;
})

userSchema.methods.resetPassword = function (password, c_password) {
    this.password = password;
    this.confirm_password = c_password;
    this.resetLink = undefined;
}

userSchema.methods.edit_user = async function (f_name, l_name, email, username, password, c_password) {
    this.f_name = f_name;
    this.l_name = l_name;
    this.email = email;
    this.username = username;
    this.password = password;
    this.confirm_password = c_password;
    this.signupToken = undefined;
}

userSchema.methods.saveToken = function (Link) {
    this.resetLink = Link;
}

const userModel = mongoose.model('usermodel', userSchema);
module.exports = userModel;