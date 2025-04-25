import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const suggestedPrompts = [
    "Find concerts this weekend",
    "Sports events near me",
    "Shows in NYC",
    "Upcoming festivals"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setMessages([
      {
        text: "Hello! I'm your Event Planning Assistant. I can help you discover amazing events and plan your entertainment experience. Try asking about:",
        sender: 'ai',
        suggestions: suggestedPrompts
      }
    ]);
  }, []);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = { text: inputText, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
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
        sender: 'ai',
        timestamp: new Date().t).toLocaleTimeString()
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

  const handleSuggestionClick = (suggestion) => {
    setInputText(suggestion);
    handleSendMessage();
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-container">
          <h1>Event Planning Assistant</h1>
        </div>
        <div className="category-buttons">
          <button onClick={() => handleSuggestionClick("Show me concerts")}>🎵 Concerts</button>
          <button onClick={() => handleSuggestionClick("Show me sports events")}>🏆 Sports</button>
          <button onClick={() => handleSuggestionClick("Show me theater shows")}>🎭 Theater</button>
          <button onClick={() => handleSuggestionClick("Show me festivals")}>🎪 Festivals</button>
        </div>
      </header>

      <div className="chat-container">
        <div className="messages-container">
          {messages.map((message, index) => (
            <div key={index} className={`message-wrapper ${message.sender}`}>
              <div className={`message ${message.sender}`}>
                <div className="message-content">{message.text}</div>
                {message.timestamp && (
                  <div className="message-timestamp">{message.timestamp}</div>
                )}
                {message.suggestions && (
                  <div className="suggestion-chips">
                    {message.suggestions.map((suggestion, i) => (
                      <button
                        key={i}
                        onClick={() => handleSuggestionClick(suggestion)}
                        className="suggestion-chip"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="typing-indicator">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="input-container">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' &' && handleSendMessage()}
            placeholder="Ask about events, shows, or venues..."
            className="chat-input"
          />
          <button 
            onClick={handleSendMessage}
            className="send-button"
            disabled={isLoading}
          >
            <span className="button-text">Send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
