import React, { useState } from "react";
import { MessageCircle, Mic, MicOff } from "lucide-react";

const ChatbotVoiceButtons = () => {
  const [isListening, setIsListening] = useState(false);

  const handleVoiceAssistant = () => {
    setIsListening(!isListening);
    if (!isListening) {
      // Add your voice assistant start logic here
    } else {
      // Add your voice assistant stop logic here
    }
  };

  const handleChatbot = () => {
    // Add your chatbot logic here
  };

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      {/* Voice Assistant Button */}
      <button
        onClick={handleVoiceAssistant}
        className={`w-14 h-14 ${
          isListening 
            ? "bg-red-600 hover:bg-red-700" 
            : "bg-blue-600 hover:bg-blue-700"
        } text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 ${
          isListening 
            ? "focus:ring-red-300" 
            : "focus:ring-blue-300"
        } focus:ring-opacity-50 sm:w-12 sm:h-12`}
        aria-label={isListening ? "Stop Listening" : "Voice Assistant"}
        title={isListening ? "Stop Listening" : "Voice Assistant"}
      >
        {isListening ? (
          <MicOff className="h-6 w-6 sm:h-5 sm:w-5" />
        ) : (
          <Mic className="h-6 w-6 sm:h-5 sm:w-5" />
        )}
      </button>

      {/* Chatbot Button */}
      <button
        onClick={handleChatbot}
        className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 sm:w-12 sm:h-12"
        aria-label="Chatbot"
        title="Chatbot"
      >
        <MessageCircle className="h-6 w-6 sm:h-5 sm:w-5" />
      </button>
    </div>
  );
};

export default ChatbotVoiceButtons;