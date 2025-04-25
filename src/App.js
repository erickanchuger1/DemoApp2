import React, { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  constnst handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages([...messages, userMessage]);
    setIsLoading(true);
    setInputText('');

    try {
      const response = await fetch('https://39snl7d2fd.execute-api.us-west-2.amazonaws.com/prod/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputText }),
      });

      const data = await response.json();
      setMessages(prev => [...prev, { 
        text: data.response, 
        sender: 'ai' 
      }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I encountered an error. Please try again.", 
        sender: 'ai' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Event Planning Assistant</h1>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              {message.text}
            </div>
          ))}
          {isLoading && <div className="loading">AI is thinking...</div>}
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Ask about events..."
            className="chat-input"
          />
          <button 
            onClick={handleSendMessage}
            className="send-button"
            disabled={isLoading}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;

    
