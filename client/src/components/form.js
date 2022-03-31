import { useState } from "react";

const Form = (props) => {
    const [player, setPlayer] = useState({
        name: "",
    });

    //create functions that handle the event of the user typing into the form
    const handleNameChange = (event) => {
        const name = event.target.value;
        setPlayer((player) => ({ ...player, name }));
    }

    //A function to handle the post request
    const postPlayer = (newPlayer) => {
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
        postPlayer(player);
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
                type="text"
                id="add-player-name"
                placeholder="Enter your name"
                required
                value={player.name}
                onChange={handleNameChange}
            />
            <button type="submit">Add</button>
        </form>
    );
};

export default Form;