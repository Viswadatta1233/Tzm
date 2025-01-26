const express = require('express');
const { submitMessage, getAllMessages } = require('../controllers/messageController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to submit a message
router.post('/submit', authenticate,submitMessage);

// Route to get all messages (only accessible by admins)
router.get('/', getAllMessages);

module.exports = router;
