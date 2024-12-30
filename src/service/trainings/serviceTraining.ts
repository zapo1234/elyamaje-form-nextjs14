
/**
 * URL de l'API pour récupérer les données des utilisateurs.
 * @constant {string}
 */
const API_URL = 'https://dev.e-learning.elyamaje.com/trainings';

import { Training } from '../../types/typeTraining';  // Importation via le fichier index.ts.

export async function fetchFormations(): Promise<Training[]> {
  const response = await fetch(`${API_URL}/getAllTrainings`);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des formations');
  }

  const data = await response.json();
  const responses = data.data;  
  return responses as Training[];  // Retourner les données typées en Training[]
}
