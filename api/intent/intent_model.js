// app/models/message.js
// load the things we need
var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our message model
var intentSchema = mongoose.Schema({

  answer: String,
  type : String,
  intentName: String,

});

// create the model for messages and expose it to our app
module.exports = mongoose.model('intent', intentSchema);
