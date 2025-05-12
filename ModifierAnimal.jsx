import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ModifierAnimal() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({
    nom: '',
    espece: '',
    race: '',
    age: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
  console.log("🔍 ID envoyé :", id);
  axios.get(`http://localhost:5000/api/animaux/${id}`)
    .then(res => setAnimal(res.data))
    .catch(err => {
      console.error(" Erreur Axios :", err.response?.data || err.message);
      setError("Animal non trouvé !");
    });
}, [id]);

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!animal.nom || !animal.espece || !animal.race || !animal.age) {
      setError("Tous les champs sont requis. Vérifiez et réessayez.");
      return;
    }

    try {
      await axios.put(`http://localhost:5000/api/animaux/${id}`, animal);
      setSuccess(" Animal mis à jour avec succès !");
      setTimeout(() => navigate(`/synthese/${animal.proprietaire}`), 2000);
    } catch (error) {
      console.error(" Erreur Axios :", error.response?.data || error.message);
      setError("Une erreur est survenue. Vérifiez les champs et réessayez.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Modifier les informations de l'animal</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" name="nom" value={animal.nom} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Espèce</Form.Label>
          <Form.Control type="text" name="espece" value={animal.espece} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Race</Form.Label>
          <Form.Control type="text" name="race" value={animal.race} onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Âge</Form.Label>
          <Form.Control type="number" name="age" value={animal.age} onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">Enregistrer les modifications</Button>
      </Form>
    </Container>
  );
}

export default ModifierAnimal;
