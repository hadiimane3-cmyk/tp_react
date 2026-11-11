
import { useState, useEffect } from 'react'

import Entete from './components/Entete.jsx'
import ListeTaches from './components/ListeTaches.jsx'
import Pied from './components/Pied.jsx'
import Carte from './components/Carte.jsx'
import Compteur from './components/Compteur.jsx'
import FormulaireAjout from './components/FormulaireAjout.jsx'
import Filtres from './components/Filtres.jsx'
import Statistiques from './components/Statistiques.jsx'
import Horloge from './components/Horloge.jsx'

function App() {
  // État des tâches
  const [taches, setTaches] = useState([])

  // État du chargement et des erreurs
  const [chargement, setChargement] = useState(true)
  const [erreur, setErreur] = useState(null)

  // État du filtre
  const [filtre, setFiltre] = useState('toutes')

  // Charger les tâches depuis le fichier JSON
  useEffect(() => {
    let annule = false

    fetch('/taches.json')
      .then((reponse) => {
        if (!reponse.ok) {
          throw new Error(`Erreur HTTP ${reponse.status}`)
        }

        return reponse.json()
      })
      .then((donnees) => {
        if (!annule) {
          setTaches(donnees)
        }
      })
      .catch((err) => {
        if (!annule) {
          setErreur(err.message)
        }
      })
      .finally(() => {
        if (!annule) {
          setChargement(false)
        }
      })

    return () => {
      annule = true
    }
  }, [])

  // Modifier l'état d'une tâche
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
    setTaches(
      taches.filter((tache) => tache.id !== id)
    )
  }

  // Ajouter une tâche
  function ajouterTache(titre) {
    const nouvelleTache = {
      id: Date.now(),
      titre: titre,
      terminee: false
    }

    setTaches([...taches, nouvelleTache])
  }

  // Filtrer les tâches
  const tachesVisibles = taches.filter((tache) => {
    if (filtre === 'actives') {
      return !tache.terminee
    }

    if (filtre === 'terminees') {
      return tache.terminee
    }

    return true
  })

  // Calculer le nombre de tâches restantes
  const restantes = taches.filter(
    (tache) => !tache.terminee
  ).length

  // Modifier le titre de l'onglet
  useEffect(() => {
    document.title = `(${restantes}) Mes tâches`
  }, [restantes])

  return (
    <div className="app">

      {/* En-tête */}
      <Entete
        titre="Mes tâches"
        sousTitre="Mon premier projet React"
      />

      {/* Horloge */}
      <Carte titre="Heure actuelle">
        <Horloge />
      </Carte>

      {/* Compteur */}
      <Carte titre="Compteur">
        <Compteur />
      </Carte>

      {/* Formulaire d'ajout */}
      <Carte titre="Nouvelle tâche">
        <FormulaireAjout onAjouter={ajouterTache} />
      </Carte>

      {/* Liste des tâches */}
      <Carte titre="Ma liste">

        <Filtres
          filtre={filtre}
          onChanger={setFiltre}
        />

        {chargement && (
          <p className="vide">
            Chargement des tâches…
          </p>
        )}

        {erreur && (
          <p className="erreur">
            {erreur}
          </p>
        )}

        {!chargement && !erreur && (
          <ListeTaches
            taches={tachesVisibles}
            onBasculer={basculerTache}
            onSupprimer={supprimerTache}
          />
        )}

      </Carte>

      {/* Statistiques */}
      <Carte titre="Statistiques">
        <Statistiques taches={taches} />
      </Carte>

      {/* Pied de page */}
      <Pied auteur="HADI Imane" />

    </div>
  )
}

export default App
