const Intent = require('./intent_model');
var config = require('../../config/config.js');

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

// Put functions

// Post functions
function userIntent(req, res) {

}

// Delete functions



exports.index = index;
// exports.getIntentById = getIntentById;
// exports.getIntentByCompany = getIntentByCompany;
exports.userIntent = userIntent;
// exports.updateIntent = updateIntent;
