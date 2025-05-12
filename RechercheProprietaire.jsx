import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function RechercheProprietaire() {
  const [nom, setNom] = useState('');
  const navigate = useNavigate();

  const handleRecherche = (e) => {
  e.preventDefault();
  navigate(`/resultats/${nom.trim() || 'all'}`); 
};
;

  return (
    <Container className="mt-5">
      <h2>Rechercher un propriétaire</h2>
      <Form onSubmit={handleRecherche}>
        <Form.Group>
          <Form.Label>Nom de famille</Form.Label>
          <Form.Control
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Rechercher</Button>
        <Button variant="success" className="mt-3 ms-2" onClick={() => navigate('/proprietaire/ajouter')}>
          Ajouter un nouveau propriétaire
        </Button>
      </Form>
    </Container>
  );
}

export default RechercheProprietaire;
