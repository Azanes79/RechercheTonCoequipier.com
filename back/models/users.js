const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: String,
    FirebaseId: String,
    email: String,
    description: String
})

usersSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('users', usersSchema);