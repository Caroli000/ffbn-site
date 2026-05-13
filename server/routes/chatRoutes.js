const express = require('express');
const router = express.Router();
const chatController = require('../controllers/ChatController');
const { checkAdmin } = require('../middlewares/authMiddleware');

router.get('/history/:sessionId', chatController.getChatHistory);
router.post('/message', chatController.handleMessage);

router.get('/admin/list', checkAdmin, chatController.getAllChats);
router.post('/admin/reply', checkAdmin, chatController.adminReply);

module.exports = router;
