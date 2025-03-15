import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { sender: "User", text: userInput }];
    setMessages(newMessages);
    setUserInput("");

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/chat`, { message: userInput });
      setMessages([...newMessages, { sender: "Bot", text: response.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "Bot", text: "Error: Unable to process request." }]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-4 shadow-md bg-white rounded-lg">
        <h2 className="text-xl font-semibold text-center mb-4">Mental Health Chatbot</h2>
        <div className="h-64 overflow-y-auto border p-2">
          {messages.map((msg, index) => (
            <p key={index} className={`p-2 ${msg.sender === "User" ? "text-right text-blue-600" : "text-left text-green-600"}`}>
              <strong>{msg.sender}:</strong> {msg.text}
            </p>
          ))}
        </div>
        <div className="flex mt-4 space-x-2">
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 p-2 border rounded-lg"
          />
          <button onClick={sendMessage} className="bg-blue-500 text-white p-2 rounded-lg">Send</button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
