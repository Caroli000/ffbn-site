const Chat = require('../models/Chat');
const openAIService = require('../services/OpenAIService');
const mongoose = require('mongoose');

// Fallback en mémoire pour les sessions si MongoDB est down
const memoryChats = new Map();

class ChatController {
    async getChatHistory(req, res) {
        try {
            const { sessionId } = req.params;

            if (mongoose.connection.readyState !== 1) {
                const chat = memoryChats.get(sessionId) || { sessionId, messages: [] };
                return res.json({ success: true, chat, mode: 'memory' });
            }

            let chat = await Chat.findOne({ sessionId });
            if (!chat) {
                chat = await Chat.create({ sessionId, messages: [] });
            }
            res.json({ success: true, chat });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async handleMessage(req, res) {
        try {
            const { sessionId, text } = req.body;
            
            if (mongoose.connection.readyState !== 1) {
                // Mode dégradé (Mémoire)
                let chat = memoryChats.get(sessionId) || { sessionId, messages: [] };
                chat.messages.push({ sender: 'user', text, timestamp: new Date() });

                const botResponseText = await openAIService.getChatbotResponse(chat.messages);
                chat.messages.push({ sender: 'bot', text: botResponseText, timestamp: new Date() });

                memoryChats.set(sessionId, chat);
                return res.json({ success: true, response: botResponseText, mode: 'memory' });
            }

            // Mode normal (MongoDB)
            let chat = await Chat.findOne({ sessionId });
            if (!chat) {
                chat = new Chat({ sessionId, messages: [] });
            }

            chat.messages.push({ sender: 'user', text });
            chat.lastMessageAt = Date.now();
            await chat.save();

            const botResponseText = await openAIService.getChatbotResponse(chat.messages);

            chat.messages.push({ sender: 'bot', text: botResponseText });
            await chat.save();

            res.json({ success: true, response: botResponseText });
        } catch (error) {
            console.error('[ChatController] Error:', error);
            res.status(500).json({ success: false, message: 'Erreur technique du chat' });
        }
    }

    async getAllChats(req, res) {
        try {
            if (mongoose.connection.readyState !== 1) {
                const chats = Array.from(memoryChats.values());
                return res.json({ success: true, chats, mode: 'memory' });
            }
            const chats = await Chat.find().sort({ lastMessageAt: -1 });
            res.json({ success: true, chats });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }

    async adminReply(req, res) {
        try {
            const { sessionId, text } = req.body;

            if (mongoose.connection.readyState !== 1) {
                let chat = memoryChats.get(sessionId);
                if (chat) {
                    chat.messages.push({ sender: 'admin', text, timestamp: new Date() });
                    memoryChats.set(sessionId, chat);
                }
                return res.json({ success: true, mode: 'memory' });
            }

            const chat = await Chat.findOne({ sessionId });
            if (!chat) return res.status(404).json({ success: false, message: 'Chat not found' });

            chat.messages.push({ sender: 'admin', text });
            chat.status = 'active';
            await chat.save();

            res.json({ success: true });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    }
}

module.exports = new ChatController();
