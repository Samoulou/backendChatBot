'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./message_controller.js');


// Get functions
router.get('/', controller.index);

// Put functions

// Post functions
router.post('/', controller.userMessage);

// Delete functions


module.exports = router;
