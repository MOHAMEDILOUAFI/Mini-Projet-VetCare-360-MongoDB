const mongoose = require('mongoose');

const visiteSchema = new mongoose.Schema({
  animal: { type: mongoose.Schema.Types.ObjectId, ref: 'Animal' },
  date: Date,
  description: String
});

module.exports = mongoose.model('Visite', visiteSchema);
