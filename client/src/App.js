import './App.css';
import Leaderboard from './Components/Leaderboard';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">
      <h2>Number guessing game!</h2>
      <Game />
      <br/>
      <br/>
      <Leaderboard />
    </div>
  );
}

export default App;
