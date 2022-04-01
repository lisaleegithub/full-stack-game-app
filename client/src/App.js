import './App.css';
import Leaderboard from './Components/Leaderboard';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">
      <h1>Number guessing game!</h1>
      <Game />
      <br/>
      <Leaderboard />
    </div>
  );
}

export default App;
