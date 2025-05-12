const mongoose = require('mongoose');

const veterinaireSchema = new mongoose.Schema({
  nom: String,
  specialite: String
});

module.exports = mongoose.model('Veterinaire', veterinaireSchema);
