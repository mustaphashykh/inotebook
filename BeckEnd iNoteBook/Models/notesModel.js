const mongoose = require('mongoose');

const notesSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'userModel'
    },
    title: {
        type: String,
        require: true,
        unique: true,
        validate: function () { this.title.length > 2 }
    },
    description: {
        type: String,
        require: true,
        validate: function () { this.description.length > 5 }
    },
    tag: {
        type: String,
        default: "General Note."
    },
    date: {
        type: Date,
        default: Date.now
    }
})

const notesModel = mongoose.model('notesmodel', notesSchema);
module.exports = notesModel;