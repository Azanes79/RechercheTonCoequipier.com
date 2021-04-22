const mongoose = require('mongoose');

const preferencesGamesSchema = new mongoose.Schema({
    userId: String,
    gameId: String,
    username: String,
    level: String
})

preferencesGamesSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('preferencesGames', preferencesGamesSchema);