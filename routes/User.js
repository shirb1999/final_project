
const User = require('../models/User')
var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'kvudaweb@gmail.com',
      pass: 'kvuda1234'
    }
  });
  function exist_id(id_user,res) {
    User.findOne({ id: id_user })
    .then(User => forget_password1)
    .catch(e => res.status(500).send())

}

  async function forget_password1(req, res) {
    var id_user = "";
        var usernam = "";
        let i = 0;
        for( ; i<9 ;i++)
            id_user+= req.params.id[i];
        
        while(i<req.params.id.length){
            usernam += req.params.id[i];
            i++
        }
        exist_id(id_user, res)
    var m;
    var user =await User.findOne({ id: id_user })
    var email = user.email
    var password = user.password
    var nam = user.name
    console.log( nam)
    var mailOptions = {
        from: 'kvudaweb@gmail.com',
        to: email,
        subject: 'Your password',
        text: 'Hello'+nam+',\n \n your password is:'+password
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
    
  
}
  
module.exports = {
    // Read - returns list of user
    read_all_qestion: function(req, res) {
        console.log("read_all_qestion:"+ req.params.id);
        User.findOne({ id: req.params.id })
            .then(user => res.send(user.questions))
            .catch(e => res.status(500).send(e))
    },

    forget_password: function(req, res) {
        forget_password1(req, res) 
    }, 
    
    user_login: function(req, res) {
        var password_user = "";
        var id_user = "";
        let i = 0;
        for( ; i<8 ;i++)
            password_user+= req.params.password[i];

        while(i<req.params.password.length){
            id_user += req.params.password[i];
            i++
        }
        User.findOne({  id: id_user })
            .then(user => res.send(user.password))
            .catch(e => res.status(500).send(e))
    }, 
    // Create - add a new user
    create_user: function(req, res) {
        const user = new User(req.body);
        user.save().then(user => res.status(200).send(user)
        ).catch(e => res.status(400).send(e))
    },

   addTrip: function(req, res) {

    User.updateOne({ id: req.params.id }, { $push: { "questions":{ $each: [req.body.where,req.body.date, req.body.type ]}} }).then(question => 
        res.status(200).send(question)  
        ).catch(e => {res.status(400).send(e)})

   } ,

    addQuestion: function(req, res) {
        
        User.updateOne({ id: req.params.id }, { $push: { "questions":{ $each: [req.body.genus,req.body.navigation,req.body.disability, req.body.cosher,  req.body.hearing, req.body.license, req.body.glasses, req.body.lenses, req.body.drug ]}} }).then(question => 
            res.status(200).send(question)  
            ).catch(e => {res.status(400).send(e)})

    },

    listTake: function(req, res) {


    },
    updateQestion: function(req, res) {

        var index = "";
        var id_user = "";
        let i = 0;
        for( ; i<9 ;i++)
        id_user+= req.params.password[i];

        while(i<req.params.password.length){
            index += req.params.password[i];
            i++
        }

        


        User.updateOne({ id: req.params.id }, { $push: { "questions":{ $each: [req.body.genus,req.body.disability, req.body.cosher,  req.body.hearing, req.body.license, req.body.glasses, req.body.lenses, req.body.drug ]}} }).then(question => 
            res.status(200).send(question)  
            ).catch(e => {res.status(400).send(e)})
    },

     // Create - add a new songs
    create_song: function(req, res) {
        User.updateOne({ id: req.params.id }, { $addToSet: { "songs": req.body.name} }).then(song => 
        res.status(200).send(song)  
        ).catch(e => {res.status(400).send(e)})
    },
    // Read - returns list of songs
    read_song: function(req, res) {
        User.findOne({ id: req.params.id })
            .then(user => res.send(sort_objects_array(user.songs, 'name')))
            .catch(e => res.status(500).send(e))
    },
    // Deleate - remove user from the list
    delete_user: function(req, res) {
        User.deleteOne({ "id": req.params.id })
            .then(user => res.send(user))
            .catch(e => res.status(500).send(e))
    },
    // Deleate - remove song from the list song
    delete_user_song: function(req, res) {
        var userId = "";
        let i = 0;
        for( ; i<req.params.id.length-1;i++)
        userId+= req.params.id[i];
        var song = req.params.id[i];
        var isExist = false;

        if (isNaN(userId)) {
            return res.status(400).send("Bad-Request, (add song, id is invalid)");
        }
        // find the relevant user by the id
        User.findOne({ id: userId }).exec().then(user => {
            if (user == null) {
                res.status(404).send("user doesnt exist");
            } else {
                // if song = '' --> delete all songs
                if (song == '') {
                    user.songs = [];
                    user.save((err) => {
                        if (err) {
                            res.status(400).send(err);
                        } else { res.status(201).send("saved succesfully"); }
                    });
                } else { // else --> check if song exists
                    for (var s in user.songs) {
                        if (s == song) {
                            user.songs.splice(song, 1);
                            isExist = true;
                            // save the changes of this user
                            user.save((err) => {
                                if (err) {
                                    res.status(400).send(err);
                                } else { res.status(201).send("saved succesfully"); }
                            });
                            break;
                        }
                    }
                    if (!isExist) res.status(400).send(err);
                }
            }
        }).catch(e => res.status(400).send(e));
    }


}