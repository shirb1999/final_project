
const Artist = require('../models/Artist')
const sort_objects_array = require('sort-objects-array')

module.exports = {
    // Read - returns list of artist
    read_all_artist: function(req, res) {
        Artist.find()
        .then(Artist => res.send(Artist))
        .catch(e => res.status(500).send())
    },

    forget_password: function(req, res) {
        var id_user = "";
        var usernam = "";
        let i = 0;
        for( ; i<8 ;i++)
            id_user+= req.params.id[i];
        
        while(i<req.params.id.length){
            usernam += req.params.id[i];
            i++
        }
        Artist.findOne({ id: id_user },{name: usernam})
            .then(artist => res.send(artist.email))
            .catch(e => res.status(500).send(e))
    }, 
    user_login: function(req, res) {
        var password_user = "";
        var usernam = "";
        let i = 0;
        for( ; i<8 ;i++)
            password_user+= req.params.password[i];
        
        while(i<req.params.password.length){
            usernam += req.params.password[i];
            i++
        }
        Artist.findOne({ password: password_user },{name: usernam})
            .then(artist => res.send(artist.password))
            .catch(e => res.status(500).send(e))
    }, 
    // Create - add a new artist
    create_artist: function(req, res) {
        const artist = new Artist(req.body);
        artist.save().then(artist => res.status(200).send(artist)
        ).catch(e => res.status(400).send(e))
    },

     // Create - add a new songs
    create_song: function(req, res) {
        Artist.updateOne({ id: req.params.id }, { $addToSet: { "songs": req.body.name} }).then(song => 
        res.status(200).send(song)  
        ).catch(e => {res.status(400).send(e)})
    },
    // Read - returns list of songs
    read_song: function(req, res) {
        Artist.findOne({ id: req.params.id })
            .then(artist => res.send(sort_objects_array(artist.songs, 'name')))
            .catch(e => res.status(500).send(e))
    },
    // Deleate - remove artist from the list
    delete_artist: function(req, res) {
        Artist.deleteOne({ "id": req.params.id })
            .then(artist => res.send(artist))
            .catch(e => res.status(500).send(e))
    },
    // Deleate - remove song from the list song
    delete_artist_song: function(req, res) {
        var artistId = "";
        let i = 0;
        for( ; i<req.params.id.length-1;i++)
            artistId+= req.params.id[i];
        var song = req.params.id[i];
        var isExist = false;

        if (isNaN(artistId)) {
            return res.status(400).send("Bad-Request, (add song, id is invalid)");
        }
        // find the relevant artist by the id
        Artist.findOne({ id: artistId }).exec().then(artist => {
            if (artist == null) {
                res.status(404).send("artist doesnt exist");
            } else {
                // if song = '' --> delete all songs
                if (song == '') {
                    artist.songs = [];
                    artist.save((err) => {
                        if (err) {
                            res.status(400).send(err);
                        } else { res.status(201).send("saved succesfully"); }
                    });
                } else { // else --> check if song exists
                    for (var s in artist.songs) {
                        if (s == song) {
                            artist.songs.splice(song, 1);
                            isExist = true;
                            // save the changes of this artist
                            artist.save((err) => {
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
