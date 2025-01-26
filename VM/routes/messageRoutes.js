const express = require('express');
const { submitMessage, getAllMessages } = require('../controllers/messageController');
const { authenticate } = require('../middlewares/authMiddleware');
const router = express.Router();

// Route to submit a message
router.post('/submit', submitMessage);

// Route to get all messages (only accessible by admins)
router.get('/',authenticate, getAllMessages);

module.exports = router;
