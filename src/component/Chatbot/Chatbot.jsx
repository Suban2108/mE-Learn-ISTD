import React, { useState } from "react";
import { FaRobot, FaTimes } from "react-icons/fa";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleChat = () => setIsOpen(!isOpen);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chatbot Toggle Button */}
      <button
  onClick={toggleChat}
  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition m-4 bottom-8 right-8"
>
{isOpen ? <FaTimes className="text-2xl" /> :   <span className="flex items-center gap-2 text-lg font-medium">
  <FaRobot className="text-xl" />
  Need any help?
</span>
}
</button>


      {/* Chatbot Window */}
      {isOpen && (
        <div className="mt-2 w-80 h-96 bg-white shadow-lg rounded-lg flex flex-col">
          <div className="p-3 bg-blue-600 text-white font-bold text-center">
            Chat with us!
          </div>
          <iframe
            allow="microphone;"
            width="320"
            height="384"
             src="https://console.dialogflow.com/api-client/demo/embedded/e54f8ae3-1f71-4a5c-8fb9-6222a727a5da">
            </iframe>
          <div className="p-2 text-sm text-gray-500 text-center">
            Powered by [Console.Code]
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
