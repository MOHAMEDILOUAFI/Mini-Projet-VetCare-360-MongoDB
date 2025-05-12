const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const proprietaireRoutes = require('./routes/proprietaireRoutes');
const animalRoutes = require('./routes/animalRoutes');
const veterinaireRoutes = require('./routes/veterinaireRoutes');
const visiteRoutes = require('./routes/visiteRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log(' Connecté à MongoDB'))
.catch(err => console.error(' Erreur MongoDB:', err));

// Routes API
app.use('/api/proprietaires', proprietaireRoutes);
app.use('/api/animaux', animalRoutes);
app.use('/api/veterinaires', veterinaireRoutes);
app.use('/api/visites', visiteRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(` Serveur backend lancé sur le port ${PORT}`));
