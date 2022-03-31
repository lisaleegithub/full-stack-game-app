import { useState, useEffect } from "react";
// import Form from "./Form";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/game")
      .then((response) => response.json())
      .then(players => {
        setPlayers(players);
      })
  }, []);

  return (
    <div className="players">
      <h3>Leaderboard</h3>
      <ul> lower score is better
        {players.map((player, i) =>
          <li key={player.id}> {i+1} {" "} {player.name} {player.score}</li>)}
      </ul>
    </div>
  );
}

export default Leaderboard;