const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const Proprietaire = require('../models/Proprietaire');
const Animal = require('../models/Animal');


router.get('/search', async (req, res) => {
  try {
    const { nom } = req.query;
    if (!nom) {
      return res.status(400).json({ error: "Le paramètre 'nom' est requis" });
    }
    const resultats = await Proprietaire.find({ nom: { $regex: nom, $options: 'i' } }).populate('pets');
    if (resultats.length === 0) {
      return res.status(404).json({ error: "Aucun propriétaire trouvé" });
    }
    res.json(resultats);
  } catch (err) {
    console.error(" Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.get('/', async (req, res) => {
  try {
    const proprietaires = await Proprietaire.find().populate('pets');
    res.json(proprietaires);
  } catch (err) {
    console.error(" Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.get('/:id', async (req, res) => {
  try {
    
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: "Invalid ID provided" });
    }

    const proprietaire = await Proprietaire.findById(req.params.id).populate({
      path: 'pets',
      populate: { path: 'visites' }  
    });
    if (!proprietaire) {
      return res.status(404).json({ error: "Propriétaire non trouvé" });
    }
    res.json(proprietaire);
  } catch (err) {
    console.error("Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.post('/', async (req, res) => {
  try {
    const { nom, prenom, adresse, telephone } = req.body;

    if (!nom || !prenom || !adresse || !telephone) {
      return res.status(400).json({ error: "Tous les champs sont requis" });
    }

    const proprietaire = new Proprietaire({ nom, prenom, adresse, telephone });
    await proprietaire.save();
    res.status(201).json(proprietaire);
  } catch (err) {
    console.error(" Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.put('/:id', async (req, res) => {
  try {
    const { nom, prenom, adresse, telephone } = req.body;

   
    if (!nom || !prenom || !adresse || !telephone) {
      return res.status(400).json({ error: "Tous les champs sont requis. Vérifiez et réessayez." });
    }


    const proprietaire = await Proprietaire.findById(req.params.id);
    if (!proprietaire) {
      return res.status(404).json({ error: "Propriétaire non trouvé" });
    }

    
    proprietaire.nom = nom;
    proprietaire.prenom = prenom;
    proprietaire.adresse = adresse;
    proprietaire.telephone = telephone;

    await proprietaire.save();
    res.json({ message: " Propriétaire mis à jour avec succès", proprietaire });
  } catch (err) {
    console.error(" Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    const proprietaire = await Proprietaire.findById(req.params.id);
    if (!proprietaire) {
      return res.status(404).json({ error: "Propriétaire non trouvé" });
    }


    await Animal.deleteMany({ proprietaire: req.params.id });

    await Proprietaire.findByIdAndDelete(req.params.id);

    res.json({ message: "Propriétaire et ses animaux supprimés avec succès" });
  } catch (err) {
    console.error(" Erreur :", err.message);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
});

module.exports = router;
