
import React, { useState } from 'react';
import { User, Goal } from '../types';
import { MOCK_USERS, GOAL_LABELS } from '../constants';
import { Heart, X, MapPin, Briefcase, Info } from 'lucide-react';

interface DiscoverProps {
  onMatch: (user: User) => void;
}

const Discover: React.FC<DiscoverProps> = ({ onMatch }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const currentUser = MOCK_USERS[currentIndex];

  const nextUser = () => {
    if (currentIndex < MOCK_USERS.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setCurrentIndex(0); // Loop for demo
    }
  };

  const handleLike = () => {
    onMatch(currentUser);
    nextUser();
  };

  if (!currentUser) return <div className="p-8 text-center">Plus de profils pour le moment !</div>;

  return (
    <div className="flex flex-col h-full bg-white max-w-md mx-auto relative overflow-hidden shadow-2xl rounded-3xl">
      {/* Profile Photo */}
      <div className="relative h-[70%] w-full">
        <img 
          src={currentUser.photos[0]} 
          alt={currentUser.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold">{currentUser.name}, {currentUser.age}</h2>
              <div className="flex items-center gap-2 mt-1 opacity-90">
                <MapPin size={16} />
                <span className="text-sm">{currentUser.location}</span>
              </div>
            </div>
            <button className="bg-white/20 p-2 rounded-full backdrop-blur-md">
              <Info size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Details Area */}
      <div className="flex-1 p-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <span className="bg-rose-100 text-rose-600 px-3 py-1 rounded-full text-sm font-medium">
            {GOAL_LABELS[currentUser.goal]}
          </span>
          {currentUser.job && (
            <div className="flex items-center gap-1 bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
              <Briefcase size={14} />
              <span>{currentUser.job}</span>
            </div>
          )}
        </div>
        
        <p className="text-gray-600 line-clamp-2 italic">"{currentUser.bio}"</p>

        <div className="flex flex-wrap gap-2">
          {currentUser.interests.map(interest => (
            <span key={interest} className="text-xs border border-gray-200 px-2 py-1 rounded-md text-gray-500">
              #{interest}
            </span>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-6 px-6">
        <button 
          onClick={nextUser}
          className="w-16 h-16 bg-white shadow-lg rounded-full flex items-center justify-center text-gray-400 hover:text-gray-600 transition-transform active:scale-95"
        >
          <X size={32} />
        </button>
        <button 
          onClick={handleLike}
          className="w-16 h-16 bg-rose-500 shadow-lg shadow-rose-200 rounded-full flex items-center justify-center text-white hover:bg-rose-600 transition-transform active:scale-95"
        >
          <Heart size={32} fill="currentColor" />
        </button>
      </div>
    </div>
  );
};

export default Discover;
