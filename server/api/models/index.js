
const mongoose = require('mongoose');
//var uniqueValidator = require('mongoose-unique-validator');

const cowSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: {type: String, required: true, unique: true },
  description: {type: String, required: true }
});


// cowSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

//cowSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Cows', cowSchema);


