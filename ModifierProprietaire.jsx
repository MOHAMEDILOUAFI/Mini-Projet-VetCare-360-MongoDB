import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ModifierProprietaire() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [proprietaire, setProprietaire] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/proprietaires/${id}`)
      .then(res => setProprietaire(res.data))
      .catch(err => {
        console.error(" Erreur Axios :", err.response?.data || err.message);
        setError("Propriétaire non trouvé !");
      });
  }, [id]);

  const handleChange = (e) => {
    setProprietaire({ ...proprietaire, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

  
    if (!proprietaire.nom || !proprietaire.prenom || !proprietaire.adresse || !proprietaire.telephone) {
      setError("Tous les champs sont requis. Vérifiez et réessayez.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/proprietaires/${id}`, proprietaire);
      setSuccess(" Informations mises à jour avec succès !");
    } catch (error) {
      console.error(" Erreur Axios :", error.response?.data || error.message);
      setError("Une erreur est survenue. Vérifiez les champs et réessayez.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Modifier les informations du propriétaire</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" name="nom" value={proprietaire.nom} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prénom</Form.Label>
          <Form.Control type="text" name="prenom" value={proprietaire.prenom} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" name="adresse" value={proprietaire.adresse} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Téléphone</Form.Label>
          <Form.Control type="text" name="telephone" value={proprietaire.telephone} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Enregistrer les modifications</Button>
      </Form>
    </Container>
  );
}

export default ModifierProprietaire;
