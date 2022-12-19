import React, { useState } from 'react';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Send the user's message to the backend
    const response = await fetch('/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: input }),
    });

    // Get the response from the backend
    const data = await response.json();

    // Add the response to the messages list
    setMessages([...messages, { text: input, sentiment: data.sentiment }]);

    // Clear the input field
    setInput('');
  };

  return (
    <div>
      {messages.map((message) => (
        <div key={message.text} className={`message ${message.sentiment}`}>
          {message.text}
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input value={input} onChange={(event) => setInput(event.target.value)} />
        <button type="submit