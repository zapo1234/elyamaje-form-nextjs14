'use client';

import { useState } from 'react';
import { MdArrowForward } from 'react-icons/md';
import Header from '../../components/Header'; 
import '../../styles/Formation.css';
import '../../styles/Header.css'; 
import { useFormations } from '../../hooks/getAllTraining'; 


// Composant Stars pour afficher les étoiles
const Stars = ({ rating }: { rating: number }) => {
  const totalStars = 5;
  const filledStars = Math.floor(rating); 
  const emptyStars = totalStars - filledStars; 

  return (
    <div className="stars">
      {Array(filledStars).fill(<span className="star filled">★</span>)}
      {Array(emptyStars).fill(<span className="star empty">★</span>)}
    </div>
  );
};

const FormationPage = () => {

  const { data, loading, error } = useFormations();

  
  return (
    <div className="container">
      {/* Ajout du Header en haut de la page */}
      <Header />

      <div className="left-column">
        <h3>Sélectionner les formations</h3>
        <ul>
          {data && data.map((formation) => (
            <li>
              {formation.title}
            </li>
          ))}
        </ul>
      </div>

      <div className="right-column">
        <h3>Dévouvrer quelques formations</h3>
        <div className="grid">
          {data && data.map((formation) => (
            <div className="formation-block">
              <img src={formation.image} alt={formation.title} className="formation-image" />
              <h4>{formation.title}</h4>
              <h5>{formation.description.slice(0, 50)}...</h5>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FormationPage;
