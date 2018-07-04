// load the things we need
var mongoose = require('mongoose');

// define the schema for our message model
var conversationSchema = mongoose.Schema({
    uid: String,
});

// create the model for messages and expose it to our app
module.exports = mongoose.model('Conversation', conversationSchema);
