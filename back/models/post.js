const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    content: String,
    gameId: String,
    nbPlayers: Int32Array,
    visibility: String,
    datePost: Date,
    dateEnd: Date
})

postSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Post', postSchema);