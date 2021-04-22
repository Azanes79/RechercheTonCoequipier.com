var express = require('express');
var router = express.Router();
require('../authenticateToken');
const User = require('../models/users');

/* get a user by id */
router.get('/:FirebaseId', async function (req, res) {
  if (req['currentUser']) {
    const users = await User.find({ FirebaseId: req.params.FirebaseId });
    return res.json(users);
  } else {
    res.status(403).json({ message: 'Inaccessible' });
  }
});

router.get('/', async function (req, res) {
  if (req['currentUser']) {
    const users = await User.find();
    return res.json(users);
  } else {
    res.status(403).json({ message: 'Inaccessible' });
  }
});

/* create user */
router.post('/', async function (req, res) {
  const user = new User(req.body)
  const savedPost = user.save()
  return res.status(201).json(savedPost);
});


module.exports = router;
