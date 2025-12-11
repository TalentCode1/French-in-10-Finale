import React, { useState, useEffect, useRef } from 'react';
import { Chat } from "@google/genai";
import { Send, User, Bot, AlertTriangle, RefreshCw } from 'lucide-react';
import { Topic, CEFRLevel, Language, ChatMessage } from '../types';
import { createChatSession, sendMessageToTutor } from '../services/geminiService';
import { UI_TEXT } from '../constants';

interface ChatInterfaceProps {
  level: CEFRLevel;
  topic: Topic;
  uiLanguage: Language;
  onBack: () => void;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({ level, topic, uiLanguage, onBack }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatSession, setChatSession] = useState<Chat | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initializedRef = useRef(false);

  const t = UI_TEXT[uiLanguage];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initChat = async () => {
      if (initializedRef.current) return;
      initializedRef.current = true;
      setIsLoading(true);
      try {
        const chat = await createChatSession(level, topic, uiLanguage);
        setChatSession(chat);
        
        // Initial greeting from AI
        // We trigger an empty prompt or a specific "INTRO" signal if needed, 
        // but often the system instruction allows the model to wait for user or we can force a 'Bonjour'.
        // Better UX: We send a hidden prompt to kickstart it.
        const response = await sendMessageToTutor(chat, "Bonjour! Please start the lesson according to your instructions.");
        
        setMessages([
          {
            id: 'init-1',
            role: 'model',
            text: response
          }
        ]);
      } catch (err) {
        setError("Failed to initialize AI Tutor. Please check API Key configuration.");
      } finally {
        setIsLoading(false);
      }
    };

    initChat();
  }, [level, topic, uiLanguage]);

  const handleSend = async () => {
    if (!input.trim() || !chatSession || isLoading) return;

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: input
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsLoading(true);

    try {
      const responseText = await sendMessageToTutor(chatSession, userMsg.text);
      const aiMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'model',
        text: responseText
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: "Erreur de connexion.", isError: true }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-red-50 rounded-xl border border-red-100">
        <AlertTriangle className="w-12 h-12 text-red-500 mb-4" />
        <h3 className="text-xl font-bold text-gray-800 mb-2">Error</h3>
        <p className="text-gray-600 mb-4">{error}</p>
        <button onClick={onBack} className="text-indigo-600 hover:underline">
          {t.back}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[600px] md:h-[700px] bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
      {/* Chat Header */}
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex items-center justify-between sticky top-0 z-10">
        <div>
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white">
              <Bot className="w-5 h-5" />
            </div>
            {t.tutorName} 
            <span className="text-xs px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full">{level}</span>
          </h2>
          <p className="text-xs text-slate-500 truncate max-w-[200px] md:max-w-md ml-10">{topic.title}</p>
        </div>
        <button 
          onClick={onBack}
          className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors px-3 py-1 bg-white border border-slate-200 rounded-lg hover:border-indigo-300 shadow-sm"
        >
          {t.back}
        </button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
        {messages.map((msg) => (
          <div 
            key={msg.id} 
            className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] md:max-w-[75%] gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-indigo-600' : 'bg-emerald-500'}`}>
                {msg.role === 'user' ? <User className="w-4 h-4 text-white" /> : <span className="text-white text-xs font-bold">D</span>}
              </div>
              <div 
                className={`p-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-tr-none' 
                    : 'bg-white text-slate-700 border border-slate-200 rounded-tl-none'
                } ${msg.isError ? 'border-red-500 bg-red-50 text-red-800' : ''}`}
              >
                {msg.text}
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start w-full">
            <div className="flex items-center gap-2 bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-slate-200 shadow-sm ml-10">
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-100">
        <div className="flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={t.chatPlaceholder}
            disabled={isLoading}
            className="flex-1 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 placeholder-slate-400"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md shadow-indigo-200"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
        <div className="text-center mt-2">
           <span className="text-[10px] text-slate-400">Powered by Gemini AI • Focused on {topic.title}</span>
        </div>
      </div>
    </div>
  );
};