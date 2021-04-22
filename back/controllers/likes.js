
var express = require('express');
var router = express.Router();
const Like = require('../models/likes');

/* add like */
router.post('/', async function (req, res) {
    if (req['currentUser']) {    
        const like = new Like(req.body)
        const savedLike = like.save()
        return res.status(201).json(savedLike);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

router.get('/:userId', async function (req, res) {
    if (req['currentUser']) {
        const likes = await Like.find({userId: req.params.userId});
        return res.json(likes);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete like */
router.delete('/:PostId/:userId', async function (req, res) {
    if (req['currentUser']) {
        console.log(req.params)
        await Like.deleteOne({PostId: req.params.PostId, userId: req.params.userId});
        return res.status(201).send('Like supprimmé')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;