import React from "react";
import { MessageCircle, Mic } from "lucide-react";
import Navbar from "./Navbar";

const UserLayout = ({ children, onLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 relative">
      <Navbar onLogout={onLogout} />
      <main className="p-6">{children}</main>

      {/* ChatbotVoiceButtons - Always visible floating buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        {/* Voice Assistant Button */}
        <button
          onClick={() => console.log("Voice Assistant activated")}
          className="w-14 h-14 bg-blue-600 hover:bg-blue-700 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-blue-300 focus:ring-opacity-50 sm:w-12 sm:h-12"
          aria-label="Voice Assistant"
          title="Voice Assistant"
        >
          <Mic className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>

        {/* Chatbot Button */}
        <button
          onClick={() => console.log("Chatbot opened")}
          className="w-14 h-14 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300 focus:ring-opacity-50 sm:w-12 sm:h-12"
          aria-label="Chatbot"
          title="Chatbot"
        >
          <MessageCircle className="h-6 w-6 sm:h-5 sm:w-5" />
        </button>
      </div>
    </div>
  );
};

export default UserLayout;