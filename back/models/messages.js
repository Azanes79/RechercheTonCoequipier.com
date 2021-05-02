const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    userIdSend: String,
    userIdReceipt: String,
    dateReceipt: Date
})

module.exports = mongoose.model('Messages', messagesSchema);