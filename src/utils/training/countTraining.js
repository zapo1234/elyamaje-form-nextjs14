// Fonction pour compter le nombre de training.
export const countTrainings = (trainings) => {
    if (!Array.isArray(trainings)) {
      return 0;
    }
    return trainings.length;
  };
  