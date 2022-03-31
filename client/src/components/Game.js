import { useState } from "react";

// generate a randomNumber
let randomNumber = Math.round(Math.random() * 100) + 1;
console.log(randomNumber);

const Game = (props) => {
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [guessList, setGuessList] = useState([]);
    const [player, setPlayer] = useState({
        name: "",
    });
    const [finalscore, setFinalscore] = useState(0);

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const name = event.target.value;
        setPlayer((player) => ({ ...player, name }));
    }

    //A function to handle the post request
    const postPlayer = (newPlayer) => {
        console.log("new player" + JSON.stringify(newPlayer));
        return fetch('http://localhost:5001/api/game', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newPlayer)
        }).then((response) => {
            return response.json()
        }).then((data) => {
            console.log("From the post ", data);
            
            props.addPlayer(data);
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        postPlayer({"name":player.name, "score":finalscore});
    };

    const Playgame = () => {
        const userGuess = guess;
        if (Number(userGuess) === Number(randomNumber)) {
            setMessage(<p>Yay you guessed it right!! :D</p>);
            setGuessCount(guessCount + 1);
            setFinalscore(guessCount + 1);
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
            <form>
                <label>Player Name</label>
                <input
                    type="text"
                    id="add-player-name"
                    placeholder="Enter your name"
                    required
                    value={player.name}
                    onChange={handleNameChange}
                />
                <button type="submit">Add</button>
                {/* <br/>
                <label>Take a guess</label>
                <input value={guess} type="number" onChange={e => setGuess(e.target.value)} placeholder="Enter your guess" />
                <button type="submit" onClick={Playgame}>Submit Guess</button> */}
            </form>
            <form onSubmit={handleSubmit}>
                <label>Take a guess</label>
                <input value={guess} type="number" onChange={e => setGuess(e.target.value)} placeholder="Enter your guess" />
                <button type="submit" onClick={Playgame}>Submit Guess</button>
            </form>
            {/* <p>I am thinking of a number between 1 and 100..</p>
            <p>Take a guess!</p> */}
            
            
            <p>{message}</p>
            <p>number of guesses: {guessCount}</p>
            <p>your guesses: {guessList.join(', ')}</p>
        </div>
    )
}
export default Game;


