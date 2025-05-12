const express = require('express');
const router = express.Router();
const Animal = require('../models/Animal');
const Proprietaire = require('../models/Proprietaire');

router.get('/', async (req, res) => {
  try {
    const animaux = await Animal.find().populate('proprietaire');
    res.json(animaux);
  } catch (err) {
    console.error("❌ Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id).populate('proprietaire');
    if (!animal) {
      return res.status(404).json({ error: "Animal non trouvé" });
    }
    res.json(animal);
  } catch (err) {
    console.error("❌ Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.get('/proprietaire/:id', async (req, res) => {
  try {
    const animaux = await Animal.find({ proprietaire: req.params.id });
    res.json(animaux);
  } catch (err) {
    console.error("❌ Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { nom, espece, race, age, proprietaire } = req.body;

    if (!nom || !espece || !race || !age || !proprietaire) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

 
    const owner = await Proprietaire.findById(proprietaire);
    if (!owner) {
      return res.status(404).json({ error: "Propriétaire non trouvé" });
    }

   
    const animal = new Animal({ nom, espece, race, age, proprietaire });
    await animal.save();

    
    owner.pets.push(animal._id);
    await owner.save();

    res.status(201).json(animal);
  } catch (err) {
    console.error("❌ Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { nom, espece, race, age } = req.body;

   
    if (!nom || !espece || !race || !age) {
      return res.status(400).json({ error: "Tous les champs sont requis. Vérifiez et réessayez." });
    }

    
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: "Animal non trouvé" });
    }

   
    animal.nom = nom;
    animal.espece = espece;
    animal.race = race;
    animal.age = age;

    await animal.save();
    res.json({ message: "✅ Animal mis à jour avec succès", animal });
  } catch (err) {
    console.error("❌ Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const animal = await Animal.findById(req.params.id);
    if (!animal) {
      return res.status(404).json({ error: "Animal non trouvé" });
    }

   
    await Animal.findByIdAndDelete(req.params.id);

    
    await Proprietaire.updateOne(
      { _id: animal.proprietaire },
      { $pull: { pets: animal._id } }
    );

    res.json({ message: "Animal supprimé avec succès" });
  } catch (err) {
    console.error("❌ Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
