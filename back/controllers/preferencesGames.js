
var express = require('express');
const preferencesGames = require('../models/preferencesGames');
var router = express.Router();

/* Get preferencesGames */
router.get('/', async function(req, res) {
    if (req['currentUser']) {
        const preferencesGames = await preferencesGames.find();
        return res.json(preferencesGames);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new game */
router.post('/', function(req, res) {
    if (req['currentUser']) {    
        const prefGame = new preferencesGames(req.body)
        const savedPrefGame = prefGame.save()
        return res.status(201).json(savedPrefGame);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete preferencesGames */
router.put('/', async function (req, res) {
    if (req['currentUser']) {
        await preferencesGames.put(req.body);
        return res.send('Préférence jeu à jour')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete preferenceGame */
router.delete('/:id', async function (req, res) {
    if (req['currentUser']) {
        await preferencesGames.deleteOne({_id: req.params.id});
        return res.status(201).send('Ami supprimmé')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;