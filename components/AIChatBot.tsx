import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquareText, X, Send, Bot, User } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

type Message = {
  id: string;
  sender: 'ai' | 'user';
  text: string;
};

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much does a project cost?",
  "How long does it take?",
  "What is your tech stack?",
  "Do you do consulting?"
];

const RESPONSES: Record<string, string> = {
  "What services do you offer?": "I specialize in Agentic AI solutions, Workflow Automation (n8n, Make), Full-Stack Web Development, and Prompt Engineering.",
  "How much does a project cost?": "Pricing depends on the scope. A basic workflow automation starts around $500, while complex custom AI agents and full web applications can range from $2,000 to $10,000+. Let's discuss your specific needs!",
  "How long does it take?": "Most AI agents take between 2 to 4 weeks from initial concept to deployment. This includes workflow design, prompt engineering, integration, and testing.",
  "What is your tech stack?": "My core stack includes React, Next.js, Node.js, Python, PostgreSQL, and integration with top LLMs like OpenAI, Gemini, and Anthropic. For workflow automation, I prefer n8n and Make.com.",
  "Do you do consulting?": "Yes! I offer strategic consulting to help businesses figure out how AI and automation can save them time and money. Schedule a call with me to explore possibilities."
};

const AIChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "ai",
      text: "Hi! I'm Akshay's AI Assistant. How can I help you today?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const responseText = RESPONSES[text] || "I'm a simplified AI preview! For detailed questions about your specific project, please use the WhatsApp button to chat with the real Akshay.";
      const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-4 sm:left-8 w-[calc(100vw-32px)] sm:w-[350px] max-h-[80vh] sm:max-h-[500px] border border-electric/30 bg-midnight/95 backdrop-blur-xl rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-electric/10 border-b border-white/10 px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-neonLime/50 rounded-full blur-[10px] animate-pulse" />
                  <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-neonLime relative overflow-hidden">
                    <img src={HERO_CONTENT.image} alt="Akshay" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-midnight rounded-full" />
                </div>
                <div>
                  <h4 className="text-white text-sm font-bold">Akshay's AI Clone</h4>
                  <p className="text-neonLime text-[10px] font-mono tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-neonLime animate-pulse" /> ONLINE
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[200px]">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-electric text-midnight rounded-br-sm' 
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 text-slate-200 p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto snap-x hide-scrollbar">
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap flex-shrink-0 text-xs border border-electric/30 bg-electric/5 text-electric px-4 py-2 rounded-full hover:bg-electric/20 transition-colors snap-start"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t border-white/10 bg-black/20">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask me anything..."
                  className="w-full bg-slate-900/50 border border-white/10 rounded-full pl-4 pr-12 py-3 text-[16px] text-white placeholder-slate-500 focus:outline-none focus:border-electric/50 focus:ring-1 focus:ring-electric/50 transition-all font-sans"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 text-electric disabled:text-slate-600 disabled:cursor-not-allowed hover:bg-electric/10 rounded-full transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 left-4 sm:left-8 bg-midnight border border-electric/30 text-white text-xs px-4 py-2 rounded-2xl shadow-[0_0_20px_rgba(0,240,255,0.2)] z-[90] flex items-center gap-2 cursor-pointer"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-neonLime animate-pulse" />
            Have a project? Ask my AI!
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-midnight border-b border-r border-electric/30 transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-4 sm:left-8 w-14 h-14 bg-midnight border border-electric rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.3)] z-[90] group hover:bg-electric transition-colors"
      >
        {isOpen ? (
          <X className="text-electric group-hover:text-midnight transition-colors" />
        ) : (
          <>
            <Bot className="text-electric group-hover:text-midnight transition-colors" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-midnight" />
          </>
        )}
      </motion.button>
    </>
  );
};

export default AIChatBot;
