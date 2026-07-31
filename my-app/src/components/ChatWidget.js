import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './ChatWidget.css';

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { 
            type: 'bot', 
            text: "🌍 Hi! I'm TrekPort Travel Assistant. Ask me about tours, safaris, destinations, or booking!" 
        }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const sendMessage = async () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
        setInput('');
        setLoading(true);

        try {
            const response = await axios.post(
                `http://localhost:8800/api/v1/chat`,
                { message: userMessage }
            );

            if (response.data.success) {
                setMessages(prev => [...prev, { 
                    type: 'bot', 
                    text: response.data.reply 
                }]);
            } else {
                setMessages(prev => [...prev, { 
                    type: 'bot', 
                    text: "Sorry, I'm having trouble. Please try again." 
                }]);
            }
        } catch (error) {
            console.error("Chat Error:", error);
            setMessages(prev => [...prev, { 
                type: 'bot', 
                text: "Sorry, I'm having trouble connecting. Please try again later." 
            }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    };

    const toggleChat = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="chat-widget">
            <button 
                className="chat-toggle-btn"
                onClick={toggleChat}
                aria-label="Toggle Chat"
            >
                {isOpen ? '✕' : '💬'}
            </button>

            {isOpen && (
                <div className="chat-window">
                    <div className="chat-header">
                        <h3>🌍 TrekPort Assistant</h3>
                        <p>Ask me about tours & safaris!</p>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg, index) => (
                            <div 
                                key={index}
                                className={`message ${msg.type}`}
                            >
                                <span className="message-text">{msg.text}</span>
                            </div>
                        ))}
                        {loading && (
                            <div className="message bot">
                                <span className="message-text typing">Typing...</span>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <div className="chat-input">
                        <input
                            ref={inputRef}
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="Ask about tours, safaris, destinations..."
                            disabled={loading}
                        />
                        <button 
                            onClick={sendMessage}
                            disabled={loading || !input.trim()}
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatWidget;