
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

const THRESHOLD = 0.7;
const handleMessage = ({entities}) => {
  const Liste_document = firstEntityValue(entities, 'Liste_document');
  const price_information = firstEntityValue(entities, 'price_information');
  const document_sp_cifique = firstEntityValue(entities, 'document_sp_cifique');
  const dateButoir = firstEntityValue(entities, 'dateButoir');
  const greetings = firstEntityValue(entities, 'greetings');

  const confidenceGreetings = entities.greetings;
  const confidenceDocument = entities.Liste_document; // pour l'instant la seul solution que j'ai trouvé pour extraine la confidence car on ne sait pas à l'avance quelle entity sera donné, on ne peux pas la choisiri dynamiquement.
    console.log(confidence);

  const entites = [Liste_document, price_information, document_sp_cifique, dateButoir, greetings];
  for (var i = 0; i < entites.length; i++) {
    if(entites[i] != null){
      switch (entites[i]) {
        case 'price_information':
          console.log("🤖 Afin de pouvoir vous renseigner au mieux, pouvez-vous me préciser votre situation civile");
          break;
        case 'formulaire_contact':
          console.log("🤖 En cliquant sur ce lien vous trouverez notre formulaire de contact");
          break;
        case 'DateButoir':
          console.log("🤖 La date butoire pour la déclaration d'impôt est au 31 mars");
          break;
        case 'salutation_informel':
          console.log("🤖 Yo, je suis ChatMee, qu'est-ce-que je peux faire pour toi?");
          break;
        case 'salutation_poli':
          console.log("🤖 Bonjour, je suis ChatMee, à votre service");
          break;
        case 'get_document_informations':
          console.log("🤖 Voici les documents");
          break;
        case 'marie':
          console.log("🤖 Pour une couple marié travaillant à Genève, le prix est de 150 CHF");
          break;
        case 'celibataire':
          console.log("🤖 Pour une personne célibataire, le prix est de 100 CHF");
          break;
        default:
          console.log(`🤖 Je ne comprend pas votre demande`);
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

router.post("/message", (req, res) => {
  client.message(req.body.message, {}).then((data) => {
    var intent = data.entities.greetings;
    var intentValue;
    console.log('yes une réponse de wit: ' + JSON.stringify(intent));
    for (var i = 0; i < intent.length; i++) {
      intentValue = intent[i].value;
      console.log(intentValue);
    }
    switch (intentValue) {
      case 'price_information':
        console.log("🤖 Afin de pouvoir vous renseigner au mieux, pouvez-vous me préciser votre situation civile");
        break;
      case 'formulaire_contact':
        console.log("🤖 En cliquant sur ce lien vous trouverez notre formulaire de contact");
        break;
      case 'DateButoir':
        console.log("🤖 La date butoire pour la déclaration d'impôt est au 31 mars");
        break;
      case 'salutation_informel':
        console.log("🤖 Yo, je suis ChatMee, qu'est-ce-que je peux faire pour toi?");
        break;
      case 'salutation_poli':
        console.log("🤖 Bonjour, je suis ChatMee, à votre service");
        break;
      case 'get_document_informations':
        console.log("🤖 Voici les documents");
        break;
      default:
        console.log(`🤖 Je ne comprend pas votre demande`);
        break;
    }
  })
  .catch(console.error);
});

app.use('/api', router);
app.listen(port);

interactive(client, handleMessage);
