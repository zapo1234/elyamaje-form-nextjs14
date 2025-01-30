/**
 * URL de l'API pour récupérer les données des utilisateurs.
 * @constant {string}
 */
const API_URL = 'https://dev.e-learning.elyamaje.com/trainings';

/**
 * Récupère la liste de tous les trainings de puis staging
 */
export const getAlltraining = () => {
  // On commence par récupérer le token
  const token = localStorage.getItem('token');
  if (!token) {
    return Promise.reject(new Error('Token manquant ou expiré. Veuillez vous reconnecter.'));
  }

  // Utilisation de fetch pour appeler l'API
  return fetch(`${API_URL}/getAllTrainings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(response => {
      if (!response.ok) {
        // Si la réponse n'est pas OK, on rejette avec une erreur
        return Promise.reject(new Error('Erreur lors de la récupération des formations.'));
      }
      return response.json(); // On retourne la promesse avec les données JSON si la réponse est OK
    })
    .then(data => {
      return data; // On renvoie les données une fois traitées
    })
    .catch(error => {
      // Capture des erreurs, loggée ici pour débogage
      console.error('Erreur API:', error);
      return Promise.reject(error); // On relance l'erreur pour la propager
    });
};
