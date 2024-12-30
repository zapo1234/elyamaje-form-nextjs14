import { useState, useEffect } from 'react';
import { getAlltraining } from '../service/trainings/trainingService'; 

// Hook personnalisé pour la recherche de formations
const useSearchTrainings = () => {
  const [formations, setFormations] = useState([]);
  const [filteredFormations, setFilteredFormations] = useState([]); 
  const [searchQuery, setSearchQuery] = useState(''); // État pour la recherche
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null); 

  // Charger les formations depuis l'API
  useEffect(() => {
    const loadFormations = async () => {
      try {
        const response = await getAlltraining(); // Appel API pour récupérer les formations
        setFormations(response.data); 
      } catch (err) {
        setError('Erreur lors du chargement des formations');
      } finally {
        setLoading(false);
      }
    };

    loadFormations(); 
  }, []);

  // Fonction pour filtrer les formations par titre (commence par la recherche)
  const handleSearch = (query) => {
    setSearchQuery(query); 

    if (query.length >= 3) {
      // Filtrer les formations par titre qui commence par la recherche
      const filtered = formations.filter((formation) =>
        formation.title.toLowerCase().startsWith(query.toLowerCase())
      );
      setFilteredFormations(filtered); // Mettez à jour les formations filtrées
    } else {
      setFilteredFormations([]); 
    }
  };

  return {
    formations,
    filteredFormations,
    searchQuery,
    handleSearch,
    loading,
    error,
  };
};

export default useSearchTrainings;
