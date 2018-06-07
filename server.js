
var mongoose   = require('mongoose');
var morgan = require('morgan');
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var MessageModel    = require('./models/message');

let Wit = null;
let interactive = null;
const WIT_TOKEN = "GV4EHW4S25EMZR7J3BVN5EMKES4YREUG";
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}
const client = new Wit({
  accessToken: WIT_TOKEN,
});

// TODO: METTRE COMMENTAIRES
const firstEntityValue = (entities, entity) => {
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  return typeof val === 'object' ? val.value : val;
};

// TODO: METTRE COMMENTAIRES
const THRESHOLD = 0.7;
const handleMessage = ({entities}) => {
  const Liste_document = firstEntityValue(entities, 'Liste_document');
  const price_information = firstEntityValue(entities, 'price_information');
  const document_sp_cifique = firstEntityValue(entities, 'document_sp_cifique');
  const dateButoir = firstEntityValue(entities, 'dateButoir');
  const greetings = firstEntityValue(entities, 'greetings');

  // const confidenceGreetings = entities.greetings;
  // const confidenceDocument = entities.Liste_document; // pour l'instant la seul solution que j'ai trouvé pour extraine la confidence car on ne sait pas à l'avance quelle entity sera donné, on ne peux pas la choisiri dynamiquement.
  //   console.log(confidence);

  // TODO: METTRE COMMENTAIRES
  const entites = [Liste_document, price_information, document_sp_cifique, dateButoir, greetings];
  for (var i = 0; i < entites.length; i++) {
    if(entites[i] != null){
      switch (entites[i]) { //🤖
        case 'price_information':
          console.log("Afin de pouvoir vous renseigner au mieux, pouvez-vous me préciser votre situation civile.");
          break;
        case 'formulaire_contact':
          console.log("En cliquant sur ce lien vous trouverez notre formulaire de contact.");
          break;
        case 'DateButoir':
          console.log("La date butoire pour la déclaration d'impôt est au 31 mars");
          break;
        case 'salutation_informel':
          console.log("Bonjour, je suis ChatMee, que puis-je faire pour vous ?");
          break;
        case 'salutation_poli':
          console.log("Bonjour, je suis ChatMee, à votre service.");
          break;
        case 'get_document_informations':
          console.log("Voici la listes des documents.");
          break;
        case 'marie':
          console.log("Pour une couple marié travaillant à Genève, le prix est de 150.- CHF.");
          break;
        case 'celibataire':
          console.log("Pour une personne célibataire, le prix est de 100.- CHF.");
          break;
        default:
          console.log(`Je ne comprend pas votre demande.`);
          break;
      }
    }
  }
};

//mongoose.connect('mongodb://localhost:27017/ChatBot_DB_DEV'); // connect to our database

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 6060;        // set our port

app.use(morgan('dev'));
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests
router.use(function(req, res, next) {
 // TODO LOGGING HERE
 res.header('Access-Control-Allow-Origin', '*');
 res.header('Access-Control-Allow-Methods', 'OPTIONS, GET,PUT,POST,DELETE');
 // res.header('Access-Control-Allow-Headers', 'X-Requested-With');
 res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
 next(); // make sure we go to the next routes and don’t stop here
});

router.get('/', function(req, res) {
    client.message('Bonjour', {}).then((data) => {
      console.log('yes une réponse de wit : ' + JSON.stringify(data));
      res.json(data);
    })
    .catch(console.error);
});

// TODO: METTRE COMMENTAIRES
router.post("/message", (req, res) => {
  console.log(req.body);

    var answer;
    var output = {};
    client.message(req.body.message, {}).then((data) => {
    var entity = Object.keys(data.entities).toString();
    var intent = data.entities[entity];
    var value = intent[0].value

      if(intent != null){
        switch (value) {
          case 'price_information':
            answer="🤖 Afin de pouvoir vous renseigner au mieux, pouvez-vous me préciser votre situation civile.";
            output = [intent, answer]
            res.json(output);
            break;
          case 'formulaire_contact':
            answer="🤖 En cliquant sur ce lien vous trouverez notre formulaire de contact.";
            res.json(answer);
            break;
          case 'DateButoir':
            answer="🤖 La date butoire pour la déclaration d'impôt est au 31 mars";
            res.json(answer);
            break;
          case 'salutation_informel':
            answer = "Bonjour, je suis ChatMee, que puis-je faire pour vous ?";
            output = [intent, answer]
            res.json(output);
            break;
          case 'salutation_poli':
            answer="Bonjour, je suis ChatMee, à votre service.";
            res.json(answer);
            break;
          case 'get_document_informations':
            answer="🤖 Voici les documents.";
            res.json(answer);
            break;
          case 'marie':
            answer="🤖 Pour une couple marié travaillant à Genève, le prix est de 150 CHF.";
            res.json(answer);
            break;
          case 'celibataire':
            answer="🤖 Pour une personne célibataire, le prix est de 100 CHF.";
            output = [intent, answer]
            res.json(output);
            break;
          default:
            answer=`🤖 Je ne comprend pas votre demande.`;
            res.json(answer);
            break;
        }
      }
  })
  .catch(console.error);
});

app.use('/api', router);
app.listen(port);

// interactive(client, handleMessage);
