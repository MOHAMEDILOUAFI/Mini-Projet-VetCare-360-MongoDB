import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function AjouterAnimal() {
  const { proprietaireId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    nom: '',
    espece: '',
    age: '',
    race: '',
    proprietaire: proprietaireId
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/animaux', formData);
      navigate(`/synthese/${proprietaireId}`);
    } catch (error) {
      console.error(" Erreur lors de l'ajout:", error);
      alert("Une erreur est survenue. Vérifiez les champs et réessayez.");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter un animal</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" name="nom" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Espèce</Form.Label>
          <Form.Control type="text" name="espece" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Âge</Form.Label>
          <Form.Control type="number" name="age" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Race</Form.Label>
          <Form.Control type="text" name="race" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-3">Ajouter l'animal</Button>
      </Form>
    </Container>
  );
}

export default AjouterAnimal;
