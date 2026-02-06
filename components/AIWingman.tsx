
import React, { useState } from 'react';
import { Sparkles, MessageCircle, Heart, Star, Send, Loader2 } from 'lucide-react';
import { getDatingAdvice } from '../services/gemini';

const AIWingman: React.FC = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const askCoach = async (q: string) => {
    setLoading(true);
    const response = await getDatingAdvice(q);
    setAnswer(response || "Je n'ai pas pu générer de conseil pour le moment.");
    setLoading(false);
  };

  const predefinedPrompts = [
    "Comment rédiger une bio attirante ?",
    "Quels sont les signes d'un bon match ?",
    "Idées de premier rendez-vous original",
    "Conseils pour gérer le stress du 1er RDV"
  ];

  return (
    <div className="p-6 bg-gradient-to-b from-rose-50 to-white min-h-full">
      <div className="max-w-md mx-auto space-y-8">
        <header className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-2xl shadow-xl shadow-rose-100 mb-2">
            <Sparkles className="text-rose-500" size={32} />
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Coach AmeSœur</h1>
          <p className="text-gray-500">Votre IA pour des relations saines et durables.</p>
        </header>

        {!answer ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-3">
              {predefinedPrompts.map(p => (
                <button 
                  key={p}
                  onClick={() => askCoach(p)}
                  className="bg-white p-4 rounded-xl border border-rose-100 text-left hover:border-rose-400 hover:bg-rose-50 transition-all flex items-center justify-between group"
                >
                  <span className="text-gray-700 font-medium">{p}</span>
                  <MessageCircle size={18} className="text-rose-300 group-hover:text-rose-500" />
                </button>
              ))}
            </div>

            <div className="relative">
              <textarea 
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Posez votre propre question..."
                className="w-full bg-white border border-rose-100 rounded-2xl p-4 pr-12 h-32 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all shadow-sm"
              />
              <button 
                onClick={() => askCoach(question)}
                disabled={loading || !question.trim()}
                className="absolute bottom-4 right-4 bg-rose-500 text-white p-2 rounded-xl hover:bg-rose-600 disabled:opacity-50 transition-all"
              >
                {loading ? <Loader2 className="animate-spin" size={20} /> : <Send size={20} />}
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-3xl shadow-xl border border-rose-50 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="flex items-center gap-2 text-rose-500 font-bold mb-2">
              <Star size={18} fill="currentColor" />
              <span>Réponse de votre Coach</span>
            </div>
            <div className="text-gray-700 leading-relaxed prose prose-rose whitespace-pre-wrap">
              {answer}
            </div>
            <button 
              onClick={() => { setAnswer(null); setQuestion(''); }}
              className="w-full bg-gray-100 text-gray-600 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all mt-4"
            >
              Poser une autre question
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-2xl border border-rose-50 flex flex-col items-center text-center">
            <Heart className="text-rose-500 mb-2" size={24} />
            <h3 className="font-bold text-sm">Amour Durable</h3>
            <p className="text-[10px] text-gray-400">Conseils pour le long terme</p>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-rose-50 flex flex-col items-center text-center">
            <MessageCircle className="text-rose-500 mb-2" size={24} />
            <h3 className="font-bold text-sm">Communication</h3>
            <p className="text-[10px] text-gray-400">Apprendre à s'écouter</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIWingman;
