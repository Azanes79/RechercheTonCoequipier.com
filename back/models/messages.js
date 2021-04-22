const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    userIdSend: String,
    userIdReceipt: String,
    dateReceipt: Date
})

messagesSchema.set('toJSON', {
    transform : (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Messages', messagesSchema);