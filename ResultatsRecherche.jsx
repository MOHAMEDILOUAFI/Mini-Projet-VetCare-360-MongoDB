import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Container, Card } from 'react-bootstrap';

function ResultatsRecherche() {
  const { nom } = useParams();
  const [resultats, setResultats] = useState([]);
  const [error, setError] = useState('');

useEffect(() => {
  console.log("🔍 Nom recherché :", nom);
  const url = nom === "all"
    ? "http://localhost:5000/api/proprietaires"
    : `http://localhost:5000/api/proprietaires/search?nom=${nom}`;

  axios.get(url)
    .then(res => setResultats(res.data))
    .catch(err => {
      console.error(" Erreur Axios :", err.response?.data || err.message);
      setError("Aucun propriétaire trouvé !");
    });
}, [nom]);


  return (
    <Container className="mt-5">
      <h2>Résultats de recherche pour : {nom}</h2>
      {error && <p className="text-danger">{error}</p>}
      {resultats.map(p => (
        <Card key={p._id} className="mb-3">
          <Card.Body>
            <Card.Title>{p.prenom} {p.nom}</Card.Title>
            <Card.Text>
              Adresse : {p.adresse}<br />
              Téléphone : {p.telephone}
            </Card.Text>
            <Link to={`/proprietaire/modifier/${p._id}`} className="btn btn-primary me-2">Modifier</Link>
            <Link to={`/synthese/${p._id}`} className="btn btn-info">Voir Synthèse</Link>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default ResultatsRecherche;
