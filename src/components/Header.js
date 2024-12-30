'use client';
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import '../styles/Header.css';
import useSearchTrainings from '../hooks/searchTraining'; // Import du hook personnalisé
import { getAlltraining } from '../service/trainings/trainingService'; // Import du service API
import { countTrainings } from '../utils/training/countTraining';

const Header = () => {
  // Utilisation du hook personnalisé pour la recherche des formations
  const { filteredFormations, searchQuery, handleSearch } =useSearchTrainings();
   const [formations, setFormations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadFormations = async () => {
          try {
            const response = await getAlltraining(); // Appel au service API
            setFormations(response.data); // Stockage des données dans l'état
          } catch (err) {
          
          } finally {
            setLoading(false);
          }
        };
    
        loadFormations(); // Appel de la fonction pour charger les formations
      }, []);
    
     // recupérer le nombre de formation
     const numbertraining = countTrainings(formations);

  // Fonction pour gérer l'événement keyup dans la barre de recherche
  const handleKeyUp = (e) => {
    handleSearch(e.target.value); // Appeler la fonction de recherche à chaque frappe
  };

  return (
    <header className="header">
      <div className="logo">
        <img src="/assets/logo_elyamaje.png" alt="Logo" className="header-logo" width="150" height="100" />
      </div>
      <nav className="navigation">
        <ul>
          <li><a href="#decouvrir">Découvrir</a></li>
          <li><a href="/formations">Formations { numbertraining } </a></li>
          <li><a href="#formations">Onglerie</a></li>
        </ul>
      </nav>
      <div className="search-container">
        <input
          type="text"
          placeholder="Rechercher une formation..."
          className="search-input"
          value={searchQuery} // Assurez-vous que la valeur est contrôlée
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="actions">
        <button className="btns" id="connecter">Se connecter</button>
        <button className="btn" id="inscrire">S'inscrire</button>
        <FontAwesomeIcon icon={faShoppingCart} className="cart-icon" />
      </div>

      {/* Affichage des résultats de la recherche uniquement si la recherche n'est pas vide */}
      {searchQuery && (
        <div className="search-results">
          {filteredFormations.length > 0 ? (
            <ul>
              {filteredFormations.map((formation, index) => (
                <li key={index}>{formation.title}</li>
              ))}
            </ul>
          ) : (
            <p>Aucune formation trouvée.</p>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
