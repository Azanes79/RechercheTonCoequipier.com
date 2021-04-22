const mongoose = require('mongoose');

const gamesSchema = new mongoose.Schema({
    name: String,
    status: String
})

gamesSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Games', gamesSchema);