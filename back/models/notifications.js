const mongoose = require('mongoose');

const notificationsSchema = new mongoose.Schema({
    userId: String,
    userPost: Object,
    content: String,
    isNewNotif: Boolean,
    date: Date
})

module.exports = mongoose.model('notifications', notificationsSchema);