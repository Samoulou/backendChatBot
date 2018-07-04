// load the things we need
var mongoose = require('mongoose');

// define the schema for our message model
var messageSchema = mongoose.Schema({
  message: String,
  type : String,
  date : { type: Date, default: Date.now },
  savingState: { type: Boolean, default: "true" },
  // conversation : String, // TODO: ensuite faire un object + api conversation
  conversation : [{
    type: mongoose.Schema.ObjectId,
    ref: 'Conversation',
  }],
  // active : { type: Boolean, default: "true" },

});

// create the model for messages and expose it to our app
module.exports = mongoose.model('Message', messageSchema);
