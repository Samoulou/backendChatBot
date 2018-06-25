// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var mongoose   = require('mongoose');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var flash    = require('connect-flash');
// var session      = require('express-session');
var config = require('./config/config.js');

// configuration ===============================================================
mongoose.connect(config.MONGO_URL); // connect to our database
console.log('lol');

var port = process.env.PORT || 6060;        // set our port
app.use(morgan('dev'));
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use(flash()); // use connect-flash for flash messages stored in session

// middleware to use for all requests
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// routes ======================================================================
require('./config/routes.js')(app); // load our routes and pass in our app and fully configured passport

// launch ======================================================================
app.listen(port);
console.log(mongoose.connection.readyState);
console.log('The magic happens on port : ' + port);


// -- OLD CODE --

// TODO: METTRE COMMENTAIRES
// const firstEntityValue = (entities, entity) => {
//   const val = entities && entities[entity] &&
//     Array.isArray(entities[entity]) &&
//     entities[entity].length > 0 &&
//     entities[entity][0].value
//   ;
//   if (!val) {
//     return null;
//   }
//   return typeof val === 'object' ? val.value : val;
// };

// TODO: METTRE COMMENTAIRES
// const THRESHOLD = 0.7;
// const handleMessage = ({entities}) => {
//   const Liste_document = firstEntityValue(entities, 'Liste_document');
//   const price_information = firstEntityValue(entities, 'price_information');
//   const document_sp_cifique = firstEntityValue(entities, 'document_sp_cifique');
//   const dateButoir = firstEntityValue(entities, 'dateButoir');
//   const greetings = firstEntityValue(entities, 'greetings');
//
//   // const confidenceGreetings = entities.greetings;
//   // const confidenceDocument = entities.Liste_document; // pour l'instant la seul solution que j'ai trouvé pour extraine la confidence car on ne sait pas à l'avance quelle entity sera donné, on ne peux pas la choisiri dynamiquement.
//   //   console.log(confidence);
//
//   // TODO: METTRE COMMENTAIRES
//   const entites = [Liste_document, price_information, document_sp_cifique, dateButoir, greetings];
//   for (var i = 0; i < entites.length; i++) {
//     if(entites[i] != null){
//       switch (entites[i]) { //🤖
//         case 'price_information':
//           console.log("Afin de pouvoir vous renseigner au mieux, pouvez-vous me préciser votre situation civile.");
//           break;
//         case 'formulaire_contact':
//           console.log("En cliquant sur ce lien vous trouverez notre formulaire de contact.");
//           break;
//         case 'DateButoir':
//           console.log("La date butoire pour la déclaration d'impôt est au 31 mars");
//           break;
//         case 'salutation_informel':
//           console.log("Bonjour, je suis ChatMee, que puis-je faire pour vous ?");
//           break;
//         case 'salutation_poli':
//           console.log("Bonjour, je suis ChatMee, à votre service.");
//           break;
//         case 'get_document_informations':
//           console.log("Voici la listes des documents.");
//           break;
//         case 'marie':
//           console.log("Pour une couple marié travaillant à Genève, le prix est de 150.- CHF.");
//           break;
//         case 'celibataire':
//           console.log("Pour une personne célibataire, le prix est de 100.- CHF.");
//           break;
//         default:
//           console.log(`Je ne comprend pas votre demande.`);
//           break;
//       }
//     }
//   }
// };
