import './App.css';
import Leaderboard from './Components/Leaderboard';
import Game from './Components/Game';

function App() {
  return (
    <div className="App">
      <Game />
      <br/>
      <br/>
      <Leaderboard />
    </div>
  );
}

export default App;
