
var express = require('express');
const PreferencesGames = require('../models/preferencesGames');
var router = express.Router();

/* Get preferencesGames of user */
router.get('/:userId', async function (req, res) {
    if (req['currentUser']) {
        const preferencesGames = await PreferencesGames.find({ userId: req.params.userId });
        return res.json(preferencesGames);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Get one preferenceGame of user */
router.get('/:userId/:gameId', async function (req, res) {
    if (req['currentUser']) {
        const preferencesGames = await PreferencesGames.find({ userId: req.params.userId, gameId: req.params.gameId });
        return res.json(preferencesGames);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new preferenceGame */
router.post('/', function (req, res) {
    if (req['currentUser']) {
        const prefGame = new PreferencesGames(req.body)
        const savedPrefGame = prefGame.save()
        return res.status(201).json(savedPrefGame);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* update preferenceGame */
router.put('/', async function (req, res) {
    if (req['currentUser']) {
        const preferencesGames = new PreferencesGames(req.body)
        const status = 200;
        const message = { message: 'ok' };
        PreferencesGames.updateOne({ _id: preferencesGames._id }, preferencesGames, function (err, docs) {
            if (err) {
                status = 400;
                message = { message: 'Erreur à la mise à jour' };
            }
        });
        return res.status(status).json(message);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete preferenceGame */
router.delete('/:userId/:gameId', async function (req, res) {
    if (req['currentUser']) {
        await PreferencesGames.deleteOne({ userId: req.params.userId, gameId: req.params.gameId });
        return res.json('préférence supprimmée')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;