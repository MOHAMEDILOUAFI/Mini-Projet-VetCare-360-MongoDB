import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Accueil from './pages/Accueil';
import ListeVeterinaires from './pages/ListeVeterinaires';
import RechercheProprietaire from './pages/RechercheProprietaire';
import NouveauProprietaire from './pages/NouveauProprietaire';
import ModifierProprietaire from './pages/ModifierProprietaire';
import AjouterAnimal from './pages/AjouterAnimal';
import ModifierAnimal from './pages/ModifierAnimal';
import AjouterVisite from './pages/AjouterVisite';
import ModifierVisite from './pages/ModifierVisite';
import SyntheseProprietaire from './pages/SyntheseProprietaire';
import ResultatsRecherche from './pages/ResultatsRecherche';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/veterinaires" element={<ListeVeterinaires />} />
        <Route path="/recherche" element={<RechercheProprietaire />} />
        <Route path="/proprietaire/ajouter" element={<NouveauProprietaire />} />
        <Route path="/proprietaire/modifier/:id" element={<ModifierProprietaire />} />
        <Route path="/animal/ajouter/:proprietaireId" element={<AjouterAnimal />} />
        <Route path="/animal/modifier/:id" element={<ModifierAnimal />} />
        <Route path="/visite/ajouter/:animalId" element={<AjouterVisite />} />
        <Route path="/visite/modifier/:id" element={<ModifierVisite />} />
        <Route path="/synthese/:id" element={<SyntheseProprietaire />} />
        <Route path="/resultats/:nom" element={<ResultatsRecherche />} />
      </Routes>
    </Router>
  );
}

export default App;
