/**
 * URL de l'API pour récupérer les données des utilisateurs.
 * @constant {string}
 */
const API_URL = 'https://dev.e-learning.elyamaje.com/trainings';

import { Training } from '../../types/typeTraining';  // Importation via le fichier index.ts.

/**
 * Récupère les formations avec pagination.
 * @param page - Le numéro de la page à récupérer (par défaut 1).
 * @param limit - Le nombre d'éléments par page (par défaut 11).
 * @returns Les formations correspondant à la page demandée.
 */
export async function fetchFormations(page: number = 1, limit: number = 19): Promise<Training[]> {
  // Construction de l'URL avec les paramètres de pagination
  const url = `${API_URL}/getAllTrainings?page=${page}&limit=${limit}`;

  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error('Erreur lors de la récupération des formations');
  }

  const data = await response.json();
  const responses = data.data;  
  
  // Renvoyer les formations selon la pagination (limitées à `limit`)
  return responses.slice(0, 19) as Training[];
}
