
import { useEffect, useState } from 'react'

import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'

function App() {
  const [taches, setTaches] = useState([])
  const [filtre, setFiltre] = useState('toutes')
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState('')

  // Charger les tâches depuis le fichier JSON
  useEffect(() => {
    async function chargerTaches() {
      try {
        const reponse = await fetch('/taches.json')

        if (!reponse.ok) {
          throw new Error('Impossible de charger les tâches.')
        }

        const donnees = await reponse.json()
        setTaches(donnees)
      } catch (error) {
        setErreur(error.message)
      } finally {
        setChargement(false)
      }
    }

    chargerTaches()
  }, [])

  // Mettre à jour le titre de l'onglet
  useEffect(() => {
    document.title = `Mes tâches (${taches.length})`
  }, [taches])

  // Ajouter une tâche
  function ajouterTache(titre) {
    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      terminee: false,
    }

    setTaches([...taches, nouvelleTache])
  }

  // Changer l'état d'une tâche
  function basculerTache(id) {
    setTaches(
      taches.map((tache) =>
        tache.id === id
          ? { ...tache, terminee: !tache.terminee }
          : tache
      )
    )
  }

  // Supprimer une tâche
  function supprimerTache(id) {
    setTaches(taches.filter((tache) => tache.id !== id))
  }

  // Supprimer toutes les tâches terminées (BONUS)
  function supprimerTachesTerminees() {
    setTaches(taches.filter((tache) => !tache.terminee))
  }

  // Filtrer les tâches
  const tachesFiltrees = taches.filter((tache) => {
    if (filtre === 'actives') {
      return !tache.terminee
    }

    if (filtre === 'terminees') {
      return tache.terminee
    }

    return true
  })

  // Affichage pendant le chargement
  if (chargement) {
    return <p>Chargement des tâches...</p>
  }

  // Affichage en cas d'erreur
  if (erreur) {
    return <p>Erreur : {erreur}</p>
  }

  return (
    <div className="app">
      <Entete />

      <section className="carte">
        <h2>Ma liste</h2>

        <FormulaireAjout ajouterTache={ajouterTache} />

        <Filtres filtre={filtre} setFiltre={setFiltre} />

        <button
          className="danger"
          onClick={supprimerTachesTerminees}
          disabled={!taches.some((tache) => tache.terminee)}
        >
          Supprimer les tâches terminées
        </button>

        <ListeTaches
          taches={tachesFiltrees}
          basculerTache={basculerTache}
          supprimerTache={supprimerTache}
        />

        <Statistiques taches={taches} />
      </section>

      <Pied />
    </div>
  )
}

export default App
