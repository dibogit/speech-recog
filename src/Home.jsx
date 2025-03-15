import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to Shifra</h1>
      <p>Click below to start your voice assistant.</p>
      
      <Link to="/assistant">
        <button>Go to Voice Assistant</button>
      </Link>

      <p>Click below to access the Mental Health Chatbot:</p>
      <a href="https://5082ec79cdf1922a8a.gradio.live/" target="_blank" rel="noopener noreferrer">
        <button>Open Mental Health Chatbot</button>
      </a>
    </div>
  );
}

export default Home;
