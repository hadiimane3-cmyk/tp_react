
import Tache from './Tache.jsx'

function ListeTaches({ taches }) {
  return (
    <ul className="liste-taches">
      {taches.length === 0 ? (
        <p className="vide">Aucune tâche à afficher.</p>
      ) : (
        taches.map((tache) => (
          <Tache
            key={tache.id}
            titre={tache.titre}
            terminee={tache.terminee}
          />
        ))
      )}
    </ul>
  )
}

export default ListeTaches
