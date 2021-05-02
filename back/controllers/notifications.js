
var express = require('express');
var router = express.Router();
const Notification = require('../models/notifications');

/* Get notifications of User */
router.get('/:userId', async function(req, res) {
    if (req['currentUser']) {
        const notifications = await Notification.find({userId: req.params.userId}).sort({date: -1});
        return res.json(notifications);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new notifications */
router.post('/', function(req, res) {
    console.log(req.body)
    if (req['currentUser']) {    
        const notification = new Notification(req.body)
        const savedNotification = notification.save()
        return res.status(201).json(savedNotification);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* update notification */
router.put('/', async function (req, res) {
    if (req['currentUser']) {
        console.log(req.body)
        const notification = new Notification(req.body)
        const status = 200;
        const message = { message: 'ok' };
        Notification.updateOne({ _id: notification._id }, notification, function (err, docs) {
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

module.exports = router;