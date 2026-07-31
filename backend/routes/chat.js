const express = require('express');
const router = express.Router();
const { handleChat } = require('../controllers/chatController');

// POST /api/v1/chat - Chatbot endpoint
router.post('/chat', handleChat);

module.exports = router;