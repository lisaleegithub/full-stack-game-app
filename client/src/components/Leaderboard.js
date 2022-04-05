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


  // // 100 * 10 = max score = 1000
  // // guess count is score so less guess count means higher score
  // // if guessed right away, 1000
  // // each guess is -10 pts
  // function formatScore (score) {
  //   let maxScore = 1000;
  //   if (score === 1) {
  //     return maxScore;
  //   } else {
  //   return maxScore - (score * 10);
  //   }
  // }

  return (
    <div className="players">
      <h2>Leaderboard</h2>
      <table>
        <tr>
          <th>Rank</th>
          <th>Name</th>
          <th>Score</th>
        </tr> 
        {players.map((player, i) => (
          <tr key={player.id}> 
          <td>{i+1}</td>
          <td>{player.name}</td>
          <td>{player.score}</td>
          </tr>
          ))}
      </table>
    </div>
  );
}

export default Leaderboard;