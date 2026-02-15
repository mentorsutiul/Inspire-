
import React from 'react';
import { Quote } from '../types';
import { Heart, Share2, Copy, Check } from 'lucide-react';

interface QuoteCardProps {
  quote: Quote;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  darkMode: boolean;
}

const QuoteCard: React.FC<QuoteCardProps> = ({ quote, isFavorite, onToggleFavorite, darkMode }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Motivação do Dia',
          text: `"${quote.text}" — ${quote.author}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing', err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <div className={`p-6 sm:p-8 rounded-2xl shadow-sm border transition-all duration-300 ${
      darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'
    } hover:shadow-md group`}>
      <div className="flex flex-col gap-6">
        <div className="relative">
          <span className="absolute -top-6 -left-2 text-7xl opacity-10 font-serif italic pointer-events-none">"</span>
          <p className="font-quote text-lg sm:text-xl md:text-2xl font-normal leading-relaxed italic z-10 relative">
            {quote.text}
          </p>
        </div>
        
        <div className="flex flex-wrap justify-between items-center gap-4 mt-2 pt-4 border-t border-slate-100 dark:border-slate-700">
          <p className={`text-xs sm:text-sm font-semibold tracking-wide uppercase ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
            — {quote.author}
          </p>
          
          <div className="flex items-center gap-1 sm:gap-2">
            <button 
              onClick={handleCopy}
              className={`p-2.5 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
              title="Copiar"
            >
              {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
            </button>
            <button 
              onClick={handleShare}
              className={`p-2.5 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
              title="Compartilhar"
            >
              <Share2 size={18} />
            </button>
            <button 
              onClick={() => onToggleFavorite(quote.id)}
              className={`p-2.5 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-700' : 'hover:bg-slate-100'}`}
              title="Favoritar"
            >
              <Heart 
                size={18} 
                className={isFavorite ? 'fill-rose-500 text-rose-500' : ''} 
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteCard;
