import { useState } from "react";

// generate a randomNumber
let randomNumber = Math.round(Math.random() * 100) + 1;
console.log("this is the answer", randomNumber);

const Game = () => {
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [guessList, setGuessList] = useState([]);
    const [player, setPlayer] = useState({
        name: "",
    });
    const [playerId, setPlayerId] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");

    // create function that handles name change
    const handleNameChange = (event) => {
        const name = event.target.value;
        setPlayer((player) => ({ ...player, name }));
    }

    // function to handle the put request
    const updateScore = (scoreUpdate) => {
        return fetch(`http://localhost:5001/api/game/${playerId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(scoreUpdate)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("From the post ", data);
        }).catch((error) => {
            console.error('Error:', error);
            // setErrorMsg("This is an error message.")
            // setMessage(`⚠️Player name ${player.name} is already on the leaderboard. Please use a different name!`)
        });
    }

    // handles add player button
    const handleAddPlayer = (e) => {
        e.preventDefault();
        addPlayer();
    }

    // add new player
    const addPlayer = () => {
        const newPlayer = { name: player.name };
        fetch("http://localhost:5001/api/game", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newPlayer),
        })
            .then(response => response.json())
            .then(data => {
                // console.log('Success:', data);
                // if success, do the following
                 setPlayerId(data.id)
                 setMessage("Player added. Start Guessing!");
                 setErrorMsg("");
                // console.log("print playerid", data.id);
            }).catch((error) => {
                console.error('Error:', error);
                setErrorMsg("This is an error message.")
            });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("this is playerId", playerId);
        setPlayer(player);
        updateScore({ "score": guessCount + 1 });
        playGame();
    };

    // function formatScore (score) {
    //     let maxScore = 1000;
    //     if (score === 0) {
    //         return "no score";
    //     }
    //     if (score === 1) {
    //       return maxScore;
    //     } else {
    //     return maxScore - (score * 10);
    //     }
    //   }

    const playGame = () => {
        const userGuess = guess;
        if (Number(userGuess) === Number(randomNumber)) {
            setMessage(<p>Yay you guessed it right!! :D</p>);
            setGuessCount(guessCount + 1);
        } else if (userGuess === "") {
            setMessage(<p>Input invalid :( Try again!!</p>);
        } else if (userGuess < 0 || userGuess > 100) {
            setMessage(<p>Guess a number between 1 and 100!</p>);
        } else if (userGuess > randomNumber) {
            setMessage(<p>Answer is lower than {userGuess}</p>);
            setGuessCount(guessCount + 1)
            setGuessList([...guessList, userGuess])
        } else if (userGuess < randomNumber && userGuess !== "") {
            setMessage(<p>Answer is higher than {userGuess}</p>);
            setGuessCount(guessCount + 1)
            setGuessList([...guessList, userGuess])
        }
    }

    return (
        <div>
            <form onSubmit={handleAddPlayer}>
                <h2>Add Player and Start Guessing</h2>
                <label>Name</label>
                <input
                    type="text"
                    id="add-player-name"
                    required
                    placeholder="Enter player name"
                    value={player.name}
                    onChange={handleNameChange}
                />
                <button>Add Player</button>
            </form>

            <form onSubmit={handleSubmit}>
                <br />
                <label>Your Guess</label>
                <input value={guess} type="number" required onChange={e => setGuess(e.target.value)} placeholder="Enter your guess" />
                {/* <button type="submit" onClick={playGame}>Submit Guess</button> */}
                <button type="submit">Submit Guess</button>
            </form>
            <br />

            <div className="summary">
                <p>Player ID: {playerId}</p>
                <p>{errorMsg}</p>
                <p>{message}</p>
                <p>number of guesses: {guessCount}</p>
                <p>your guesses: {guessList.join(', ')}</p>
            </div>
        </div>
    )
}
export default Game;
