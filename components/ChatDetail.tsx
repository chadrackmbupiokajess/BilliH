
import React, { useState, useEffect, useRef } from 'react';
import { Match, Message } from '../types';
import { ChevronLeft, Send, Sparkles, Loader2 } from 'lucide-react';
import { getIcebreaker } from '../services/gemini';

interface ChatDetailProps {
  match: Match;
  onBack: () => void;
  onSendMessage: (matchId: string, text: string) => void;
}

const ChatDetail: React.FC<ChatDetailProps> = ({ match, onBack, onSendMessage }) => {
  const [inputText, setInputText] = useState('');
  const [icebreakers, setIcebreakers] = useState<string[]>([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [match.messages]);

  const handleSend = () => {
    if (!inputText.trim()) return;
    onSendMessage(match.id, inputText);
    setInputText('');
  };

  const generateIcebreakers = async () => {
    setLoadingAI(true);
    // Use dummy current user for demo
    const dummyMe = { name: "Moi", age: 30, interests: ["Lecture", "Voyage"] };
    const suggestions = await getIcebreaker(dummyMe, match.user);
    setIcebreakers(suggestions);
    setLoadingAI(false);
  };

  return (
    <div className="flex flex-col h-full bg-gray-50">
      {/* Header */}
      <div className="bg-white p-4 flex items-center gap-4 border-b sticky top-0 z-10">
        <button onClick={onBack} className="text-gray-500 hover:text-rose-500 transition-colors">
          <ChevronLeft size={24} />
        </button>
        <img src={match.user.photos[0]} alt={match.user.name} className="w-10 h-10 rounded-full object-cover" />
        <div>
          <h3 className="font-bold text-gray-900 leading-tight">{match.user.name}</h3>
          <span className="text-xs text-green-500 font-medium">En ligne</span>
        </div>
      </div>

      {/* Messages */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {match.messages.length === 0 && (
          <div className="text-center p-8">
            <p className="text-gray-400 text-sm mb-4">C'est le début d'une belle histoire...</p>
            <button 
              onClick={generateIcebreakers}
              disabled={loadingAI}
              className="inline-flex items-center gap-2 bg-rose-50 text-rose-600 px-4 py-2 rounded-full text-sm font-semibold hover:bg-rose-100 transition-all"
            >
              {loadingAI ? <Loader2 size={16} className="animate-spin" /> : <Sparkles size={16} />}
              Besoin d'aide pour l'accroche ?
            </button>
          </div>
        )}
        
        {match.messages.map(msg => (
          <div 
            key={msg.id} 
            className={`flex ${msg.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
              msg.senderId === 'me' 
                ? 'bg-rose-500 text-white rounded-tr-none' 
                : 'bg-white text-gray-800 rounded-tl-none border shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {icebreakers.length > 0 && (
          <div className="bg-white border-2 border-dashed border-rose-200 p-4 rounded-2xl space-y-2">
            <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider mb-2 flex items-center gap-1">
              <Sparkles size={12} /> Suggestions de l'IA
            </h4>
            {icebreakers.map((text, idx) => (
              <button 
                key={idx}
                onClick={() => setInputText(text)}
                className="block w-full text-left text-sm p-2 hover:bg-rose-50 rounded-lg transition-colors border border-transparent hover:border-rose-100"
              >
                "{text}"
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 bg-white border-t">
        <div className="flex gap-2 items-center">
          <input 
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Écrivez votre message..."
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-500"
          />
          <button 
            onClick={handleSend}
            disabled={!inputText.trim()}
            className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center text-white disabled:opacity-50 disabled:bg-gray-300 transition-all"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatDetail;
