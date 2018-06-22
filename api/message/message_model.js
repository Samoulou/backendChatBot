// app/models/message.js
// load the things we need
var mongoose = require('mongoose');
// var bcrypt   = require('bcrypt-nodejs');

// define the schema for our message model
var messageSchema = mongoose.Schema({

  // owner:{
  //   type: String,
  // },
  // text: {
  //   type: String,
  // }
  message: String,
  type : String,
  date : { type: Date, default: Date.now },
  conversation : String, // TODO: ensuite faire un object + api conversation
  // conversation : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Conversation', index: {unique: true, dropDups: true} }],
  // active : { type: Boolean, default: "true" },

});

// create the model for messages and expose it to our app
module.exports = mongoose.model('message', messageSchema);
