
import React from 'react';
import { Match } from '../types';
import { Search } from 'lucide-react';

interface ChatListProps {
  matches: Match[];
  onSelectMatch: (match: Match) => void;
}

const ChatList: React.FC<ChatListProps> = ({ matches, onSelectMatch }) => {
  return (
    <div className="bg-white h-full flex flex-col">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold mb-4">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un match..." 
            className="w-full pl-10 pr-4 py-2 bg-gray-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        {matches.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400 px-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search size={32} />
            </div>
            <p>Pas encore de matchs. Allez découvrir de nouveaux profils !</p>
          </div>
        ) : (
          <div className="divide-y">
            {matches.map(match => (
              <button 
                key={match.id}
                onClick={() => onSelectMatch(match)}
                className="w-full flex items-center gap-4 p-4 hover:bg-rose-50 transition-colors text-left"
              >
                <img 
                  src={match.user.photos[0]} 
                  alt={match.user.name} 
                  className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                />
                <div className="flex-1 overflow-hidden">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-semibold text-gray-900">{match.user.name}</h3>
                    <span className="text-xs text-gray-400">Maintenant</span>
                  </div>
                  <p className="text-sm text-gray-500 truncate">
                    {match.messages.length > 0 
                      ? match.messages[match.messages.length - 1].text 
                      : `Vous avez matché avec ${match.user.name} !`}
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatList;
