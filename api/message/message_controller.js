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
function index(req, res) {
  Message.find(function(err, Messages) {
    if (err) {
      res.send(err);
    } else {
      res.send(Messages)
    }
  });
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
<<<<<<< HEAD
  });

  // var answer;
  // var type;
  // var output = {};
  // client.message(req.body.message, {}).then((data) => {
  // var entity = Object.keys(data.entities).toString();
  // var intent = data.entities[entity];

  // TODO: les answers de WIT sont des intents  => on get les intent dans la DB => on fais pas de switch case mais un findby intent
  // Intent.find(function(err, intent) {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //
  //
  //
  //
  //     res.send(intent)
  //   }
  // });

    // if(intent != null){
    //   var value = intent[0].value
    //   switch (value) {
    //     case 'price_information':
    //       answer="Afin de pouvoir vous renseigner au mieux, pouvez-vous me préciser votre situation civile.";
    //       type = "url"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'felicitation':
    //       answer="Génial, si vous avez encore besoin de moi, je suis là encore un moment.";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'remerciement':
    //       answer="Avec plaisir, je reste à votre disposition en cas de besoin !";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'formulaire_contact':
    //       answer="En cliquant sur ce lien vous trouverez notre formulaire de contact.";
    //       type = "url"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'DateButoir':
    //       answer="La date butoire pour la déclaration d'impôt est au 31 mars";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'salutation_informel':
    //       answer = "Bonjour, je suis ChatMee, que puis-je faire pour vous ?";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'salutation_poli':
    //       answer="Bonjour, je suis ChatMee, à votre service.";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'get_document_informations':
    //       answer="Voici les documents.";
    //       type = "liste"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'marie':
    //       answer="Pour une couple marié travaillant à Genève, le prix est de 150 CHF.";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     case 'celibataire':
    //       answer="Pour une personne célibataire, le prix est de 100 CHF.";
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //     default:
    //       answer=`Je ne comprend pas votre demande.`;
    //       type = "text"
    //       output = {intent, answer, type}
    //       res.json(output);
    //       break;
    //   }
    // }
    // else {
    //   answer=`Je ne comprend pas votre demande.`;
    //   type = "text"
    //   output = [answer, type]
    //   res.json(output);
    // }
// })
// .catch(console.error);
=======
>>>>>>> 06e09e425f2d60a28181419c7bb414903dfd9c24

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

exports.index = index;
exports.userMessage = userMessage;
