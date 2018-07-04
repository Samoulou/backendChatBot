'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./conversation_controller.js');


// Get functions
router.get('/', controller.getConversationId);

// Put functions

// Post functions
router.post('/', controller.createConversation);

// Delete functions


module.exports = router;
