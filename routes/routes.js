const express = require("express"),
  fs = require("fs"),
  UserRoutes = require("./User"),
  EventRoutes = require("./Event"),
  { check, validationResult } = require('express-validator');

var router = express.Router();

router.get('/User/:id', UserRoutes.read_all_qestion);//read all user
router.post('/User',
      [
        check('name', "Album name can't be empty").notEmpty(),
        check('name', "Album name length should be under 100 chars").isLength({ max: 100 }),
        check('name', "Album name length should at least 2 chars").isLength({ min: 2 }),

      ], UserRoutes.create_user); // create user
router.post('/User/:id',
    [
      check('name', "User name should at least 3 chars").isLength({ min: 3 }),
    ], UserRoutes.create_song);   //add new User to user
// router.get('/User/:id', UserRoutes.read_song);//read song
router.get('/users/:id', UserRoutes.forget_password);//read song
router.get('/read_question/:id', UserRoutes.read_all_qestion);
router.get('/users_login/:password', UserRoutes.user_login);//read song
router.post('/Event/', EventRoutes.addEvent);//read song
router.post('/update_data/:id', UserRoutes.updateQestion);
router.post('/question/:id', UserRoutes.addQuestion);//read song
router.post('/trip/:value', UserRoutes.addTrip);//read song
router.post('/send_mail/:id', UserRoutes.send_mail);//read song
router.post('/listTrip/:values', UserRoutes.creatList);//read song
router.get('/Event/', EventRoutes.getEvent);//read song
router.delete('/User/:id', UserRoutes.delete_user);//delete user

router.delete('/Song/:id', UserRoutes.delete_user_song);//delete user song

module.exports = router;