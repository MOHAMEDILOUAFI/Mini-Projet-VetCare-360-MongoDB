const express = require('express');
const router = express.Router();
const Veterinaire = require('../models/Veterinaire');


router.get('/', async (req, res) => {
  const vets = await Veterinaire.find();
  res.json(vets);
});

router.post('/', async (req, res) => {
  const vet = new Veterinaire(req.body);
  await vet.save();
  res.status(201).json(vet);
});

module.exports = router;
