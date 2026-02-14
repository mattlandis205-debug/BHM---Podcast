
import React, { useState, useRef, useEffect } from 'react';
import { askHistorian } from '../services/geminiService';
import { ChatMessage } from '../types';

const HistoricalChat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg: ChatMessage = { role: 'user', text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    const response = await askHistorian(input, messages);
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
  };

  return (
    <div className="bg-white rounded-xl shadow-lg border border-stone-200 overflow-hidden flex flex-col h-[600px]">
      <div className="bg-stone-800 text-white p-4 font-bold flex items-center gap-2">
        <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        Live Historical Consultant
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4 parchment-texture" ref={scrollRef}>
        {messages.length === 0 && (
          <div className="text-center py-10 text-stone-400 italic">
            Ask a question about Boston King, Peter Salem, or why freedom was so complicated in 1776.
          </div>
        )}
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[80%] p-3 rounded-lg shadow-sm ${
              m.role === 'user' 
                ? 'bg-amber-600 text-white rounded-br-none' 
                : 'bg-white border border-stone-200 text-stone-800 rounded-bl-none'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{m.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-stone-100 p-3 rounded-lg animate-pulse text-stone-500 text-sm">
              Reviewing the archives...
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t border-stone-200 bg-stone-50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your question here..."
            className="flex-grow px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            onClick={handleSend}
            disabled={loading}
            className="bg-amber-800 text-white px-6 py-2 rounded-md hover:bg-amber-900 transition-colors disabled:opacity-50"
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoricalChat;
