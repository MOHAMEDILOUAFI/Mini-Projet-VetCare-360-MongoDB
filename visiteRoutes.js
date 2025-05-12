const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Visite = require('../models/Visite');
const Animal = require('../models/Animal');


router.get('/animal/:id', async (req, res) => {
  try {
    console.log(" ID de l'animal reçu :", req.params.id);
    const visites = await Visite.find({ animal: req.params.id });

    if (!visites || visites.length === 0) {
      return res.status(404).json({ error: "Aucune visite trouvée pour cet animal." });
    }

    res.json(visites);
  } catch (err) {
    console.error(" Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "Identifiant de visite non valide" });
  }

  try {
    const visite = await Visite.findById(id);
    if (!visite) {
      return res.status(404).json({ error: "Visite introuvable" });
    }
    res.json(visite);
  } catch (err) {
    console.error(" Erreur:", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { date, description } = req.body;

    if (!date || !description) {
      return res.status(400).json({ error: "Tous les champs sont requis. Vérifiez et réessayez." });
    }


    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Format de date invalide. Utilisez YYYY-MM-DD." });
    }

  
    const visite = await Visite.findById(req.params.id);
    if (!visite) {
      return res.status(404).json({ error: "Visite introuvable" });
    }

    
    visite.date = new Date(date);
    visite.description = description;
    await visite.save();

    res.json({ message: "Visite mise à jour avec succès", visite });
  } catch (err) {
    console.error(" Erreur lors de la mise à jour:", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { date, description, animal } = req.body;

    console.log("🔍 ID de l'animal reçu :", animal);

    if (!date || !description || !animal) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ error: "Format de date invalide. Utilisez YYYY-MM-DD." });
    }

    const pet = await Animal.findById(animal);
    if (!pet) {
      return res.status(404).json({ error: "Animal non trouvé" });
    }

    const visite = new Visite({ date: new Date(date), description, animal });
    await visite.save();

    pet.visites.push(visite._id);
    await pet.save();

    res.status(201).json(visite);
  } catch (err) {
    console.error("Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
