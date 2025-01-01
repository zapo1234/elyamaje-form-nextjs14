'use client';

import { useState, useEffect } from 'react';
import Header from '../../components/Header';
import '../../styles/Formation.css';
import '../../styles/Header.css';
import { useFormations } from '../../hooks/getAllTraining'; // Assurez-vous que ce hook est bien configuré

// Composant Stars pour afficher les étoiles
const Stars = ({ sommeNote }: { sommeNote: number }) => {
  const totalStars = 5;
  const filledStars = Math.floor(sommeNote);
  const emptyStars = totalStars - filledStars;

  return (
    <div className="stars">
      {Array(filledStars).fill(<span className="star filled">★</span>)}
      {Array(emptyStars).fill(<span className="star empty">★</span>)}
    </div>
  );
};

const FormationPage = () => {
  const { data, loading, error, setPage, currentPage } = useFormations();

  const itemsPerPage = 4; // Nombre d'éléments à afficher par page
  const totalItems = data ? data.length : 0;
  const totalPagesCount = Math.ceil(totalItems / itemsPerPage); // Nombre total de pages
  
  // Sélectionner les éléments pour la page actuelle
  const currentData = data?.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  // Gestion des erreurs et du chargement
  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Fonction pour changer la page actuelle
  const handlePageClick = (page: number) => {
    setPage(page);  // Cette fonction met à jour la page dans votre state
  };

  return (
    <div className="container">
      {/* Ajout du Header en haut de la page */}
      <Header />

      <div className="left-column">
        <h3>Sélectionner les formations</h3>
        <ul>
          {currentData && currentData.map((formation) => (
            <li>{formation.title}</li>
          ))}
        </ul>
      </div>

      <div className="right-column">
        <h3>Découvrir quelques formations</h3>
        <div className="grid">
          {currentData && currentData.map((formation) => (
            <div  className="formation-block">
              <img src={formation.image} alt={formation.title} className="formation-image" />
              <h4>{formation.title}</h4>
              <h5>{formation.description ? formation.description.slice(0, 50) : 'Description non disponible'}...</h5>

              {/* Affichage de l'évaluation sous forme d'étoiles */}
              <Stars sommeNote={formation.sommeNote} />

              {/* Bouton "Voir plus" avec un lien */}
                <a href={`/formation/${formation.title}`} className="btn-voir-plus">
                   Voir plus
               </a>
            </div>
          ))}
        </div>

        {/* Pagination - Affichage des numéros de pages */}
        <div className="pagination">
          {/* Afficher les boutons numérotés */}
          {Array.from({ length: totalPagesCount }).map((_, index) => {
            const pageNum = index + 1;
            return (
              <button
                key={pageNum}
                onClick={() => handlePageClick(pageNum)}
                className={pageNum === currentPage ? 'active' : ''}
              >
                {pageNum}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormationPage;
