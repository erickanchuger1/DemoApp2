import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('');

  return (
    <div className="welcome-container">
      <h1>Welcome Eric Kanchuger</h1>
      
      {/* Interactive Counter */}
      <div className="counter-section">
        <h2>Counter: {count}</h2>
        <button onClick={() => setCount(count + 1)}>Increase</button>
        <button onClick={() => setCount(count - 1)}>Decrease</button>
      </div>

      {/* Name Input */}
      <div className="input-section">
        <input 
          type="text" 
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {name && <p>Hello, {name}!</p>}
      </div>
    </div>
  );
}

export default App;

    
