import { useState } from "react";

// generate a randomNumber
let randomNumber = Math.round(Math.random() * 100) + 1;
console.log(randomNumber);

const Game = () => {
    const [guess, setGuess] = useState("");
    const [message, setMessage] = useState("");
    const [guessCount, setGuessCount] = useState(0);
    const [guessList, setGuessList] = useState([]);

    const Submit = () => {
        const userGuess = guess;
        if (Number(userGuess) === Number(randomNumber)) {
            setMessage(<p>Yay you guessed it right!! :D</p>);
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
            <p>I am thinking of a number between 1 and 100..</p>
            <p>Take a guess!</p>
            <input value={guess} type="number" onChange={e => setGuess(e.target.value)} placeholder="Enter your guess" />
            <button type="submit" onClick={Submit}>
                Submit Guess
            </button>
            <p>{message}</p>
            <p>number of guesses: {guessCount}</p>
            <p>your guesses: {guessList.join(', ')}</p>
        </div>
    )
}
export default Game;


