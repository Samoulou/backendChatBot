const Intent = require('./intent_model');
var config = require('../../config/config.js');
var mongoose   = require('mongoose');

// config WIT IA
let Wit = null;
let interactive = null;
const WIT_TOKEN = config.WIT_TOKEN;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}
const client = new Wit({
  accessToken: WIT_TOKEN,
});
// end of config WIT IA



// Get functions
function index(req, res) {
  Intent.find(function(err, Intents) {
    if (err) {
      res.send(err);
    } else {
      res.send(Intents)
    }
  });
}


function getIntent() {
  console.log(mongoose.connection.readyState);
  console.log("je get intent by intent");
  let intentfound = 'salutation_informel';
  Intent.find({"intentName":intentfound}, function(err, intent) {
    console.log('ici?');
    if (err) {
      res.send(err);
    } else {
      res.send(intent)
    }
  });

}




// Post functions

// Put functions


// Delete functions



exports.index = index;
// exports.getMessageById = getMessageById;
// exports.getMessageByCompany = getMessageByCompany;
exports.getIntent = getIntent;
// exports.updateMessage = updateMessage;
