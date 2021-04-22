
var express = require('express');
const messages = require('../models/messages');
var router = express.Router();

/* Get messages */
router.get('/', async function(req, res) {
    if (req['currentUser']) {
        const messages = await messages.find();
        return res.json(messages);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new game */
router.post('/', function(req, res) {
    if (req['currentUser']) {    
        const messages = new messages(req.body)
        const savedMessages = messages.save()
        return res.status(201).json(savedMessages);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;