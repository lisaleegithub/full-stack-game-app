import { useState, useEffect } from "react";
import Form from "./Form";

function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5001/api/game")
      .then((response) => response.json())
      .then(players => {
        setPlayers(players);
      })
  }, []);

  const addPlayer = (newPlayer) => {
    //console.log(newPlayer);
    //postPlayer(newPlayer);
    setPlayers((players) => [...players, newPlayer]);
  }

  return (
    <div className="players">
      <p>Enter your name here</p>
      <Form addPlayer={addPlayer} />

      <h3>Leaderboard</h3>
      <ul> lower score is better
        {players.map(player =>
          <li key={player.id}> {player.name} {player.score}</li>)}
      </ul>

    </div>
  );
}

export default Leaderboard;