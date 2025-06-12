import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import './ChatBox.css';

function ChatBox({ user1, user2 }) {
    const location = useLocation();
    const draft = location.state?.draft || '';
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Set input to draft if available
    useEffect(() => {
        if (draft) {
            setInput(draft);
        }
    }, [draft]);

    // Fetch messages on mount and every 3 seconds
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/messages/${user1}/${user2}`);
                setMessages(res.data);
            } catch (err) {
                console.error('Error fetching messages:', err);
            }
        };

        fetchMessages(); // initial fetch
        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    }, [user1, user2]);

    // Send message
    const sendMessage = async () => {
        if (!input.trim()) return;

        try {
            await axios.post('/api/messages', {
                sender_id: user1,
                receiver_id: user2,
                message: input.trim(),
            });

            setInput('');

            // Refresh messages
            const res = await axios.get(`/api/messages/${user1}/${user2}`);
            setMessages(res.data);
        } catch (err) {
            console.error('Error sending message:', err);
        }
    };

    return (
        <div className="chat-container">
            <h2 className="chat-header">Chat with {user2}</h2>
            <div className="message-box">
                {messages.length === 0 ? (
                    <p className="no-messages">No messages yet.</p>
                ) : (
                    messages.map((msg, i) => (
                        <div
                            key={i}
                            className={`message ${msg.sender_id === user1 ? 'message-sent' : 'message-received'
                                }`}
                        >
                            <p className="message-text">{msg.message}</p>
                        </div>
                    ))
                )}
            </div>
            <div className="input-area">
                <input
                    className="input-field"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="send-button" onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default ChatBox;
