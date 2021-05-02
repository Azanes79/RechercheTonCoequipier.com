const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    user: Object,
    content: String,
    gameId: String,
    nbPlayers: Number,
    visibility: String,
    datePost: Date,
    likes: Array,
    shares: Array
})

module.exports = mongoose.model('Post', postSchema);