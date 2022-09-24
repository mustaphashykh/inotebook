const userModel = require('../Models/userModel')

const getuser = async (req, res) => {
    try {
        const user_id = req.id;
        const db_user = await userModel.findById(user_id).select("-password  -role -_id");
        res.status(200).json({
            user: db_user
        })
    } catch (error) {
        res.status(500).json({ errors: error.message });
    }
}

module.exports = getuser;
