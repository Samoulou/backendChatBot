const Intent = require('./intent_model');
var config = require('../../config/config.js');

// Get functions
function getIntentByIntentName(intent) {
  var promise = Intent.find({"name":intent}).exec();
  return promise;
}

// Put functions

// Post functions
function createIntent(req, res) {
  var newIntent = req.body;
  Intent.create(newIntent).then(intent => res.json({ intent }));
}

// Delete functions


exports.getIntentByIntentName = getIntentByIntentName;
exports.createIntent = createIntent;
