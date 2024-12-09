import React, { useState } from 'react';
import { MessageCircle, X, Send, Minimize2, Maximize2 } from 'lucide-react';

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      content: 'Hello! I\'m FastFind AI Assistant. How can I help you today?'
    }
  ]);

  const handleSend = () => {
    if (message.trim()) {
      // Add user message to chat
      setChatHistory([...chatHistory, { type: 'user', content: message }]);
      
      // Simulate AI response (replace with actual API call)
      setTimeout(() => {
        setChatHistory(prev => [...prev, {
          type: 'bot',
          content: 'Welcome to FastFind360. Find Your Perfect Property in NigeriaDiscover properties with comprehensive infrastructure insights and 360° virtual tours'

        }]);
      }, 1000);
      
      setMessage('');
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#0e109f] hover:bg-[#0c0d8a] text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center gap-2"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm">Ask FastFind AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className={`bg-white rounded-lg shadow-xl transition-all duration-200 ${
          isMinimized ? 'h-14' : 'h-[500px]'
        } w-[350px] flex flex-col`}>
          {/* Header */}
          <div className="p-4 bg-[#0e109f] text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">FastFind AI Assistant</h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-blue-700 p-1 rounded"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-blue-700 p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Content */}
          {!isMinimized && (
            <>
              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatHistory.map((msg, index) => (
                  <div
                    key={index}
                    className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg p-3 ${
                        msg.type === 'user'
                          ? 'bg-[#0e109f] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Area */}
              <div className="p-4 border-t">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Type your question..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-blue-600"
                  />
                  <button
                    onClick={handleSend}
                    className="bg-[#0e109f] hover:bg-[#0c0d8a] text-white rounded-lg px-4 py-2"
                  >
                    <Send size={18} />
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default AIChatWidget; 