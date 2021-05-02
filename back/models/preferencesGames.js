const mongoose = require('mongoose');

const preferencesGamesSchema = new mongoose.Schema({
    userId: String,
    gameId: String,
    username: String,
    level: String
})

module.exports = mongoose.model('preferencesgames', preferencesGamesSchema);