var express = require('express');
var router = express.Router();
var controller = require('./intent_controller.js');

// Get functions
router.get('/', controller.getIntentByIntentName);

// Post functions
router.post('/', controller.createIntent);

module.exports = router;
