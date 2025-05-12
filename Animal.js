const mongoose = require('mongoose');

const animalSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  espece: { type: String, required: true },
  race: { type: String, required: true },
  age: { type: Number, required: true },
  proprietaire: { type: mongoose.Schema.Types.ObjectId, ref: 'Proprietaire', required: true },
  visites: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Visite' }] 
});

module.exports = mongoose.model('Animal', animalSchema);
