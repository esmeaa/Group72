import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

function ChatBox({ user1, user2 }) {
    const location = useLocation();
    const draft = location.state?.draft || "";
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    // Initialize input with draft message if available
    useEffect(() => {
        if (draft) {
            setInput(draft);
        }
    }, [draft]);

    // Poll messages every 3 seconds
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/api/messages/${user1}/${user2}`);
                setMessages(res.data);
            } catch (err) {
                console.error(err);
            }
        };

        fetchMessages();
        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    }, [user1, user2]);

    const sendMessage = async () => {
        if (!input.trim()) return;
        try {
            await axios.post('/api/messages', {
                sender_id: user1,
                receiver_id: user2,
                message: input,
            });
            setInput('');
            // fetch updated messages immediately after sending
            const res = await axios.get(`/api/messages/${user1}/${user2}`);
            setMessages(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div>
            <div style={{ height: '300px', overflowY: 'scroll', border: '1px solid #ccc' }}>
                {messages.map((msg, i) => (
                    <div key={i} style={{ textAlign: msg.sender_id === user1 ? 'right' : 'left' }}>
                        <p>{msg.message}</p>
                    </div>
                ))}
            </div>
            <input
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder="Type message..."
            />
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}

export default ChatBox;
