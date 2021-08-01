const request=require('request');
var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'kvudaweb@gmail.com',
    pass: 'kvuda1234'
  }
});

var mailOptions = {
  from: 'kvudaweb@gmail.com',
  to: 'ayalla120120@gmail.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})

