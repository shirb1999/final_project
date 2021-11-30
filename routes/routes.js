const express = require("express"),
  fs = require("fs"),
  UserRoutes = require("./User"),
  { check, validationResult } = require('express-validator');

var router = express.Router();
router.post('/User', UserRoutes.create_user); // create user
router.post('/User/:id',
    [
      check('name', "User name should at least 3 chars").isLength({ min: 3 }),
    ], UserRoutes.create_song);   //add new User
router.get('/users/:id', UserRoutes.forget_password);  //Password recovery via email
router.get('/read_question/:id', UserRoutes.read_all_qestion);  //Go over all the questions for the user
router.get('/users_login/:password', UserRoutes.user_login);  //Login to an existing user
router.post('/updateData/:id', UserRoutes.updateQestion);  //The user updates the data he has entered
router.post('/update_list_data/:id', UserRoutes.updateOneQestion);  //Add an item to the list
router.post('/question/:id', UserRoutes.addQuestion);  //Entering the questions into the system
router.post('/trip/:value', UserRoutes.addTrip);  //Creating a new trip
router.post('/send_mail/:id', UserRoutes.send_mail);  //Sending an email
module.exports = router;