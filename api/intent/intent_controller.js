const Intent = require('./intent_model');
var config = require('../../config/config.js');

// Get functions
function getIntentByIntentName(intent) {
  var promise = Intent.find({"name":intent}).exec();
  return promise;
}
function getUnknownIntent() {
  Intent.find({"name":"unknown_entity"}).then(unknown => res.json({ unknown }))
}


// Post functions
function createIntent(req, res) {
  var newIntent = req.body;
  Intent.create(newIntent).then(intent => res.json({ intent }));
}

exports.getIntentByIntentName = getIntentByIntentName;
exports.createIntent = createIntent;
