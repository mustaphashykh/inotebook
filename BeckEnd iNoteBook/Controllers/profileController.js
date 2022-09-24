const userModel = require('../Models/userModel');

const uploadProfileImage = async (req, res) => {
    try {
        const profile = {
            profile_image: req.file.path,
            user_id: req.id
        }
        const saved_user = await userModel.findByIdAndUpdate(req.id, profile);
        if (saved_user) {
            res.json({
                user: saved_user,
                message: "profile is successfully uploaded."
            })
        }
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports = uploadProfileImage;