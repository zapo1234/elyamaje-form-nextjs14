// app/formation/[id]/page.tsx

'use client';

import { useParams } from 'next/navigation'; // Pour accéder au paramètre dynamique `id`
import { useEffect } from 'react';

const FormationPage = () => {
  const { id } = useParams<{ id: string }>(); // Récupère l'ID de la route dynamique


  return (
    <div>
      <h1>Page de la formation</h1>
      <p>ID de la formation : {id}</p>
    </div>
  );
};

export default FormationPage;
