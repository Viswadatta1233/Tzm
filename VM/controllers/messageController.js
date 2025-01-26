const Message = require('../models/message');
const sendMail = require('../utils/nodemailer');

const submitMessage = async (req, res) => {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        // Create the message document in the database
        const newMessage = new Message({ name, email, phone, message });
        await newMessage.save();

        // Send the email to the admin
        await sendMail(
            email,  // From user's email address
            'n210059@rguktn.ac.in',  // To the admin's email address
            `New Message from ${name}`,
            `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
        );

        return res.status(200).json({ message: 'Message submitted successfully' });
    } catch (error) {
        console.error('Error submitting message: ', error);
        return res.status(500).json({ error: 'Failed to submit message' });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });  // Get all messages, sorted by creation time
        return res.status(200).json(messages);
    } catch (error) {
        console.error('Error retrieving messages: ', error);
        return res.status(500).json({ error: 'Failed to retrieve messages' });
    }
};

module.exports = { submitMessage, getAllMessages };
