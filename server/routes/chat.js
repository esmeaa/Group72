// server/routes/chat.js
const express = require('express');
const router = express.Router();

let messages = []; // In-memory message store (for demo purposes only)

// GET all messages between two users
router.get('/:user1/:user2', (req, res) => {
    const { user1, user2 } = req.params;
    const chatMessages = messages.filter(msg =>
        (msg.sender === user1 && msg.receiver === user2) ||
        (msg.sender === user2 && msg.receiver === user1)
    );
    res.json(chatMessages);
});

// POST a new message
router.post('/', (req, res) => {
    const { sender, receiver, text } = req.body;
    if (!sender || !receiver || !text) {
        return res.status(400).json({ error: 'Missing fields' });
    }

    const newMessage = {
        id: messages.length + 1,
        sender,
        receiver,
        text,
        timestamp: new Date()
    };
    messages.push(newMessage);
    res.status(201).json(newMessage);
});

module.exports = router;
