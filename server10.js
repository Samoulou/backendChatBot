
var mongoose   = require('mongoose');

// call the packages we need
var morgan = require('morgan');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var MessageModel    = require('./models/message');

// configure app to use bodyParser()
// this will let us get the data from a POST
mongoose.connect('mongodb://localhost:27017/ChatBot_DB_DEV'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 6060;        // set our port

// ROUTES FOR OUR API
// =============================================================================
app.use(morgan('dev'));
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
 // TODO LOGGING HERE
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
 // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 next(); // make sure we go to the next routes and don’t stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'salut' });
});

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

router.route('/messages')
.get(function(req, res) {
  MessageModel.find(function(err, message) {
    if (err) {
      res.send(err);
    } else {
      res.json(message);
    }
  });
});

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
