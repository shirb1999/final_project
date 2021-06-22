const express = require("express"),
  fs = require("fs"),
  ArtistRoutes = require("./Artist"),
  EventRoutes = require("./Event"),
  { check, validationResult } = require('express-validator');

var router = express.Router();

router.get('/Artist', ArtistRoutes.read_all_artist);//read all artist
router.post('/Artist',
      [
        check('name', "Album name can't be empty").notEmpty(),
        check('name', "Album name length should be under 100 chars").isLength({ max: 100 }),
        check('name', "Album name length should at least 2 chars").isLength({ min: 2 }),

      ], ArtistRoutes.create_artist); // create artist
router.post('/Artist/:id',
    [
      check('name', "Artist name should at least 3 chars").isLength({ min: 3 }),
    ], ArtistRoutes.create_song);   //add new Artist to artist
// router.get('/Artist/:id', ArtistRoutes.read_song);//read song
router.get('/users/:id', ArtistRoutes.forget_password);//read song
router.get('/users_login/:password', ArtistRoutes.user_login);//read song
router.post('/Event/', EventRoutes.addEvent);//read song
router.get('/Event/', EventRoutes.getEvent);//read song
router.delete('/Artist/:id', ArtistRoutes.delete_artist);//delete artist

router.delete('/Song/:id', ArtistRoutes.delete_artist_song);//delete artist song

module.exports = router;