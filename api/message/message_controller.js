const Message = require('./message_model');
const Intent = require('../intent/intent_model');
const intentController = require('../intent/intent_controller');
var cookieParser = require('cookie-parser');
var express  = require('express');
var app      = express();
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

app.use(cookieParser()); // read cookies

// Get functions
getMessageByConvId = (req, res) => {
  var id = req.params.id;
  Message.find({"conversationUid":id}).then(messages => res.json({ messages }))
}

// Post functions
userMessage = (req, res) => {
  var newMessage = req.body;
  //sending the message to the wit.ai API to be analyzed
  client.message(newMessage.message, {}).then((data) => {
    if(Object.keys(data.entities).length === 0){
      var intentFound = Intent.find({"name":"unknown_entity"}).then(intentFound => {
        intentFound.forEach((intent) => {
          res.json(intent)
        });
      });
    }
    else{
      var entity = Object.keys(data.entities).toString();
      var intentValue = data.entities[entity][0].value;
      var type;
      newMessage.type = entity;

      //if user choose to disable the saving of his message in the DB
      if(newMessage.savingState === "true"){
        Message.create(newMessage);
      }
      //Promise that will get the found intent from the analyzation previously done and fetch de intent from our DB to send the right answer
      var promise = new Promise((resolve, reject) => {
        var intentFound = intentController.getIntentByIntentName(intentValue);
        intentFound.then((intents) => {
          if(intents != null){
            resolve(intents.forEach((intent) => {
                  res.json(intent);
              })
            );
          }
          else {
            reject(Error('No intent'));
          }
        });
      });
    }
  });
}

// Delete functions
getMessageByConvId = (req, res) => {
  var id = req.params.id;
  Message.find({"conversationUid":id}).then(messages => res.json({ messages }));
}

exports.getMessageByConvId = getMessageByConvId;
exports.userMessage = userMessage;
