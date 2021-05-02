
var express = require('express');
var router = express.Router();
const Post = require('../models/post');

/* Get posts */
router.get('/', async function(req, res) {
    if (req['currentUser']) {
        const posts = await Post.find().sort({datePost: -1});
        return res.json(posts);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new post */
router.post('/', function(req, res) {
    console.log(req.body)
    if (req['currentUser']) {    
        const post = new Post(req.body)
        const savedPost = post.save()
        return res.status(201).json(savedPost);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* update post */
router.put('/', async function (req, res) {
    if (req['currentUser']) {
        const post = new Post(req.body)
        const status = 200;
        const message = { message: 'ok' };
        Post.updateOne({ _id: post._id }, post, function (err, docs) {
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