import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function AjouterVisite() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [visite, setVisite] = useState({
    date: '',
    description: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  console.log("🔍 ID de l'animal envoyé :", animalId);

  const handleChange = (e) => {
    setVisite({ ...visite, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!visite.date || !visite.description) {
      setError("Tous les champs sont requis. Vérifiez et réessayez.");
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/visites', {
        date: visite.date,
        description: visite.description,
        animal: animalId
      });

      setSuccess("Visite ajoutée avec succès !");
      setTimeout(() => navigate(`/synthese/${animalId}`), 2000);
    } catch (error) {
      console.error(" Erreur Axios :", error.response?.data || error.message);
      setError(error.response?.data?.error || "Une erreur est survenue. Vérifiez les champs et réessayez.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter une visite médicale</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Date de la visite</Form.Label>
          <Form.Control type="text" name="date" placeholder="YYYY-MM-DD" value={visite.date} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" name="description" value={visite.description} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-3">Ajouter la visite</Button>
      </Form>
    </Container>
  );
}

export default AjouterVisite;
