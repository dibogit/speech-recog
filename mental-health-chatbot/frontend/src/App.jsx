import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import VoiceAssistant from './VoiceAssistant';

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link> | <Link to="/assistant">Voice Assistant</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/assistant" element={<VoiceAssistant />} />
      </Routes>
    </div>
  );
}

export default App;
