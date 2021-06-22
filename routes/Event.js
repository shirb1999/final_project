const Event = require('../models/Event')

module.exports = {

// Create - add a new event
addEvent: function(req, res) {
    const event = new Event(req.body);
    console.log(event)
    event.save().then(event => res.status(200).send(event)
    ).catch(e => res.status(401).send(e))
},

// Read - returns all the event
getEvent: function (req, res)  {
    Event.find()
        .populate('artists')
        .then(event => res.send(event))
        .catch(e => res.status(500).send(e))
}
}