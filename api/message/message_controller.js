const Message = require('./message_model');
const intentController = require('../intent/intent_controller');
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
function getMessageByConvId(req, res) {
  var id = req.params.id;
  Message.find({"conversationUid":id}).then(messages => res.json({ messages }))
}

// Put functions

// Post functions
// Post function when user is submitting a message
function userMessage(req, res) {
  var newMessage = req.body;
  //sending the message to the wit.ai API to be analyzed
  client.message(newMessage.message, {}).then((data) => {
    var entity = Object.keys(data.entities).toString();
    var intentValue = data.entities[entity][0].value;
    var type;
    newMessage.type = entity;

    //if user choose to disable the saving of his message in the DB
    if(req.body.savingState){
      Message.create(newMessage);
    }

    //Promise that will get the found intent from the analyzation previously done and fetch de intent from our DB to send the right answer
    var promise = new Promise((resolve, reject) => {
      var intentFound = intentController.getIntentByIntentName(intentValue);
      intentFound.then((intents) => {
        console.log(intents);
        if(intents != null){
          resolve(intents.forEach((intent) => {
                res.json(intent );
            })
          );
        }
        else {
          reject(Error('No intent'));
        }
      });
    });
  });
}

// Delete functions

exports.getMessageByConvId = getMessageByConvId;
exports.userMessage = userMessage;
