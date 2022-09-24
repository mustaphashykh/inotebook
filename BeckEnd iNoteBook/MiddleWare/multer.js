const multer = require('multer');

const multerStorage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, "./images")
    },
    filename: function (req, file, cb) {
        cb(null, `user-${Date.now()}.png`)
    }
})

const filter = function (req, file, cb) {
    if (file.mimetype.startsWith('image')) {
        cb(null, true)
    } else {
        cb(new Error("Please upload a image."), false)
    }
}

const update = multer({
    storage: multerStorage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: filter
})

module.exports = update;