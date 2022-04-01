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


  // 100 * 10 = max score = 1000
  // guess count is score so less guess count means higher score
  // if guessed right away, 1000
  // each guess is -10 pts
  function formatScore (score) {
    let maxScore = 1000;
    if (score === 1) {
      return maxScore;
    } else {
    return maxScore - (score * 10);
    }
  }

  return (
    <div className="players">
      <h3>Leaderboard</h3>
      <ul> 
        {players.map((player, i) =>
          <li key={player.id}> Rank {i+1} {" "} {player.name} {formatScore(player.score)}</li>)}
      </ul>
    </div>
  );
}

export default Leaderboard;