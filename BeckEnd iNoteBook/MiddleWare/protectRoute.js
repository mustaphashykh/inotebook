const JWT = require('jsonwebtoken')
let secretKey = '03172406597'

const protectRoute = (req, res, next) => {
    try {
        const token = req.header('is_logged_in');
        if (token) {
            user_id = JWT.verify(token, secretKey);
            req.id = user_id.payload;
            next();
        } else {
            res.status(401).json({
                message: 'unauthorized user'
            })
        }
    } catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}
// req.cookies.is_logged_in-----------------------------------------todo
module.exports = protectRoute;