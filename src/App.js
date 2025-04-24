import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    // Add user message to chat
    const userMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    setInputText('');

    // For now, just mock the AI response
    // We'll connect to real API later
    setTimeout(() => {
      const aiMessage = { 
        text: "This is a temporary response. We'll connect to AI soon!", 
        sender: 'ai' 
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="chat-container">
      <h1>AI Chat Assistant</h1>
      <div className="chat-messages">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
        {isLoading && <div className="loading">AI is thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;

    
