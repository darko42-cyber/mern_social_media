
const mongoose = require('mongoose')

const MessageSchema = new mongoose.Schema({
    members: {
        type: Array,

    }

}, {
    timestamps: true
})

module.exports = mongoose.model('Conversation', MessageSchema)