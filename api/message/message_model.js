// load the things we need
var mongoose = require('mongoose');
var messageSchema = mongoose.Schema({
  message: String,
  type : String,
  date : { type: Date, default: Date.now },
  savingState: { type: Boolean, default: "true" },
  conversationUid : String,
});
// create the model for messages and expose it to our app
module.exports = mongoose.model('Message', messageSchema);
