
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Home, 
  Heart, 
  Settings, 
  ChevronLeft, 
  Moon, 
  Sun,
  Sparkles,
  Search,
  X,
  Info,
  ShieldCheck,
  FileText,
  Share2,
  Mail,
  ExternalLink,
  Bell,
  Zap,
  Target,
  Award,
  Bookmark,
  Scale,
  Lock,
  Cpu,
  EyeOff,
  Database,
  CheckCircle2
} from 'lucide-react';
import { View, Category, Quote } from './types';
import { CATEGORIES, INITIAL_QUOTES } from './constants';
import QuoteCard from './components/QuoteCard';
import { getDailyQuote } from './services/geminiService';

const SearchBar = ({ placeholder, value, onChange, onClear, darkMode }: any) => (
  <div className="relative flex items-center w-full group">
    <div className={`absolute left-5 z-20 pointer-events-none transition-colors ${darkMode ? 'text-slate-300 group-focus-within:text-indigo-400' : 'text-slate-400 group-focus-within:text-indigo-500'}`}>
      <Search size={22} strokeWidth={2.5} />
    </div>
    <input 
      type="text" 
      placeholder={placeholder} 
      className={`w-full pl-14 pr-12 py-5 rounded-[1.5rem] border-2 outline-none transition-all text-base sm:text-lg relative z-10 ${
        darkMode 
          ? 'bg-slate-800/60 border-slate-700/50 text-white focus:border-indigo-500/50 backdrop-blur-md' 
          : 'bg-white/80 border-slate-100 focus:border-indigo-500 focus:shadow-xl focus:shadow-indigo-500/5 backdrop-blur-md shadow-sm'
      }`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
    {value && (
      <button onClick={onClear} className="absolute right-5 z-20 text-slate-400 hover:text-indigo-500 transition-colors">
        <X size={20} />
      </button>
    )}
  </div>
);

const SettingsItem = ({ icon, label, onClick, darkMode, isLast }: any) => (
  <button 
    onClick={onClick} 
    className={`w-full p-6 flex items-center justify-between transition-colors ${!isLast ? 'border-b dark:border-slate-700/50' : ''} ${darkMode ? 'hover:bg-slate-700/30' : 'hover:bg-slate-50'}`}
  >
    <div className="flex items-center gap-4">
      <div className={`p-2.5 rounded-xl ${darkMode ? 'bg-slate-700 text-slate-300' : 'bg-slate-100 text-slate-600'}`}>
        {icon}
      </div>
      <p className="font-bold text-slate-700 dark:text-slate-200">{label}</p>
    </div>
    <ExternalLink size={16} className="text-slate-400 opacity-50" />
  </button>
);

const FeatureBox = ({ icon, title, content, darkMode }: any) => (
  <div className={`p-8 rounded-[2rem] border space-y-3 transition-all ${darkMode ? 'bg-slate-900/40 border-slate-800 hover:border-indigo-500/30' : 'bg-slate-50 border-slate-100'}`}>
    <div className="p-3 bg-white dark:bg-slate-800 rounded-2xl w-fit shadow-sm">{icon}</div>
    <h4 className="font-black text-lg">{title}</h4>
    <p className="text-sm opacity-60 leading-relaxed">{content}</p>
  </div>
);

const NavButton = ({ active, icon, label, onClick, darkMode }: any) => (
  <button onClick={onClick} className={`flex flex-col items-center gap-1.5 transition-all px-6 py-2 rounded-2xl group relative ${active ? 'text-indigo-600' : darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
    <div className={`${active ? 'scale-110 -translate-y-1' : 'scale-100 group-hover:-translate-y-0.5'} transition-all duration-300`}>{icon}</div>
    <span className={`text-[10px] font-extrabold uppercase tracking-widest ${active ? 'opacity-100' : 'opacity-60'}`}>{label}</span>
    {active && <div className="absolute bottom-0 w-8 h-1 bg-indigo-600 rounded-full animate-in zoom-in" />}
  </button>
);

const App: React.FC = () => {
  const [isInitializing, setIsInitializing] = useState(true);
  const [view, setView] = useState<View>('home');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [quotes] = useState<Quote[]>(INITIAL_QUOTES);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [dailyQuote, setDailyQuote] = useState<Quote | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const sendPushNotification = useCallback((quote: Quote) => {
    if ('serviceWorker' in navigator && Notification.permission === 'granted') {
      navigator.serviceWorker.ready.then((registration) => {
        // Fix: Cast the options object to any to avoid TypeScript error regarding 'renotify' property which is valid in browsers but may be missing from types.
        registration.showNotification('Inspire+: Destaque de Hoje', {
          body: `"${quote.text}" — ${quote.author}`,
          icon: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
          badge: 'https://cdn-icons-png.flaticon.com/512/2583/2583344.png',
          tag: 'daily-quote',
          renotify: true
        } as any);
      });
    }
  }, []);

  const rotateDailyQuote = useCallback(async (force = false) => {
    const ROTATION_INTERVAL = 8 * 60 * 60 * 1000; // 8 horas
    const now = Date.now();
    const lastUpdate = parseInt(localStorage.getItem('last-quote-update') || '0');
    const savedQuote = localStorage.getItem('daily-quote-data');

    if (force || now - lastUpdate > ROTATION_INTERVAL || !savedQuote) {
      const q = await getDailyQuote();
      setDailyQuote(q);
      localStorage.setItem('daily-quote-data', JSON.stringify(q));
      localStorage.setItem('last-quote-update', now.toString());
      
      // Envia notificação se permitido
      if (Notification.permission === 'granted') {
        sendPushNotification(q);
      }
    } else {
      setDailyQuote(JSON.parse(savedQuote));
    }
  }, [sendPushNotification]);

  useEffect(() => {
    const savedFavs = localStorage.getItem('fav-quotes');
    if (savedFavs) setFavorites(JSON.parse(savedFavs));
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') setDarkMode(false);
    
    setNotificationsEnabled(Notification.permission === 'granted');

    const initialize = async () => {
      await rotateDailyQuote();
      setTimeout(() => setIsInitializing(false), 2000);
    };
    initialize();

    // Check periodically for rotation (if app left open)
    const interval = setInterval(rotateDailyQuote, 60000 * 5); // Check every 5 mins
    return () => clearInterval(interval);
  }, [rotateDailyQuote]);

  useEffect(() => {
    localStorage.setItem('fav-quotes', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    if (darkMode) {
      document.body.classList.add('bg-slate-900', 'text-white');
      document.body.classList.remove('bg-slate-50', 'text-slate-900');
    } else {
      document.body.classList.add('bg-slate-50', 'text-slate-900');
      document.body.classList.remove('bg-slate-900', 'text-white');
    }
  }, [darkMode]);

  const toggleNotifications = async () => {
    if (notificationsEnabled) {
      // Browser doesn't allow revoking via JS easily, so we just update state
      setNotificationsEnabled(false);
    } else {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationsEnabled(true);
        if (dailyQuote) sendPushNotification(dailyQuote);
      }
    }
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(fid => fid !== id) : [...prev, id]
    );
  };

  const handleCategorySelect = (cat: Category) => {
    setSelectedCategory(cat);
    setSearchQuery('');
    setView('category');
    window.scrollTo(0, 0);
  };

  const handleGoHome = () => {
    setView('home');
    setSelectedCategory(null);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Inspire+ Motivação',
          text: 'Alcance sua melhor versão com o Inspire+! Baixe agora.',
          url: window.location.href,
        });
      } catch (err) {
        console.log('Erro ao compartilhar', err);
      }
    }
  };

  const filteredQuotes = quotes.filter(q => 
    (!selectedCategory || q.category === selectedCategory.id) &&
    (q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.author.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const favoriteQuotes = quotes.filter(q => favorites.includes(q.id));
  const filteredFavorites = favoriteQuotes.filter(q => 
    q.text.toLowerCase().includes(searchQuery.toLowerCase()) || q.author.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const GlobalHeader = () => (
    <header className={`sticky top-0 z-50 border-b px-6 py-5 mb-8 safe-top ${darkMode ? 'bg-slate-900/80 border-slate-800 backdrop-blur-xl' : 'bg-white/80 border-slate-100 backdrop-blur-xl'}`}>
      <div className="max-w-5xl mx-auto flex items-center justify-center relative min-h-[52px]">
        <div className="flex items-center cursor-pointer group" onClick={handleGoHome}>
          <span className={`font-black text-3xl sm:text-4xl md:text-5xl tracking-tighter transition-all duration-300 group-hover:opacity-80 ${darkMode ? 'text-white' : 'text-slate-900'}`}>
            Inspire<span className="text-indigo-600">+</span>
          </span>
        </div>
        <div className="absolute right-0">
          <button onClick={() => setDarkMode(!darkMode)} className={`p-2.5 rounded-2xl transition-all ${darkMode ? 'bg-slate-800 text-amber-400 shadow-inner' : 'bg-slate-100 text-slate-600 shadow-sm'}`}>
            {darkMode ? <Sun size={24} /> : <Moon size={24} />}
          </button>
        </div>
      </div>
    </header>
  );

  if (isInitializing) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-900 text-white overflow-hidden p-6 text-center">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-600/20 blur-[120px] rounded-full animate-pulse delay-700" />
        <div className="relative z-10 flex flex-col items-center animate-in fade-in zoom-in duration-1000">
          <div className="mb-8 p-6 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-violet-700 shadow-2xl shadow-indigo-500/20 ring-4 ring-white/10">
            <Zap size={64} className="text-white fill-white/20" strokeWidth={1.5} />
          </div>
          <h1 className="text-6xl font-black tracking-tighter text-white mb-2">
            Inspire<span className="text-indigo-500">+</span>
          </h1>
          <p className="text-indigo-300/60 font-medium tracking-[0.3em] uppercase text-[10px] mb-12">
            Sua dose diária de coragem
          </p>
          <div className="w-48 h-1 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 rounded-full animate-progress" />
          </div>
        </div>
        <style>{`
          @keyframes progress { 0% { width: 0%; } 100% { width: 100%; } }
          .animate-progress { animation: progress 2s ease-in-out forwards; }
        `}</style>
      </div>
    );
  }

  const renderHome = () => (
    <>
      <GlobalHeader />
      <div className="max-w-5xl mx-auto px-6 space-y-10 animate-in fade-in duration-500">
        <SearchBar darkMode={darkMode} placeholder="O que você precisa ler hoje?" value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery('')} />
        {searchQuery === '' ? (
          <>
            <section className="space-y-6">
              <div className="px-1 text-center sm:text-left">
                <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">Explorar Categorias</h2>
                <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-1">Sua jornada diária de foco e evolução</p>
              </div>
              <div className="grid grid-cols-2 gap-4 sm:gap-6">
                {CATEGORIES.map(cat => (
                  <div key={cat.id} className="animated-border-wrapper">
                    <div className={`border-anim anim-${cat.id}`}></div>
                    <button onClick={() => handleCategorySelect(cat)} className={`inner-card p-6 sm:p-8 text-left transition-all ${darkMode ? 'dark-glass hover:bg-slate-800/95' : 'glass hover:bg-white/95'}`}>
                      <div className={`mb-4 sm:mb-6 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${cat.color} text-xl sm:text-2xl text-white shadow-lg`}>
                        <span className="drop-shadow-md">{cat.icon}</span>
                      </div>
                      <h3 className="font-bold text-lg sm:text-xl mb-1">{cat.name}</h3>
                      <p className={`text-[10px] sm:text-sm leading-relaxed line-clamp-2 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>{cat.description}</p>
                    </button>
                  </div>
                ))}
              </div>
            </section>
            <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-800 p-5 sm:p-6 text-white shadow-lg">
              <div className="relative z-10 flex flex-col items-center sm:items-start gap-4 text-center sm:text-left">
                <div className="space-y-3 max-w-2xl w-full">
                  <div className="inline-flex items-center gap-2 bg-white/15 px-3 py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
                    <Sparkles size={14} className="text-indigo-200" /> Destaque de Hoje (A cada 8h)
                  </div>
                  {dailyQuote ? (
                    <div className="space-y-2">
                      <p className="font-quote text-base sm:text-lg md:text-xl font-normal leading-snug italic text-indigo-50">"{dailyQuote.text}"</p>
                      <p className="text-[10px] sm:text-xs font-medium text-indigo-200/80 tracking-wide">— {dailyQuote.author}</p>
                    </div>
                  ) : (
                    <div className="space-y-2 animate-pulse w-full">
                      <div className="h-5 w-3/4 bg-white/10 rounded-lg mx-auto sm:mx-0"></div>
                      <div className="h-5 w-1/2 bg-white/10 rounded-lg mx-auto sm:mx-0"></div>
                    </div>
                  )}
                  <div className="flex justify-center sm:justify-start pt-1">
                    <button onClick={() => dailyQuote && toggleFavorite(dailyQuote.id)} className="flex items-center gap-2 bg-white text-indigo-800 px-5 py-2.5 rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all hover:scale-105 active:scale-95 shadow-md mx-auto sm:mx-0">
                      <Heart size={16} className={dailyQuote && favorites.includes(dailyQuote.id) ? 'fill-rose-500 text-rose-500' : ''} />
                      {dailyQuote && favorites.includes(dailyQuote.id) ? 'Favoritado' : 'Salvar na Coleção'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </>
        ) : (
          <section className="space-y-6">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">Resultados da Busca</h2>
              <p className="text-sm text-slate-500">{filteredQuotes.length} encontrados</p>
            </div>
            <div className="grid gap-6">
              {filteredQuotes.length > 0 ? filteredQuotes.slice(0, 20).map(q => (
                <QuoteCard key={q.id} quote={q} isFavorite={favorites.includes(q.id)} onToggleFavorite={toggleFavorite} darkMode={darkMode} />
              )) : (
                <div className="text-center py-24 bg-slate-50/50 dark:bg-slate-800/30 rounded-3xl border border-dashed border-slate-200 dark:border-slate-700">
                  <Search size={48} className="mx-auto text-slate-300 mb-4" />
                  <p className="text-xl font-medium text-slate-500">Nenhum resultado para sua busca.</p>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );

  const renderCategory = () => (
    <div className="max-w-5xl mx-auto px-6 pt-10 space-y-8 animate-in slide-in-from-right-4 duration-500 safe-top">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button onClick={handleGoHome} className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
            <ChevronLeft size={24} />
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              <span className={`bg-gradient-to-br ${selectedCategory?.color} bg-clip-text text-transparent`}>{selectedCategory?.name}</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-0.5">{selectedCategory?.description}</p>
          </div>
        </div>
      </div>
      <SearchBar darkMode={darkMode} placeholder={`Buscar em ${selectedCategory?.name}...`} value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery('')} />
      <div className="grid gap-6">
        {filteredQuotes.map(q => <QuoteCard key={q.id} quote={q} isFavorite={favorites.includes(q.id)} onToggleFavorite={toggleFavorite} darkMode={darkMode} />)}
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="max-w-5xl mx-auto px-6 pt-10 space-y-10 animate-in slide-in-from-bottom-4 duration-500 safe-top">
      <div className="px-1">
        <h1 className="text-3xl sm:text-4xl font-extrabold">Ajustes</h1>
        <p className={`text-sm mt-1 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>Gerencie suas preferências e informações do app</p>
      </div>
      <div className="space-y-4">
        <h2 className={`text-xs font-black uppercase tracking-[0.2em] px-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Preferências</h2>
        <div className={`rounded-[2rem] border overflow-hidden ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
          <div className="p-6 flex items-center justify-between border-b dark:border-slate-700/50">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-2xl">{darkMode ? <Moon size={22} /> : <Sun size={22} />}</div>
              <div>
                <p className="font-bold text-lg">Modo Escuro</p>
                <p className="text-sm text-slate-500">Otimize para ambientes escuros</p>
              </div>
            </div>
            <button onClick={() => setDarkMode(!darkMode)} className={`w-14 h-8 rounded-full transition-all relative outline-none border-2 ${darkMode ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-200 border-slate-100'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${darkMode ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
          <div className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-600 rounded-2xl"><Bell size={22} /></div>
              <div>
                <p className="font-bold text-lg">Notificações</p>
                <p className="text-sm text-slate-500">Receba destaque a cada 8h</p>
              </div>
            </div>
            <button onClick={toggleNotifications} className={`w-14 h-8 rounded-full transition-all relative outline-none border-2 ${notificationsEnabled ? 'bg-indigo-600 border-indigo-500' : 'bg-slate-200 border-slate-100'}`}>
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${notificationsEnabled ? 'left-7' : 'left-1'}`} />
            </button>
          </div>
        </div>
        <h2 className={`text-xs font-black uppercase tracking-[0.2em] pt-4 px-1 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>Aplicativo</h2>
        <div className={`rounded-[2rem] border overflow-hidden ${darkMode ? 'bg-slate-800/50 border-slate-700/50' : 'bg-white border-slate-100 shadow-sm'}`}>
          <SettingsItem icon={<Info size={20} />} label="Sobre o Inspire+" onClick={() => setView('about')} darkMode={darkMode} />
          <SettingsItem icon={<FileText size={20} />} label="Termos de Uso" onClick={() => setView('terms')} darkMode={darkMode} />
          <SettingsItem icon={<ShieldCheck size={20} />} label="Privacidade" onClick={() => setView('privacy')} darkMode={darkMode} />
          <SettingsItem icon={<Share2 size={20} />} label="Compartilhar App" onClick={handleShareApp} darkMode={darkMode} />
          <SettingsItem icon={<Mail size={20} />} label="Suporte & Feedback" onClick={() => window.location.href = 'mailto:suporte@inspireplus.com'} darkMode={darkMode} isLast />
        </div>
      </div>
      <div className="text-center py-4">
        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Versão 1.1.0</p>
        <p className="text-[10px] text-slate-500 mt-1">Desenvolvido com foco na sua evolução diária.</p>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 space-y-12 animate-in slide-in-from-right-4 safe-top">
      <button onClick={() => setView('settings')} className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
        <ChevronLeft size={20} /> Painel de Ajustes
      </button>
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tighter">Sobre o Inspire+</h1>
        <p className={`text-xl leading-relaxed ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>
          O Inspire+ é o seu companheiro diário projetado para potencializar o desenvolvimento pessoal e profissional.
        </p>
      </div>
      <div className={`p-10 rounded-[2.5rem] border space-y-8 ${darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-white border-slate-200 shadow-sm'}`}>
        <p className="text-lg leading-relaxed opacity-80">
          Nossa missão é fornecer doses diárias de motivação e sabedoria, ajudando você a manter o foco, a resiliência e a clareza mental necessários para alcançar seus objetivos mais ambiciosos. 
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <FeatureBox icon={<Target className="text-indigo-500" />} title="Propósito" content="Foco total nos seus objetivos de vida." darkMode={darkMode} />
        <FeatureBox icon={<Award className="text-indigo-500" />} title="Excelência" content="Curadoria de alto nível e qualidade." darkMode={darkMode} />
        <FeatureBox icon={<Bookmark className="text-indigo-500" />} title="Coleção" content="Salve o que realmente te inspira." darkMode={darkMode} />
      </div>
      <div className="text-center pt-8 border-t border-slate-700/50">
        <p className="text-xs font-bold opacity-30 uppercase tracking-[0.3em]">© 2026 Inspire+ Digital Solutions. <br/> Versão 1.1.0</p>
      </div>
    </div>
  );

  const renderTerms = () => (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 space-y-12 animate-in slide-in-from-right-4 safe-top">
      <button onClick={() => setView('settings')} className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
        <ChevronLeft size={20} /> Voltar para Ajustes
      </button>
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tighter">Termos de Uso</h1>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-indigo-500">Versão 1.1 - Atualizado em Março de 2026</p>
      </div>
      <div className={`prose prose-slate dark:prose-invert max-w-none p-12 rounded-[3.5rem] border shadow-2xl ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="space-y-10">
          <section className="space-y-4">
            <h3 className="text-2xl font-black flex items-center gap-3"><Scale size={24} className="text-indigo-500" /> 1. Licença de Uso</h3>
            <p className="opacity-70 text-lg">Ao utilizar o Inspire+, você recebe uma licença pessoal apenas para fins de inspiração.</p>
          </section>
          <section className="space-y-4">
            <h3 className="text-2xl font-black flex items-center gap-3"><Lock size={24} className="text-indigo-500" /> 2. Propriedade Intelectual</h3>
            <p className="opacity-70 text-lg">Todos os direitos autorais relacionados ao Inspire+ são de propriedade exclusiva da Inspire+ Digital Solutions.</p>
          </section>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-slate-700/50">
        <p className="text-xs font-bold opacity-30 uppercase tracking-[0.3em]">© 2026 Inspire+ Digital Solutions. <br/> Versão 1.1.0</p>
      </div>
    </div>
  );

  const renderPrivacy = () => (
    <div className="max-w-4xl mx-auto px-6 pt-10 pb-20 space-y-12 animate-in slide-in-from-right-4 safe-top">
      <button onClick={() => setView('settings')} className="flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
        <ChevronLeft size={20} /> Painel de Privacidade
      </button>
      <div className="space-y-6">
        <h1 className="text-5xl font-black tracking-tighter">Sua Privacidade</h1>
        <p className="text-sm font-black uppercase tracking-[0.2em] text-emerald-500 flex items-center gap-3"><ShieldCheck size={20} /> Em conformidade com a LGPD</p>
      </div>
      <div className={`p-12 rounded-[3.5rem] border space-y-16 shadow-2xl ${darkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-white border-slate-100'}`}>
        <div className="space-y-6">
          <h3 className="text-3xl font-black flex items-center gap-4"><EyeOff className="text-emerald-500" /> Coleta Zero</h3>
          <p className="opacity-70 leading-relaxed text-xl">O Inspire+ não solicita e-mail ou dados pessoais. Você é anônimo.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className={`p-8 rounded-[2.5rem] ${darkMode ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
            <div className="text-indigo-500 mb-4"><Database size={28} /></div>
            <h4 className="font-black text-xl mb-3">Local Storage</h4>
            <p className="text-sm opacity-60">Seus favoritos nunca saem do seu dispositivo.</p>
          </div>
          <div className={`p-8 rounded-[2.5rem] ${darkMode ? 'bg-slate-900/40' : 'bg-slate-50'}`}>
            <div className="text-indigo-500 mb-4"><Cpu size={28} /></div>
            <h4 className="font-black text-xl mb-3">IA Anônima</h4>
            <p className="text-sm opacity-60">As solicitações para o Gemini não contêm metadados seus.</p>
          </div>
        </div>
      </div>
      <div className="text-center pt-8 border-t border-slate-700/50">
        <p className="text-xs font-bold opacity-30 uppercase tracking-[0.3em]">© 2026 Inspire+ Digital Solutions. <br/> Versão 1.1.0</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen pb-28 md:pb-32 bg-slate-900 transition-colors duration-300">
      <main className="safe-bottom">
        {view === 'home' && renderHome()}
        {view === 'category' && renderCategory()}
        {view === 'favorites' && (
          <div className="max-w-5xl mx-auto px-6 pt-10 space-y-8 animate-in slide-in-from-left-4 duration-500 safe-top">
            <h1 className="text-3xl sm:text-4xl font-extrabold px-1 text-white">Sua Coleção</h1>
            <SearchBar darkMode={darkMode} placeholder="Pesquisar nos favoritos..." value={searchQuery} onChange={setSearchQuery} onClear={() => setSearchQuery('')} />
            {filteredFavorites.length > 0 ? (
              <div className="grid gap-6">
                {filteredFavorites.map(q => <QuoteCard key={q.id} quote={q} isFavorite={true} onToggleFavorite={toggleFavorite} darkMode={darkMode} />)}
              </div>
            ) : (
              <div className="text-center py-32 bg-slate-800 rounded-[2.5rem] border border-slate-700 shadow-sm">
                <Heart size={48} className="mx-auto text-slate-500 mb-4" />
                <p className="text-xl font-bold text-slate-300">Coleção vazia</p>
                <button onClick={handleGoHome} className="mt-4 px-8 py-3 bg-indigo-600 text-white rounded-2xl font-bold hover:scale-105 active:scale-95 transition-all">Descobrir frases</button>
              </div>
            )}
          </div>
        )}
        {view === 'settings' && renderSettings()}
        {view === 'about' && renderAbout()}
        {view === 'terms' && renderTerms()}
        {view === 'privacy' && renderPrivacy()}
      </main>
      
      <nav className={`fixed bottom-0 inset-x-0 z-50 border-t py-4 px-8 safe-bottom ${darkMode ? 'bg-slate-900/95 border-slate-800 backdrop-blur-2xl' : 'bg-white/95 border-slate-200 backdrop-blur-2xl'}`}>
        <div className="max-w-xl mx-auto flex justify-between items-center">
          <NavButton active={view === 'home' || view === 'category'} icon={<Home size={24} />} label="Início" onClick={handleGoHome} darkMode={darkMode} />
          <NavButton active={view === 'favorites'} icon={<Heart size={24} />} label="Coleção" onClick={() => setView('favorites')} darkMode={darkMode} />
          <NavButton active={view === 'settings' || view === 'terms' || view === 'privacy' || view === 'about'} icon={<Settings size={24} />} label="Ajustes" onClick={() => setView('settings')} darkMode={darkMode} />
        </div>
      </nav>
    </div>
  );
};

export default App;
