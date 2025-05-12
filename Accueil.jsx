import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

function Accueil() {
  return (
    <Container className="text-center mt-5">
      <h1>Bienvenue sur VetCare 360</h1>
      <p className="mt-4">Gestion complète de la clinique vétérinaire</p>
      <div className="mt-4">
        <Link to="/veterinaires"><Button variant="primary" className="m-2">Liste des vétérinaires</Button></Link>
        <Link to="/recherche"><Button variant="secondary" className="m-2">Rechercher un propriétaire</Button></Link>
      </div>
    </Container>
  );
}

export default Accueil;
