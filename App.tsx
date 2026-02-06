
import React, { useState } from 'react';
import { AppTab, User, Match, Message } from './types';
import Discover from './components/Discover';
import ChatList from './components/ChatList';
import ChatDetail from './components/ChatDetail';
import AIWingman from './components/AIWingman';
import { Heart, MessageSquare, Sparkles, User as UserIcon } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<AppTab>(AppTab.DISCOVER);
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);

  const handleNewMatch = (user: User) => {
    // Check if already matched
    if (matches.find(m => m.user.id === user.id)) return;
    
    const newMatch: Match = {
      id: Math.random().toString(36).substr(2, 9),
      user: user,
      messages: []
    };
    setMatches(prev => [newMatch, ...prev]);
  };

  const handleSendMessage = (matchId: string, text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      senderId: 'me',
      text: text,
      timestamp: Date.now()
    };

    setMatches(prev => prev.map(m => {
      if (m.id === matchId) {
        return { ...m, messages: [...m.messages, newMessage] };
      }
      return m;
    }));

    if (selectedMatch?.id === matchId) {
      setSelectedMatch(prev => prev ? { ...prev, messages: [...prev.messages, newMessage] } : null);
    }
  };

  const renderContent = () => {
    if (selectedMatch && activeTab === AppTab.MATCHES) {
      return (
        <ChatDetail 
          match={selectedMatch} 
          onBack={() => setSelectedMatch(null)} 
          onSendMessage={handleSendMessage}
        />
      );
    }

    switch (activeTab) {
      case AppTab.DISCOVER:
        return <Discover onMatch={handleNewMatch} />;
      case AppTab.MATCHES:
        return <ChatList matches={matches} onSelectMatch={setSelectedMatch} />;
      case AppTab.AI_WINGMAN:
        return <AIWingman />;
      case AppTab.PROFILE:
        return (
          <div className="p-8 text-center bg-white h-full flex flex-col items-center justify-center">
            <div className="w-32 h-32 bg-rose-100 rounded-full flex items-center justify-center mb-6">
              <UserIcon size={64} className="text-rose-500" />
            </div>
            <h2 className="text-2xl font-bold">Votre Profil</h2>
            <p className="text-gray-500 mt-2">Section de gestion du profil en cours de développement.</p>
            <button className="mt-6 bg-rose-500 text-white px-8 py-3 rounded-full font-bold shadow-lg shadow-rose-200">
              Modifier mes préférences
            </button>
          </div>
        );
      default:
        return <Discover onMatch={handleNewMatch} />;
    }
  };

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-gray-50 shadow-2xl overflow-hidden relative border-x border-gray-100">
      {/* Main Content Area */}
      <main className="flex-1 overflow-hidden">
        {renderContent()}
      </main>

      {/* Navigation Bar - Only show if no chat detail is open */}
      {!(selectedMatch && activeTab === AppTab.MATCHES) && (
        <nav className="bg-white/80 backdrop-blur-md border-t border-gray-100 px-8 py-4 flex justify-between items-center z-20">
          <button 
            onClick={() => setActiveTab(AppTab.DISCOVER)}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === AppTab.DISCOVER ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Heart size={24} fill={activeTab === AppTab.DISCOVER ? "currentColor" : "none"} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Découvrir</span>
          </button>
          
          <button 
            onClick={() => { setActiveTab(AppTab.AI_WINGMAN); setSelectedMatch(null); }}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === AppTab.AI_WINGMAN ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <Sparkles size={24} fill={activeTab === AppTab.AI_WINGMAN ? "currentColor" : "none"} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Coach AI</span>
          </button>

          <button 
            onClick={() => setActiveTab(AppTab.MATCHES)}
            className={`flex flex-col items-center gap-1 transition-all relative ${activeTab === AppTab.MATCHES ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <MessageSquare size={24} fill={activeTab === AppTab.MATCHES ? "currentColor" : "none"} />
            {matches.length > 0 && (
               <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            )}
            <span className="text-[10px] font-bold uppercase tracking-widest">Matchs</span>
          </button>

          <button 
            onClick={() => { setActiveTab(AppTab.PROFILE); setSelectedMatch(null); }}
            className={`flex flex-col items-center gap-1 transition-all ${activeTab === AppTab.PROFILE ? 'text-rose-500 scale-110' : 'text-gray-400 hover:text-gray-600'}`}
          >
            <UserIcon size={24} fill={activeTab === AppTab.PROFILE ? "currentColor" : "none"} />
            <span className="text-[10px] font-bold uppercase tracking-widest">Profil</span>
          </button>
        </nav>
      )}
    </div>
  );
};

export default App;
