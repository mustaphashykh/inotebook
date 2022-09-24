const express = require('express');
const userRouter = express.Router();
const getuser = require('../Controllers/userController')
const protectRoute = require('../MiddleWare/protectRoute')
const update = require('../MiddleWare/multer');
const uploadProfileImage = require("../Controllers/profileController");
const userModel = require('../Models/userModel');

userRouter
    .route('/getuser')
    .get(protectRoute, getuser)
userRouter
    .route('/upload_profile')
    .put(update.single('profile_image'), protectRoute, uploadProfileImage)
userRouter
    .route('/update_profile_image')
    .put(update.single('profile_image'), protectRoute, uploadProfileImage)

userRouter
    .route('/update_user')
    .put(protectRoute, async (req, res) => {
        let user = await userModel.findById(req.id)
        if (user) {
            let update_user = {
                f_name: req.body.f_name,
                l_name: req.body.l_name,
                username: req.body.username
            }
            const saved_user = await userModel.findByIdAndUpdate(req.id, update_user);
            if (saved_user) {
                res.status(200).json({
                    message: "user is successfully updated."
                })
            } else {
                res.status(500).json({ errors: error.message });
            }
        }
    })

module.exports = userRouter;