const mongoose = require('mongoose');

const friendsSchema = new mongoose.Schema({
    userId1: String,
    userId2: String,
    username1: String,
    username2: String,
    user1IsNotify: Boolean,
    user1IsNotify: Boolean,
    requestStatus: String
})

friendsSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Friends', friendsSchema);