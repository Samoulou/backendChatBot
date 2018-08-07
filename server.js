// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var mongoose   = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
// var session      = require('express-session');
var config = require('./config/config.js');
// configuration ===============================================================
mongoose.connect(config.MONGO_URL); // connect to our database

var port = process.env.PORT || 6060;        // set our port
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(flash()); // use connect-flash for flash messages stored in session

// middleware to use for all requests
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port : ' + port);
