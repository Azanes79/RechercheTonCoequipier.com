const mongoose = require('mongoose');

const sharesSchema = new mongoose.Schema({
    userId: String,
    postId: String
})

sharesSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Shares', sharesSchema);