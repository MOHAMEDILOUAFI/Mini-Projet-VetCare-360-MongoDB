import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button, Alert } from 'react-bootstrap';

function ModifierVisite() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [visite, setVisite] = useState({ date: '', description: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/visites/${id}`)
      .then(res => {
        const fetchedVisite = res.data;
        
        if (fetchedVisite && fetchedVisite.date) {
          fetchedVisite.date = new Date(fetchedVisite.date).toISOString().substr(0, 10);
        }
        setVisite(fetchedVisite);
      })
      .catch(err => {
        console.error("Erreur lors de la récupération de la visite:", err.response?.data || err.message);
        setError(err.response?.data.error || "Erreur lors de la récupération de la visite");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await axios.put(`http://localhost:5000/api/visites/${id}`, {
        date: visite.date,
        description: visite.description
      });
      setSuccess("Visite mise à jour avec succès");
      setTimeout(() => navigate(-1), 2000);
    } catch (err) {
      console.error(" Erreur lors de la mise à jour:", err.response?.data || err.message);
      setError(err.response?.data.error || "Erreur lors de la mise à jour de la visite");
    }
  };

  return (
    <Container className="mt-5">
      <h2>Modifier la visite</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Date (YYYY-MM-DD)</Form.Label>
          <Form.Control
            type="text"
            value={visite.date}
            onChange={e => setVisite({ ...visite, date: e.target.value })}
            required
          />
        </Form.Group>
        <Form.Group className="mt-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            type="text"
            value={visite.description}
            onChange={e => setVisite({ ...visite, description: e.target.value })}
            required
          />
        </Form.Group>
        <Button type="submit" variant="primary" className="mt-3">
          Enregistrer les modifications
        </Button>
      </Form>
    </Container>
  );
}

export default ModifierVisite;
