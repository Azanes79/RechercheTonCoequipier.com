
var express = require('express');
var router = express.Router();
const Post = require('../models/posts');

/* Get posts */
router.get('/', async function(req, res) {
    if (req['currentUser']) {
        const posts = await Post.find().sort({CreatedAt: -1});
        return res.json(posts);
    } else {
        console.log(req);
        res.status(403).json({ message: 'Inaccessible' });
    }
});

/* Add new post */
router.post('/', function(req, res) {
    if (req['currentUser']) {    
        const post = new Post(req.body)
        const savedPost = post.save()
        return res.status(201).json(savedPost);
    } else {
        res.status(403).json({ message: 'Inaccessible' });
    }
});

module.exports = router;