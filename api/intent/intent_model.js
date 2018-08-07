// load the things we need
var mongoose = require('mongoose');
// define the schema for our intent model
var intentSchema = mongoose.Schema({
      name : String,
      type : String,
      answer : String,
});
module.exports = mongoose.model('Intent', intentSchema);
