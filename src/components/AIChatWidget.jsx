import React, { useState, useEffect, useRef } from 'react';
import { 
  MessageCircle, X, Send, Minimize2, Maximize2, 
  Building2, MapPin, Banknote, Home, Search,
  ChevronRight, ChevronLeft
} from 'lucide-react';
import { featuredProperties } from '../data/properties';
import { infrastructureData } from '../data/infrastructure';
import config from '../utils/config';

const API_URL = config.API_URL;

const AIChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef(null);
  const [position, setPosition] = useState({ right: '1rem', bottom: '1rem' });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const [promptSuggestions] = useState([
    {
      text: "Find properties in Gombe under ₦5M",
      category: "price",
      icon: Banknote
    },
    {
      text: "Show luxury homes in Gombe GRA",
      category: "property",
      icon: Home
    },
    {
      text: "What's the infrastructure like near Federal College?",
      category: "infrastructure",
      icon: Building2
    },
    {
      text: "Properties near Gombe State University",
      category: "education",
      icon: Search
    },
    {
      text: "Commercial spaces in Gombe CBD",
      category: "commercial",
      icon: Building2
    },
    {
      text: "3 bedroom apartments in Tumfure",
      category: "residential",
      icon: Home
    }
  ]);

  const [chatHistory, setChatHistory] = useState([
    {
      type: 'bot',
      content: "Hello! I'm FastFind AI. How can I help you find your perfect property in Gombe today?"
    }
  ]);

  const [visibleSuggestions, setVisibleSuggestions] = useState([0, 1, 2]);
  const [suggestionPage, setSuggestionPage] = useState(0);

  // Handle dragging
  const handleMouseDown = (e) => {
    if (e.target.closest('.chat-controls')) return;
    setIsDragging(true);
    setStartPos({
      x: e.clientX - parseFloat(position.right),
      y: e.clientY - parseFloat(position.bottom)
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const newRight = Math.max(0, startPos.x - e.clientX);
    const newBottom = Math.max(0, startPos.y - e.clientY);
    
    setPosition({
      right: `${newRight}px`,
      bottom: `${newBottom}px`
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Rotate through suggestions
  const handleNextSuggestions = () => {
    setSuggestionPage(prev => (prev + 1) % Math.ceil(promptSuggestions.length / 3));
  };

  const handlePrevSuggestions = () => {
    setSuggestionPage(prev => 
      prev === 0 ? Math.ceil(promptSuggestions.length / 3) - 1 : prev - 1
    );
  };

  useEffect(() => {
    const startIdx = suggestionPage * 3;
    setVisibleSuggestions([startIdx, startIdx + 1, startIdx + 2]);
  }, [suggestionPage]);

  // Process AI Response
  const processAIResponse = async (userQuery) => {
    setIsTyping(true);
    try {
      const propertyContext = featuredProperties.map(p => ({
        title: p.title,
        price: p.price,
        location: p.location,
        beds: p.beds,
        baths: p.baths,
        area: p.area
      }));

      const infrastructureContext = infrastructureData.categories.map(cat => ({
        category: cat.name,
        items: cat.items.map(item => ({
          name: item.name,
          location: item.location,
          distance: item.distance
        }))
      }));

      const response = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...chatHistory.map(msg => ({
            role: msg.type === 'user' ? 'user' : 'assistant',
            content: msg.content
          })), { role: 'user', content: userQuery }],
          propertyContext,
          infrastructureContext
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      
      setTimeout(() => {
        setChatHistory(prev => [...prev, { type: 'bot', content: data.response }]);
        setIsTyping(false);
      }, 500);

    } catch (error) {
      console.error('Error:', error);
      setChatHistory(prev => [...prev, {
        type: 'bot',
        content: "I apologize, but I encountered an error. Please try again."
      }]);
      setIsTyping(false);
    }
  };

  return (
    <div 
      className="fixed z-50"
      style={position}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-[#1c5bde] hover:bg-[#0c0d8a] text-white rounded-full p-4 shadow-lg transition-all duration-200 flex items-center gap-2 backdrop-blur-sm bg-opacity-90"
        >
          <MessageCircle className="h-6 w-6" />
          <span className="text-sm font-medium">Ask FastFind AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div 
          ref={chatRef}
          className={`bg-white rounded-lg shadow-2xl transition-all duration-200 backdrop-blur-sm bg-opacity-95
            ${isMinimized ? 'h-14' : 'h-[500px]'} w-[350px] flex flex-col`}
        >
          {/* Header */}
          <div className="p-4 bg-gradient-to-r from-[#1c5bde] to-[#0c0d8a] text-white rounded-t-lg flex justify-between items-center chat-controls">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageCircle className="h-5 w-5" />
              FastFind AI Assistant
            </h3>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
              >
                {isMinimized ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-white/20 p-1 rounded transition-colors"
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
                          ? 'bg-gradient-to-r from-[#1c5bde] to-[#0c0d8a] text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 rounded-lg p-3">
                      <div className="flex gap-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions */}
              <div className="p-4 border-t border-gray-100">
                <div className="flex items-center justify-between mb-2">
                  <button 
                    onClick={handlePrevSuggestions}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-xs text-gray-500">Suggestions</span>
                  <button 
                    onClick={handleNextSuggestions}
                    className="p-1 hover:bg-gray-100 rounded-full"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-2">
                  {visibleSuggestions.map((index) => (
                    promptSuggestions[index] && (
                      <button
                        key={index}
                        onClick={() => {
                          setMessage(promptSuggestions[index].text);
                          setChatHistory(prev => [...prev, { type: 'user', content: promptSuggestions[index].text }]);
                          processAIResponse(promptSuggestions[index].text);
                        }}
                        className="w-full text-left text-sm text-gray-600 hover:text-[#1c5bde] hover:bg-[#1c5bde]/5 p-2 rounded-lg transition-colors flex items-center gap-2"
                      >
                        {React.createElement(promptSuggestions[index].icon, { className: "h-4 w-4" })}
                        {promptSuggestions[index].text}
                      </button>
                    )
                  ))}
                </div>

                {/* Input Field */}
                <div className="flex gap-2 mt-4">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && message.trim() && processAIResponse(message)}
                    placeholder="Type your question..."
                    className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:border-[#1c5bde] text-sm"
                  />
                  <button
                    onClick={() => message.trim() && processAIResponse(message)}
                    className="bg-gradient-to-r from-[#1c5bde] to-[#0c0d8a] text-white rounded-lg px-4 py-2 hover:opacity-90 transition-opacity"
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