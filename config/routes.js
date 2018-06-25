// config/routes.js
// var configAuth = require('./auth');

var express = require('express');
var router = express.Router();
var messageAPI = require('../api/message');
var intentAPI = require('../api/intent');

module.exports = function(app) {

  app.use("/styles", express.static(__dirname + "/styles"));
  // api routes
  app.use('/api/messages', messageAPI);
  app.use('/api/intents', intentAPI);

  // else by default redirect to home
  app.route('/*').get((req, res) => {
    res.json("Welcome to Chatmee api");
  });

};
