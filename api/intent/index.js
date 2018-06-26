'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./intent_controller.js');


// Get functions
router.get('/', controller.index);

// Put functions

// Post functions
router.post('/', controller.userIntent);

// Delete functions


module.exports = router;
