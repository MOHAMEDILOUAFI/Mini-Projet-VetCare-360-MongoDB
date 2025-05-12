import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card, ListGroup, Button, Alert } from 'react-bootstrap';

function SyntheseProprietaire() {
  const { id } = useParams();
  const [proprietaire, setProprietaire] = useState(null);
  const [error, setError] = useState('');

  
  useEffect(() => {
    axios.get(`http://localhost:5000/api/proprietaires/${id}`)
      .then(res => setProprietaire(res.data))
      .catch(err => {
        console.error("Erreur Axios:", err.response?.data || err.message);
        setError("Propriétaire introuvable!");
      });
  }, [id]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date && !isNaN(date.getTime()) ? date.toLocaleDateString() : "Date invalide";
  };

  return (
    <Container className="mt-5">
      <h2>Synthèse du propriétaire</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {proprietaire && (
        <>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>{proprietaire.prenom} {proprietaire.nom}</Card.Title>
              <Card.Text>
                <strong>Adresse:</strong> {proprietaire.adresse} <br />
                <strong>Téléphone:</strong> {proprietaire.telephone}
              </Card.Text>
              <Link to={`/proprietaire/modifier/${proprietaire._id}`}>
                <Button variant="primary" className="mt-2">Modifier les informations</Button>
              </Link>
            </Card.Body>
          </Card>

          <h3>Animaux du propriétaire</h3>
          <ListGroup>
            {proprietaire.pets && proprietaire.pets.length > 0 ? (
              proprietaire.pets.map((animal) => (
                <ListGroup.Item key={animal._id} className="d-flex justify-content-between align-items-start">
                  <div>
                    <strong>{animal.nom}</strong> - {animal.espece} ({animal.race}), {animal.age} ans
                    <ul>
                      {animal.visites && animal.visites.length > 0 ? (
                        animal.visites.map(visite => (
                          <li key={visite._id} className="d-flex justify-content-between align-items-center">
                            <div>
                              <strong>Date:</strong> {formatDate(visite.date)} <br />
                              <strong>Description:</strong> {visite.description || "Aucune description"}
                            </div>
                            {visite._id && (
                              <Link to={`/visite/modifier/${visite._id}`}>
                                <Button variant="warning" size="sm" className="ms-2">
                                  Modifier
                                </Button>
                              </Link>
                            )}
                          </li>
                        ))
                      ) : (
                        <p className="text-muted">Aucune visite enregistrée.</p>
                      )}
                    </ul>
                  </div>
                  <div>
                    <Link to={`/animal/modifier/${animal._id}`}>
                      <Button variant="warning" size="sm" className="me-2">Modifier</Button>
                    </Link>
                    <Link to={`/visite/ajouter/${animal._id}`}>
                      <Button variant="success" size="sm">Ajouter une visite</Button>
                    </Link>
                  </div>
                </ListGroup.Item>
              ))
            ) : (
              <p className="text-muted">Aucun animal enregistré.</p>
            )}
          </ListGroup>

          <Link to={`/animal/ajouter/${id}`}>
            <Button variant="success" className="mt-3">Ajouter un animal</Button>
          </Link>
        </>
      )}
    </Container>
  );
}

export default SyntheseProprietaire;
