const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        enum: ['user', 'bot', 'admin'],
        required: true
    },
    text: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const chatSchema = new mongoose.Schema({
    sessionId: {
        type: String,
        required: true,
        unique: true
    },
    userIp: String,
    status: {
        type: String,
        enum: ['active', 'waiting_for_admin', 'closed'],
        default: 'active'
    },
    messages: [messageSchema],
    lastMessageAt: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);
