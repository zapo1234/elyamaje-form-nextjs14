import { useState, useEffect } from 'react';
import { fetchFormations } from '../service/trainings/serviceTraining';
import { Training } from '../types/typeTraining';

// Définir les états des données
interface UseFormationsResult {
  data: Training[] | null;
  loading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  setPage: (page: number) => void;
}

export function useFormations(): UseFormationsResult {
  const [data, setData] = useState<Training[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);  // Page courante
  const itemsPerPage = 4;

  // Fonction pour récupérer les formations
  const getFormations = async () => {
    try {
      const formations = await fetchFormations();
      setData(formations);
    } catch (err: any) {
      setError('Erreur lors de la récupération des formations');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFormations(); 
  }, []);

  const totalItems = data ? data.length : 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage); 

  // Mettre à jour la page
  const setPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    setPage
  };
}
