const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    username: String,
    FirebaseId: String,
    email: String,
    description: String,
    friends: Array
})

module.exports.usersSchema = usersSchema;
module.exports = mongoose.model('users', usersSchema);