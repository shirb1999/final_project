const mongoose = require('mongoose')
const validator = require('validator')

var UserSchema = new mongoose.Schema({
    id: {
        type: Number,
        // unique: true,
        // required: true,
        // trim: true
    },
    name: {
        type: String,
        // required: true,
        // trim: true
    },
    
    birth_year: {
        type: Number,
        // required: false,
        // default: 0,
        // validate(value) {
        //     if (value < 1900 || value > 2022) {
        //         throw new Error('Age must be a postive number')
        //     }
        // }
    },
    password: {
        
        type: String,
        
    },

    rpassword: { 
        type: String,
        // required: true,
        // trim: true
    },

    email: {
         type: String,
    },

    questions: [{ //reference to User
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true
    }]
    
    
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);

module.exports = User