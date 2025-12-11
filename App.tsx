import React, { useState, useEffect } from 'react';
import { getCurriculum, UI_TEXT } from './constants';
import { CEFRLevel, Language, Topic, AppState } from './types';
import { ChatInterface } from './components/ChatInterface';
import { BookOpen, MessageCircle, ChevronRight, Globe, Sparkles, Linkedin, Instagram, Github } from 'lucide-react';

const HOME_BACKGROUND_IMAGE = "https://images.unsplash.com/photo-1511739001486-6bfe10ce7859?q=80&w=2000&auto=format&fit=crop"; // Eiffel Tower Sunset

const App = () => {
  const [state, setState] = useState<AppState>({
    currentView: 'HOME',
    selectedLevel: null,
    selectedTopic: null,
    uiLanguage: 'ES' // Default to Spanish as requested
  });

  const t = UI_TEXT[state.uiLanguage];
  // Dynamically fetch curriculum based on language state to ensure 100% strict separation
  const curriculum = getCurriculum(state.uiLanguage);

  const handleLevelSelect = (levelId: CEFRLevel) => {
    setState(prev => ({
      ...prev,
      selectedLevel: levelId,
      currentView: 'LEVEL'
    }));
  };

  const handleTopicSelect = (topic: Topic) => {
    setState(prev => ({
      ...prev,
      selectedTopic: topic,
      currentView: 'TOPIC_CHAT'
    }));
  };

  const goHome = () => {
    setState(prev => ({
      ...prev,
      currentView: 'HOME',
      selectedLevel: null,
      selectedTopic: null
    }));
  };

  const goBackToLevel = () => {
    setState(prev => ({
      ...prev,
      currentView: 'LEVEL',
      selectedTopic: null
    }));
  };

  const toggleLanguage = () => {
    setState(prev => ({
      ...prev,
      uiLanguage: prev.uiLanguage === 'ES' ? 'EN' : 'ES'
    }));
  };

  // Helper to get current level data
  const currentLevelData = curriculum.find(l => l.id === state.selectedLevel);

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-slate-50">
      
      {/* Background Image - Only active on HOME view */}
      {state.currentView === 'HOME' && (
        <div className="fixed inset-0 z-0">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${HOME_BACKGROUND_IMAGE})` }}
          />
          {/* Overlay adjusted for better visibility of background (less opacity) */}
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px]"></div>
        </div>
      )}

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className={`${state.currentView === 'HOME' ? 'bg-transparent' : 'bg-white/80 backdrop-blur-md border-b border-slate-200/50'} sticky top-0 z-30 transition-all`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={goHome}>
              <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold shadow-sm group-hover:scale-105 transition-transform">
                F
              </div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hidden sm:block">
                  {t.appTitle.split(' ')[0]} 
                </h1>
                 {/* Flag */}
                 <img 
                    src="https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg" 
                    alt="France Flag" 
                    className="h-4 w-6 rounded-sm shadow-sm object-cover"
                  />
                 <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 hidden sm:block">
                  {t.appTitle.split(' ').slice(1).join(' ')}
                </h1>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {/* Language Toggle - Only visible on HOME */}
              {state.currentView === 'HOME' && (
                <button 
                  onClick={toggleLanguage}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/60 border border-slate-200 hover:bg-white transition-colors text-sm font-medium text-slate-800 shadow-sm backdrop-blur-sm"
                >
                  <Globe className="w-4 h-4" />
                  {state.uiLanguage}
                </button>
              )}
            </div>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8 flex-grow w-full">
          
          {/* VIEW: HOME */}
          {state.currentView === 'HOME' && (
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
              <div className="text-center mb-12 mt-8">
                <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight drop-shadow-sm">
                  {state.uiLanguage === 'ES' ? 'Domina el Francés.' : 'Master French.'}
                </h2>
                <p className="text-lg text-slate-800 max-w-2xl mx-auto font-medium">
                  {t.tagline}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                {curriculum.map((level) => (
                  <button
                    key={level.id}
                    onClick={() => handleLevelSelect(level.id)}
                    className="group relative bg-white/70 hover:bg-white/95 border border-white/60 hover:border-indigo-300 rounded-2xl p-6 shadow-sm hover:shadow-xl transition-all duration-300 text-left flex flex-col gap-4 overflow-hidden backdrop-blur-md"
                  >
                    <div className={`absolute top-0 right-0 w-24 h-24 -mr-8 -mt-8 rounded-full opacity-10 ${level.color}`}></div>
                    
                    <div className="flex items-start justify-between">
                      <div>
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold text-white mb-2 ${level.color}`}>
                          {level.id}
                        </span>
                        <h3 className="text-2xl font-bold text-slate-900 group-hover:text-indigo-700 transition-colors">
                          {level.title}
                        </h3>
                        <p className="text-sm font-bold text-slate-600 uppercase tracking-wide">
                          {t.levelDesc[level.id].split('.')[0]}
                        </p>
                      </div>
                      <BookOpen className="w-8 h-8 text-slate-500 group-hover:text-indigo-600 transition-colors" />
                    </div>
                    
                    <div className="pt-4 border-t border-slate-300/50 mt-auto">
                      <p className="text-slate-800 text-sm leading-relaxed font-medium">
                        {t.levelDesc[level.id].split('. ').slice(1).join('. ')}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: LEVEL TOPICS */}
          {state.currentView === 'LEVEL' && currentLevelData && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500">
              <div className="mb-8 flex items-center gap-4">
                <button onClick={goHome} className="p-2 hover:bg-white/50 rounded-full transition-colors">
                  <ChevronRight className="w-6 h-6 rotate-180 text-slate-500" />
                </button>
                <div>
                  <h2 className="text-3xl font-bold text-slate-900 flex items-center gap-3">
                    {currentLevelData.title}
                    <span className={`text-base px-3 py-1 rounded-full text-white ${currentLevelData.color}`}>
                      {currentLevelData.description}
                    </span>
                  </h2>
                  <p className="text-slate-500 mt-1 font-medium">{t.chooseLevel}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentLevelData.topics.map((topic, index) => (
                  <div 
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm hover:shadow-md hover:border-indigo-400 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 text-slate-500 font-bold flex items-center justify-center group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                        {index + 1}
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-slate-800 group-hover:text-indigo-700">
                          {topic.title}
                        </h3>
                        <p className="text-slate-600 text-sm mt-1">
                          {topic.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* VIEW: CHAT */}
          {state.currentView === 'TOPIC_CHAT' && state.selectedTopic && state.selectedLevel && (
            <div className="animate-in zoom-in-95 duration-300">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Context Panel */}
                <div className="lg:col-span-1 space-y-4">
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                    <button onClick={goBackToLevel} className="flex items-center text-sm text-slate-500 hover:text-indigo-600 mb-4 font-medium">
                      <ChevronRight className="w-4 h-4 rotate-180 mr-1" />
                      {t.back}
                    </button>
                    
                    <div className="mb-6">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-bold text-white mb-2 ${curriculum.find(l => l.id === state.selectedLevel)?.color}`}>
                        {state.selectedLevel}
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900 leading-tight">
                        {state.selectedTopic.title}
                      </h2>
                    </div>

                    <div className="space-y-4">
                      <div className="bg-indigo-50 p-4 rounded-xl border border-indigo-100">
                        <h4 className="text-xs font-bold text-indigo-800 uppercase tracking-wider mb-2 flex items-center gap-2">
                          <Sparkles className="w-3 h-3" />
                          {t.learningGoal}
                        </h4>
                        <p className="text-indigo-900 text-sm leading-relaxed">
                          {state.selectedTopic.objective}
                        </p>
                      </div>
                      
                      <p className="text-sm text-slate-600 italic">
                        {state.selectedTopic.description}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Chat Interface */}
                <div className="lg:col-span-2">
                  <ChatInterface 
                    level={state.selectedLevel}
                    topic={state.selectedTopic}
                    uiLanguage={state.uiLanguage}
                    onBack={goBackToLevel}
                  />
                </div>

              </div>
            </div>
          )}

        </main>

        {/* Footer */}
        <footer className={`${state.currentView === 'HOME' ? 'bg-white/60' : 'bg-white'} backdrop-blur border-t border-slate-200 py-6 mt-auto transition-colors`}>
          <div className="max-w-5xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-xs text-slate-500 font-medium">
                © All rights reserved Premier Media.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                This project was created by David Estrada 2026-2030.
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-slate-400 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-pink-600 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="px-4 py-1.5 bg-slate-800 text-white text-xs font-bold rounded-full hover:bg-slate-900 transition-colors"
              >
                Contact
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;