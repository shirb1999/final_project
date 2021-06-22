const mongoose = require('mongoose')

var EventSchema = new mongoose.Schema({
    q1: {
        type: String
    }

}, { timestamps: true });

const Question = mongoose.model('Question', UserSchema);

module.exports = Question