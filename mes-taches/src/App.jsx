
import { useState } from 'react'
import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'

// Liste initiale des tâches
const TACHES_INITIALES = [
  { id: 1, titre: 'Installer Node.js et Vite', terminee: true },
  { id: 2, titre: 'Comprendre les composants', terminee: true },
  { id: 3, titre: 'Passer des données avec les props', terminee: false },
  { id: 4, titre: "Gérer l'état avec useState", terminee: false },
]

function App() {
  const [taches, setTaches] = useState(TACHES_INITIALES)

  // Modifier l'état d'une tâche
  function basculerTache(id) {
    setTaches(taches.map(tache =>
      tache.id === id
        ? { ...tache, terminee: !tache.terminee }
        : tache
    ))
  }

  // Supprimer une tâche
  function supprimerTache(id) {
    setTaches(taches.filter(tache => tache.id !== id))
  }

  return (
    <div className="app">
      <Entete
        titre="Mes tâches"
        sousTitre="Organisez votre travail simplement"
      />

      <main>
        <Carte titre="Mon compteur">
          <Compteur />
        </Carte>

        <Carte titre="Ma liste de tâches">
          <ListeTaches
            taches={taches}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        </Carte>
      </main>

      <Pied auteur="Imane HADI" />
    </div>
  )
}

export default App
