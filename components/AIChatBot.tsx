import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot } from 'lucide-react';
import { HERO_CONTENT } from '../constants';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much does a project cost?",
  "Do you build AI Agents?",
  "What's your tech stack?"
];

const RESPONSES: Record<string, string> = {
  "What services do you offer?": "I specialize in building intelligent AI agents, custom automation workflows, and high-conversion web applications.",
  "How much does a project cost?": "Project costs depend on the complexity. Simple automations start around $500, while custom full-stack SaaS apps or advanced AI agents can range from $2,000 to $10,000+. Let's chat on WhatsApp to get a precise quote!",
  "Do you build AI Agents?": "Yes! I build autonomous AI agents using tools like LangChain, OpenAI, and custom Python/Node backends. They can handle customer support, lead generation, and complex data tasks.",
  "What's your tech stack?": "I build robust systems using React, Next.js, Node.js, Python, and PostgreSQL. For AI, I use OpenAI/Anthropic APIs, LangChain, and Pinecone. For workflow automation, I prefer n8n and Make.com.",
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

    setTimeout(() => {
      const responseText = RESPONSES[text] || "I'm a simplified AI preview! For detailed questions about your specific project, please use the WhatsApp button to chat with the real Akshay.";
      const aiMessage: Message = { id: (Date.now() + 1).toString(), sender: 'ai', text: responseText };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-40 lg:bottom-24 left-4 sm:left-8 w-[calc(100vw-32px)] sm:w-[350px] max-h-[80vh] sm:max-h-[500px] border border-border glass-card bg-background/80 backdrop-blur-xl rounded-2xl shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[rgba(0,0,0,0.02)] border-b border-border px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.05)] flex items-center justify-center relative overflow-hidden border border-border">
                    <img loading="lazy" src={HERO_CONTENT.image} alt="Akshay" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-success border-2 border-white rounded-full" />
                </div>
                <div>
                  <h4 className="text-text text-sm font-bold">Akshay's AI Clone</h4>
                  <p className="text-success text-[10px] font-mono tracking-wider flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" /> ONLINE
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-textSecondary hover:text-text transition-colors p-1"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[250px] glass-card bg-background/80 backdrop-blur-xl">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-primary text-white rounded-br-sm' 
                      : 'bg-[rgba(0,0,0,0.05)] border border-border text-text rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[rgba(0,0,0,0.05)] border border-border text-textSecondary p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
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
              <div className="px-4 pb-2 flex gap-2 overflow-x-auto snap-x glass-card bg-background/80 backdrop-blur-xl" style={{ scrollbarWidth: 'none' }}>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap flex-shrink-0 text-xs border border-border bg-[rgba(0,0,0,0.02)] text-textSecondary px-4 py-2 rounded-full hover:bg-[rgba(0,0,0,0.05)] hover:text-text transition-colors snap-start"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-[rgba(0,0,0,0.02)]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask me anything..."
                  className="w-full glass-card bg-background/80 backdrop-blur-xl border border-border rounded-full pl-4 pr-12 py-3 text-sm text-text placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-sans"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 text-primary disabled:text-textSecondary hover:bg-blue-50 rounded-full transition-colors"
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
            className="fixed bottom-40 lg:bottom-24 left-4 sm:left-8 glass-card bg-background/80 backdrop-blur-xl border border-border text-textSecondary text-xs px-4 py-2 rounded-2xl shadow-lg z-[90] flex items-center gap-2 cursor-pointer font-medium"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
            Have a project? Ask my AI!
            <div className="absolute -bottom-2 left-6 w-4 h-4 glass-card bg-background/80 backdrop-blur-xl border-b border-r border-border transform rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-24 lg:bottom-6 left-4 sm:left-8 w-14 h-14 glass-card bg-background/80 backdrop-blur-xl border border-border rounded-full flex items-center justify-center shadow-lg z-[90] group hover:bg-[rgba(0,0,0,0.02)] transition-colors"
      >
        {isOpen ? (
          <X className="text-textSecondary group-hover:text-text transition-colors" />
        ) : (
          <>
            <Bot className="text-primary group-hover:text-blue-700 transition-colors" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-white" />
          </>
        )}
      </motion.button>
    </>
  );
};

export default AIChatBot;
