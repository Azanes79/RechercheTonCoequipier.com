
var express = require('express');
const games = require('../models/games');
var router = express.Router();

/* Get games */
router.get('/', async function(req, res) {
    if (req['currentUser']) {
        const games = await games.find();
        return res.json(games);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new game */
router.post('/', function(req, res) {
    if (req['currentUser']) {    
        const game = new games(req.body)
        const savedGame = game.save()
        return res.status(201).json(savedGame);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete games */
router.put('/', async function (req, res) {
    if (req['currentUser']) {
        await games.put(req.body);
        return res.send('Jeu à jour')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;