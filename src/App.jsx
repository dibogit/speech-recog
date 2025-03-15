import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home'; // Home page
import VoiceAssistant from './VoiceAssistant'; // Voice assistant page

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | 
        <Link to="/assistant">Voice Assistant</Link> | 
        <a href="https://5082ec79cdf1922a8a.gradio.live/" target="_blank" rel="noopener noreferrer">
          Mental Health Chatbot
        </a>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<VoiceAssistant />} />
      </Routes>
    </div>
  );
}

export default App;
