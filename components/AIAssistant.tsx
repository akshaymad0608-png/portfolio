import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, ChevronRight, Smile } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';
import { AI_SYSTEM_INSTRUCTION } from '../constants';

const SUGGESTED_QUESTIONS = [
  "What is your experience with RAG?",
  "Tell me about your marketing agent.",
  "How do you handle hallucination?",
  "Are you available for freelance?"
];

const EMOJIS = ["👋", "👍", "👎", "🔥", "🚀", "💻", "🤖", "🧠", "✨", "💯", "✅", "🛑", "🎉", "🤝", "💡", "⚡"];

const AIAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([
    { role: 'assistant', text: "Greetings. I am Akshay's digital twin. My neural network is primed with his professional history. How can I assist your inquiry?" }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isLoading, isOpen]);

  const handleChat = async (textInput: string) => {
    if (!textInput.trim() || isLoading) return;

    const userMessage = textInput.trim();
    setInput('');
    setShowEmojiPicker(false);
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [...messages, { role: 'user', text: userMessage }].map(m => m.text).join('\n'),
        config: {
          systemInstruction: AI_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        }
      });

      const aiText = response.text || "Connection interrupted. Realigning sat-link...";
      setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', text: "Error: Neural link unstable. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleChat(input);
  };

  const addEmoji = (emoji: string) => {
    setInput(prev => prev + emoji);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: "bottom right" }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 md:bottom-20 right-0 w-[calc(100vw-48px)] max-w-[420px] h-[600px] max-h-[75vh] bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl flex flex-col overflow-hidden ring-1 ring-white/5"
          >
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-slate-900 to-slate-800 border-b border-white/5 flex justify-between items-center relative overflow-hidden">
              <div className="absolute inset-0 bg-electric/5 pointer-events-none" />
              <div className="flex items-center gap-3 relative z-10">
                <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-electric/20 to-blue-600/20 flex items-center justify-center text-electric border border-electric/30">
                        <Bot size={20} />
                    </div>
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-slate-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-wide">AKSHAY_V2.0</h4>
                  <div className="flex items-center gap-1.5 opacity-60">
                     <span className="text-[10px] text-electric font-mono uppercase">System Online</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)} 
                aria-label="Close chat"
                className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-white/5 transition-colors relative z-10"
              >
                <X size={20} />
              </button>
            </div>

            {/* Messages Area */}
            <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-6 scroll-smooth bg-gradient-to-b from-transparent to-black/20">
              {messages.map((m, i) => (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={i} 
                    className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] rounded-2xl p-4 text-sm leading-relaxed shadow-lg ${
                    m.role === 'user' 
                      ? 'bg-electric text-midnight font-semibold rounded-tr-none' 
                      : 'bg-white/5 text-slate-200 border border-white/5 rounded-tl-none backdrop-blur-md'
                  }`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
              
              {isLoading && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none border border-white/5 flex items-center gap-2">
                    <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-electric rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </motion.div>
              )}

                {/* Suggested Questions */}
                {messages.length < 3 && !isLoading && (
                    <div className="grid grid-cols-1 gap-2 mt-4">
                        <p className="text-xs text-slate-500 font-mono mb-2 ml-1">QUICK_ACCESS_PROTOCOLS:</p>
                        {SUGGESTED_QUESTIONS.map((q, idx) => (
                            <button
                                key={idx}
                                onClick={() => handleChat(q)}
                                aria-label={`Ask: ${q}`}
                                className="text-left text-xs text-slate-300 hover:text-electric bg-white/5 hover:bg-white/10 border border-white/5 hover:border-electric/30 rounded-lg p-3 transition-all flex items-center justify-between group"
                            >
                                {q} <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="p-4 bg-slate-900 border-t border-white/5 backdrop-blur-md relative z-20">
               {/* Emoji Picker Popover */}
               <AnimatePresence>
                 {showEmojiPicker && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10, scale: 0.9 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.9 }}
                      className="absolute bottom-20 left-4 p-3 bg-slate-800 border border-white/10 rounded-2xl shadow-xl grid grid-cols-8 gap-1 z-30 w-72"
                    >
                        {EMOJIS.map(e => (
                            <button 
                                key={e} 
                                type="button" 
                                onClick={() => addEmoji(e)} 
                                aria-label={`Add ${e} emoji`}
                                className="text-xl hover:bg-white/10 p-2 rounded transition-colors flex items-center justify-center"
                            >
                                {e}
                            </button>
                        ))}
                    </motion.div>
                 )}
               </AnimatePresence>

              <form onSubmit={onSubmit} className="relative flex items-center gap-2">
                <button
                    type="button"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    aria-label="Toggle emoji picker"
                    className={`p-3 rounded-xl transition-colors ${showEmojiPicker ? 'bg-electric text-midnight' : 'bg-white/5 hover:bg-white/10 text-slate-400 hover:text-electric'}`}
                >
                    <Smile size={20} />
                </button>
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Initiate dialogue..."
                  aria-label="Chat input"
                  className="flex-grow bg-black/20 border border-white/10 rounded-xl py-3.5 pl-4 pr-12 text-sm text-white focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/50 transition-all placeholder:text-slate-600"
                />
                <button 
                  type="submit" 
                  disabled={isLoading || !input.trim()}
                  aria-label="Send message"
                  className="absolute right-2 p-2 bg-electric/10 text-electric rounded-lg hover:bg-electric hover:text-midnight disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-electric transition-all"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close AI Assistant" : "Open AI Assistant"}
        aria-expanded={isOpen}
        className="group relative w-12 h-12 md:w-16 md:h-16 rounded-full bg-slate-900 border border-white/10 shadow-[0_0_20px_rgba(0,240,255,0.2)] flex items-center justify-center overflow-hidden transition-all hover:border-electric/50"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-electric/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <AnimatePresence mode="wait">
            {isOpen ? (
                <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                    <X className="text-white w-6 h-6 md:w-7 md:h-7" />
                </motion.div>
            ) : (
                <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} className="relative flex items-center justify-center">
                    <MessageSquare className="text-electric w-6 h-6 md:w-7 md:h-7" />
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 md:w-3 md:h-3 bg-red-500 rounded-full border-2 border-slate-900 animate-pulse" />
                </motion.div>
            )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AIAssistant;