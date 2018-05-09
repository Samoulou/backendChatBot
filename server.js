
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

const handleMessage = ({entities}) => {
  const intent = firstEntityValue(entities, 'intent');
    if (!intent) {
      console.log("il faut me fournir un intent");
      return;
    }
    switch (intent) {
      case 'unknown_question':
        console.log("🤖 I don't understand");
        break;
      case 'greetings':
        console.log("🤖 Bonjour, je suis Sam, à votre service");
        break;
      case 'get_document_informations':
        console.log("🤖 Voici les documents");
        break;
      default:
        console.log(`🤖  ${intent.value}`);
        break;
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
    var intent = data.entities.intent;
    var intentValue;
    // console.log('yes une réponse de wit: ' + JSON.stringify(intent));
    for (var i = 0; i < intent.length; i++) {
      intentValue = intent[i].value;
      console.log(intentValue);
    }
    switch (intentValue) {
      case 'unknown_question':
        res.json("🤖 Je ne comprend pas cette question, pouvais vous être plus précis?")
        break;
      case 'greetings':
        res.json("🤖 Bonjour, je suis ChatMe, à votre service");
        break;
      case 'get_document_informations':
        res.json("🤖 Voici les documents");
        break;
      default:
        res.json(`🤖  ${intent.value}`);
        break;
    }
  })
  .catch(console.error);
});

app.use('/api', router);
app.listen(port);

// interactive(client, handleMessage);
