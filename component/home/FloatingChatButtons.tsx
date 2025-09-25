import React from "react";
import { Bot, MessageCircle } from "lucide-react";

const FloatingChatButtons = () => {
  return (
    <div className="fixed bottom-20 right-6 z-50 flex flex-col gap-4 items-end">
      {/* Chatbot Button */}
      {/* <button
        onClick={() => {
          // Replace this with your chatbot open function
          alert("Chatbot activated!");
        }}
        className="w-14 h-14 rounded-full bg-[#00C9FF] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <Bot size={24} />
      </button> */}

      {/* WhatsApp Button */}
      <a
        href="https://wa.me/61418682309"
        target="_blank"
        rel="noopener noreferrer"
        className="w-14 h-14 rounded-full bg-[#00C9FF] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <MessageCircle size={24} />
      </a>
    </div>
  );
};

export default FloatingChatButtons;
