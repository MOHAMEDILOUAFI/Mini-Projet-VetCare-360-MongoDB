import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

function NouveauProprietaire() {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    adresse: '',
    telephone: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('http://localhost:5000/api/proprietaires', formData);
    navigate(`/proprietaire/modifier/${res.data._id}`);
  };

  return (
    <Container className="mt-5">
      <h2>Ajouter un nouveau propriétaire</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Nom</Form.Label>
          <Form.Control type="text" name="nom" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Prénom</Form.Label>
          <Form.Control type="text" name="prenom" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Adresse</Form.Label>
          <Form.Control type="text" name="adresse" onChange={handleChange} required />
        </Form.Group>
        <Form.Group>
          <Form.Label>Téléphone</Form.Label>
          <Form.Control type="text" name="telephone" onChange={handleChange} required />
        </Form.Group>
        <Button type="submit" variant="success" className="mt-3">Enregistrer</Button>
      </Form>
    </Container>
  );
}

export default NouveauProprietaire;
