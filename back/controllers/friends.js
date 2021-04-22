
var express = require('express');
const friends = require('../models/friends');
var router = express.Router();

/* Get friends */
router.get('/', async function(req, res) {
    if (req['currentUser']) {
        const friends = await friends.find();
        return res.json(friends);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new friend */
router.post('/', function(req, res) {
    if (req['currentUser']) {    
        const friend = new friends(req.body)
        const savedFriend = friend.save()
        return res.status(201).json(savedFriend);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* delete friends */
router.delete('/:user1/:user2', async function (req, res) {
    if (req['currentUser']) {
        await friends.deleteOne({user1: req.params.user1, user2: req.params.user2});
        return res.status(201).send('Ami supprimmé')
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;