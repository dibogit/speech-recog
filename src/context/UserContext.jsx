import React, { createContext, useState, useEffect } from 'react';
import run from '../gemini';

export const datacontext = createContext();

function UserContext({ children }) {
    let [speaking, setSpeaking] = useState(false);
    let [prompt, setPrompt] = useState("Listening...");
    let [response, setResponse] = useState(false);
    let recognitionRef = React.useRef(null);

    function speak(text) {
        let text_speak = new SpeechSynthesisUtterance(text);
        text_speak.volume = 1;
        text_speak.rate = 1;
        text_speak.pitch = 1;
        text_speak.lang = "en-US";

        // Stop Recognition Before Speaking
        if (recognitionRef.current) {
            recognitionRef.current.stop();
        }

        setSpeaking(true);
        window.speechSynthesis.speak(text_speak);

        text_speak.onend = () => {
            console.log("Speech finished");
            setSpeaking(false);
            // Restart recognition after speaking finishes
            if (recognitionRef.current) {
                recognitionRef.current.start();
            }
        };
    }

    async function aiResponse(prompt) {
        let text = await run(prompt);
        let newText = text.replace(/\*\*/g, "").replace(/\*/g, "").replace(/google/gi, "Ayush Sahu");
        newText = `${newText} Would you like to ask something else?`;
        setPrompt(newText);
        speak(newText);
        setResponse(true);
    }

    useEffect(() => {
        let speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        let recognition = new speechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";
        recognitionRef.current = recognition;

        recognition.onresult = (e) => {
            let currentIndex = e.resultIndex;
            let transcript = e.results[currentIndex][0].transcript;
            setPrompt(transcript);
            takeCommand(transcript.toLowerCase());
        };

        recognition.onerror = (event) => {
            console.error("Speech Recognition Error:", event.error);
            setPrompt("Error: " + event.error);
        };

        recognition.onend = () => {
            console.log("Recognition stopped. Restarting...");
            if (!speaking) {
                recognition.start();
            }
        };

        recognition.start();

        return () => {
            recognition.stop();
        };
    }, []);

    function takeCommand(command) {
        if (command.includes("open") && command.includes("youtube")) {
            window.open("https://www.youtube.com/", "_blank");
            speak("Opening YouTube. What else can I do for you?");
        } else if (command.includes("open") && command.includes("google")) {
            window.open("https://www.google.com/", "_blank");
            speak("Opening Google. Let me know if you need anything else.");
        } else if (command.includes("open") && command.includes("instagram")) {
            window.open("https://www.instagram.com/", "_blank");
            speak("Opening Instagram. Do you need help with anything else?");
        } else if (command.includes("open") && command.includes("depression")) {
            window.open("https://www.youtube.com/watch?v=lApYezP8pMU", "_blank");
            speak("Opening depression solution videos. I hope this helps you. Want to talk about it?");
        } else if (command.includes("time")) {
            let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
            speak(`The current time is ${time}. Let me know if I can assist you with anything else.`);
        } else if (command.includes("date")) {
            let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
            speak(`Today's date is ${date}. What else would you like to know?`);
        } 
        // Call Therapist (Phone Call)
        else if (command.includes("call") && command.includes("therapist")) {
            window.open("tel:+919331877426"); // Corrected phone format with country code
            speak("Calling your therapist now. Please wait.");
        } 
        // Call Therapist via WhatsApp
        else if (command.includes("whatsapp") && command.includes("therapist")) {
            window.open("https://wa.me/918334853608"); // Corrected WhatsApp format
            speak("Opening WhatsApp chat with your therapist. Let me know if you need anything else.");
        } 
        else {
            aiResponse(command);
        }
        setResponse(true);
    }

    let value = {
        recognition: recognitionRef.current,
        speaking,
        setSpeaking,
        prompt,
        setPrompt,
        response,
        setResponse
    };

    return (
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    );
}

export default UserContext;
