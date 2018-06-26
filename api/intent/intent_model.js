// app/models/intent.js
// load the things we need
var mongoose = require('mongoose');

// define the schema for our intent model
var intentSchema = mongoose.Schema({

      message : String,
});

// create the model for intents and expose it to our app
module.exports = mongoose.model('Intent', intentSchema);
