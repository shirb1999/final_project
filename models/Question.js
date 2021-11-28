const mongoose = require('mongoose')

var EventSchema = new mongoose.Schema({
    

}, { timestamps: true });

const Question = mongoose.model('Question', UserSchema);

module.exports = Question