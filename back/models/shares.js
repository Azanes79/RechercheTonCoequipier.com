const mongoose = require('mongoose');

const likesSchema = new mongoose.Schema({
    userId: String,
    postId: String
})

likesSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Likes', likesSchema);