
var express = require('express');
var router = express.Router();
const Shares = require('../models/shares');

/* add shares */
router.post('/', async function (req, res) {
    if (req['currentUser']) {    
        const shares = new Shares(req.body)
        const savedshares = shares.save()
        return res.status(201).json(savedshares);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

router.get('/:userId', async function (req, res) {
    if (req['currentUser']) {
        const shares = await Shares.find({userId: req.params.userId});
        return res.json(shares);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete shares */
router.delete('/:PostId/:userId', async function (req, res) {
    if (req['currentUser']) {
        console.log(req.params)
        await Shares.deleteOne({PostId: req.params.PostId, userId: req.params.userId});
        return res.status(201).send('shares supprimmé')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;