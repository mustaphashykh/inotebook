const mongoose = require('mongoose');
const mongoDB_URI = "mongodb://localhost:27017/inotebook";

const connectToDB = () => {
    mongoose.connect(mongoDB_URI, () => {
        console.log("Connected to DB.");
    })
}

module.exports = connectToDB;