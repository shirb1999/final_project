const mongoose = require('mongoose')
var EventSchema = new mongoose.Schema({
    name_event: {
        type: String,
        required: true,
        trim: true
    },
    place: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true,
        trim: true
    },
    users: [{ //reference to User
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
    
}, { timestamps: true });


const Event = mongoose.model('Event', EventSchema);

module.exports = Event