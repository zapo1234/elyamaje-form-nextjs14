// app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import '../styles/Home.css'; 
import { getAlltraining } from '../service/trainings/trainingService'; // Import du service API
import { countTrainings } from '../utils/training/countTraining';

const HomePage = () => {
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
  return (
    <div>
      <Header />
      <main>
       

        <div className="content-container">
          {/* Bloc de gauche avec l'image */}

          
          <div className="image-container">

          <h2>Découvrez la plateforme Elyacademy</h2>
            <img 
              src="https://frontends.udemycdn.com/components/auth/desktop-illustration-step-1-x1.webp"  // Remplace l'URL par l'image que tu souhaites afficher
              alt="Apprentissage"
              className="image"
            />
          </div>

          {/* Bloc de droite avec le titre et le formulaire */}
          <div className="form-container">
            
            
            <form className="subscription-form">
            <h3>Souscrire et bénéficiez des formations de nos Ambassadrices </h3>
              <div className="form-group">
                <label htmlFor="nom">Nom</label>
                <input type="text" id="nom" name="nom" required />
              </div>
              <div className="form-group">
                <label htmlFor="prenom">Prénom</label>
                <input type="text" id="prenom" name="prenom" required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
              </div>
              <div className="form-group">
                <label htmlFor="telephone">Téléphone</label>
                <input type="tel" id="telephone" name="telephone" required />
              </div>
              
              {/* Checkbox pour accepter de recevoir des informations */}
              <div className="checkbox-group">
                <label>
                  <input type="checkbox" id="receive-info" name="receive-info" />
                  Je souhaite recevoir toutes les informations par email du programme
                </label>
              </div>

              {/* Bouton s'inscrire */}
              <button type="submit" className="submit-btn">S'inscrire</button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default HomePage;

