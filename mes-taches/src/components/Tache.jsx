
function Tache({ titre, terminee }) {
  return (
    <li className={terminee ? "tache terminee" : "tache"}>
      {terminee ? "✅" : "⬜"}{" "}
      <span className="titre">{titre}</span>
    </li>
  )
}

export default Tache
