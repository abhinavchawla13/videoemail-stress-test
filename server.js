// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var https = require('https');
var async = require('async');
var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
var smtp = require('nodemailer-smtp-transport');
var connect = require('connect');
var serveStatic = require('serve-static');
var fs = require('fs');
var cheerio = require('cheerio');
var randtoken = require('rand-token');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

var Bear = require('./app/models/bear');
var YouTube = require('./app/models/youtube');
var EmailData = require('./app/models/emailData');


connect().use(serveStatic(__dirname)).listen(8000, function(){
    console.log('HTML server running on 8080...');
});


// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Connection Request made');
    next(); // make sure we go to the next routes and don't stop here
});



// function videoCheck(id, userMail, email, subject, message) {
//   console.log(id);
//
//   var currentStatus = "1";
//   recursiveCall(id, "", userMail, email, subject, message);
// }
//
// var recursiveCall = function (id, res, userMail, email, subject, message) {
//   if(res && res == 'processed') {
//     console.log(".");
//     console.log(res);
//
//     sendEmail(id, userMail, email, subject, message);
//     return res;
//   }
//   process.stdout.write(".");
//   return https.get(
//     'https://www.googleapis.com/youtube/v3/videos?part=status&id=' + id + '&key=AIzaSyA_wS4nqtaxPT5XvX3_IV6n9uot24YPNJ8',
//     function(response) {
//       var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {
//
//             // Data reception is done, do whatever with it!
//             var parsed = JSON.parse(body);
//             // console.log(parsed);
//             setTimeout(function(){
//               recursiveCall(id, parsed.items[0].status.uploadStatus, userMail, email, subject, message);
//             }, 2000)
//             // setTimeout(recursiveCall(id, parsed.items[0].status.uploadStatus), 1000);
//             // return recursiveCall(id, parsed.items[0].status.uploadStatus);
//         });
//     }
//   ).on('error', (e) => {
//     console.error(e);
//   });
// };

currentTestId = 0;
randomTimeWait = 0;

function randomInt (low, high) {
    return Math.floor(Math.random() * (high - low) + low);
}

function checkVideoStatus(videoID, currentTestId){
    console.log("Step 1", currentTestId);
    randomTimeWait = randomInt(1, 20);
    console.log("Step 1 alphaTime: ", randomTimeWait);
    setTimeout(function(){
        console.log("\nProcessed");
        console.log("Wait Time: ", randomTimeWait);
        console.log("ID: ", currentTestId);
    }, randomTimeWait*1000);
}

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

router.route('/stress-tester')

    .get(function(req, res) {
      console.log("Getting links");
      res.json({message:'stress-tester GET working!'});

       })

    .post(function(req, res){
    //   youTube.url = req.body.url;  // set the bears name (comes from the request)
     console.log("stress-tester POST working!");
     res.json({ message:'stress-tester POST working!'});

     videoID = req.body.videoid;

     console.log("video_id: ", videoID);
     currentTestId++;
     checkVideoStatus(videoID, currentTestId);
      // save the bear and check for errors


});


// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
