import { useState, useEffect } from 'react';
import { fetchFormations } from '../service/trainings/serviceTraining';  // Assurez-vous du bon chemin
import { Training } from '../types/typeTraining';


// Définir les états possibles pour la récupération des formations
interface UseFormationsResult {
  data: Training[] | null;
  loading: boolean;
  error: string | null;
}

export function useFormations(): UseFormationsResult {
  const [data, setData] = useState<Training[] | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);  
  const [error, setError] = useState<string | null>(null);  

  useEffect(() => {
    // Fonction pour appeler le service et récupérer les formations
    const getFormations = async () => {
      try {
        const formations = await fetchFormations();  // Appeler la fonction pour récupérer les formations
        setData(formations);  
      } catch (err: any) {
        setError('Erreur lors de la récupération des formations');  // Gérer l'erreur
      } finally {
        setLoading(false);  // Le chargement est terminé
      }
    };

    getFormations(); 
  }, []); 

  return { data, loading, error };
}
