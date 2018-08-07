var express = require('express');
var router = express.Router();
var controller = require('./message_controller.js');

// Get functions
router.get('/:id', controller.getMessageByConvId);

// Post functions
router.post('/', controller.userMessage);

module.exports = router;
