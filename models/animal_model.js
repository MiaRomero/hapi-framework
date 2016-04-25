const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var animalSchema = new Schema({
  name: { type: String, unique: true },
  variety: String,
  age: Number,
  origin: { type: String, default: 'zoo' },
  food: String
});

module.exports = mongoose.model('Animals', animalSchema);
