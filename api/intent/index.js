'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./intent_controller.js');


// Get functions
router.get('/', controller.getIntentByIntentName);

// Put functions

// Post functions
router.post('/', controller.createIntent);

// Delete functions


module.exports = router;
