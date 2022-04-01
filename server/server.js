const express = require('express');
const cors = require('cors');
require('dotenv').config()
const db = require('../server/db/db-connection.js'); 

const app = express();

const PORT = 5001;
app.use(cors());
app.use(express.json());

// creates an endpoint for the route
app.get('/', (req, res) => {
    res.json({ message: 'Hello from My ExpressJS' });
});

// GET request
app.get('/api/game', cors(), async (req, res) => {
    try{
        const { rows: players } = await db.query('SELECT * FROM players ORDER BY score ASC');
        res.send(players);
    } catch (e){
        return res.status(400).json({e});
    }
});

// GET request using id
app.get('/api/game/:id', cors(), async (req, res) => {
    const playerId = req.params.id;
    try{
        const { rows: players } = await db.query(`SELECT * FROM players WHERE id=${playerId} ORDER BY score ASC`);
        res.send(players);
    } catch (e){
        return res.status(400).json({e});
    }
});

// POST request
app.post('/api/game', cors(), async (req, res) => {
    const newPlayer = { name: req.body.name, score: req.body.score }
    console.log([newPlayer.name, newPlayer.score]);
    const result = await db.query(
        'INSERT INTO players(name, score) VALUES($1, $2) RETURNING *',
        [newPlayer.name, newPlayer.score]
    );
    console.log(result.rows[0]);
    res.json(result.rows[0]);
});

// PUT request
app.put("/api/game/:id", async (req, res) => {
    const playerId = req.params.id;
    const updatePlayer = { score: req.body.score }
    console.log("Updating playerId", playerId);
    const query = `UPDATE players SET score=$1 WHERE id=${playerId} RETURNING *`;
    // values are $1, $2, $3, $4, $5 in different format
    const values = [updatePlayer.score];
    try {
        const updated = await db.query(query, values);
        console.log("updated", updated);
        res.send(updated.rows[0]);
    } catch (e) {
        console.log(e);
        return res.status(400).json({e});
    }
});

// console.log that your server is up and running
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});