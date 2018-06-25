'use strict';

var express = require('express');
var router = express.Router();
var controller = require('./intent_controller.js');


// Get functions
router.get('/', controller.index);
router.get('/getIntent', controller.getIntent);

// Put functions

// Post functions

// Delete functions


module.exports = router;
