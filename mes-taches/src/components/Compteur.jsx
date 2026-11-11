
import { useState } from 'react'

function Compteur() {
  const [compteur, setCompteur] = useState(0)

  return (
    <div className="compteur">
      <p>Valeur : {compteur}</p>

      <button onClick={() => setCompteur(compteur + 1)}>
        Incrémenter
      </button>

      <button onClick={() => setCompteur(compteur - 1)}>
        Décrémenter
      </button>

      <button onClick={() => setCompteur(0)}>
        Réinitialiser
      </button>
    </div>
  )
}

export default Compteur
