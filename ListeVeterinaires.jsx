import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table } from 'react-bootstrap';

function ListeVeterinaires() {
  const [veterinaires, setVeterinaires] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/veterinaires')
      .then(res => setVeterinaires(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <Container className="mt-5">
      <h2>Liste des vétérinaires</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom</th>
            <th>Spécialité</th>
          </tr>
        </thead>
        <tbody>
          {veterinaires.map(vet => (
            <tr key={vet._id}>
              <td>{vet.nom}</td>
              <td>{vet.specialite}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}

export default ListeVeterinaires;
