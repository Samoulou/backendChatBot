const Conversation = require('./conversation_model');
var config = require('../../config/config.js');
// config WIT IA
let Wit = null;
let interactive = null;
const WIT_TOKEN = config.WIT_TOKEN;
try {
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
function getConversationId(req, res) {
  Conversation.find(function(err, Conversations) {
    if (err) {
      res.send(err);
    } else {
      res.send(Conversations)
    }
  });
}

// Put functions

// Post functions
// Post function when user is submitting a message
function createConversation(req, res) {
  var newConversation = req.body;
  Conversation.create(newConversation).then(conversation => res.json({ conversation }));
}

// Delete functions

exports.createConversation = createConversation;
exports.getConversationId = getConversationId;
