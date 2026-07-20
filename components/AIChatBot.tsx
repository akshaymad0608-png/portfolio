import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Bot, MessageSquareText } from 'lucide-react';
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
  const [showNudge, setShowNudge] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // the greeting waits until you've had a moment to read the page
  useEffect(() => {
    const t = setTimeout(() => setShowNudge(true), 9000);
    return () => clearTimeout(t);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: Message = { id: Date.now().toString(), sender: 'user', text };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage].map(m => ({
            role: m.sender,
            text: m.text
          }))
        })
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setIsTyping(false);
      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      
      if (!reader) return;

      const aiMessageId = (Date.now() + 1).toString();
      setMessages(prev => [...prev, { id: aiMessageId, sender: 'ai', text: '' }]);

      let accumulatedText = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        accumulatedText += decoder.decode(value, { stream: true });
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId ? { ...msg, text: accumulatedText } : msg
          )
        );
      }
    } catch (error) {
      console.error('Chat error:', error);
      setIsTyping(false);
      setMessages(prev => [...prev, { 
        id: (Date.now() + 1).toString(), 
        sender: 'ai', 
        text: "I'm having trouble connecting to my neural net right now. Please reach out via WhatsApp!" 
      }]);
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 w-[calc(100vw-32px)] sm:w-[360px] max-h-[78vh] sm:max-h-[520px] panel ticked shadow-2xl z-[100] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-[#0D0E14] border-b border-border px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-ink flex items-center justify-center relative overflow-hidden border border-wire/30">
                    <img loading="lazy" src={HERO_CONTENT.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: 'center 20%' }} />
                  </div>
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-wire border-2 border-ink rounded-full" />
                </div>
                <div>
                  <h4 className="text-text text-sm font-bold font-display">Ask about the work</h4>
                  <p className="text-wire text-[10px] font-mono tracking-[0.16em] flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-wire pulse-soft" /> AUTO-REPLY
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
            <div className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[250px] bg-ink">
              {messages.map(msg => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${
                    msg.sender === 'user' 
                      ? 'bg-wire text-ink font-medium rounded-br-sm' 
                      : 'bg-cards border border-border text-text rounded-bl-sm'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-cards border border-border p-3 rounded-2xl rounded-bl-sm flex gap-1 items-center">
                    <span className="w-1.5 h-1.5 bg-wire/70 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-1.5 h-1.5 bg-wire/70 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-1.5 h-1.5 bg-wire/70 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            {messages.length === 1 && (
              <div className="px-4 pb-3 flex gap-2 overflow-x-auto snap-x bg-ink hide-scrollbar" style={{ scrollbarWidth: 'none' }}>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(q)}
                    className="whitespace-nowrap flex-shrink-0 text-xs border border-border bg-cards text-textSecondary px-4 py-2 rounded-full hover:border-wire/40 hover:text-wire transition-colors snap-start"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-3 border-t border-border bg-[#0D0E14]">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask about pricing, timelines, tools…"
                  className="w-full bg-ink border border-border rounded-full pl-4 pr-12 py-3 text-sm text-text placeholder-muted focus:outline-none focus:border-wire/50 transition-colors font-sans"
                />
                <button
                  onClick={() => handleSend(inputValue)}
                  disabled={!inputValue.trim() || isTyping}
                  className="absolute right-2 p-2 text-wire disabled:text-muted hover:bg-wire/10 rounded-full transition-colors"
                >
                  <Send size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {!isOpen && showNudge && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.9 }}
            className="fixed bottom-24 right-4 sm:right-6 panel text-text text-[13.5px] px-4 py-3 shadow-xl z-[90] flex items-start gap-3 cursor-pointer max-w-[260px]"
            onClick={() => setIsOpen(true)}
          >
            <span className="leading-snug">Questions about scope or price? Ask here — answers are instant.</span>
            <button
              onClick={(e) => { e.stopPropagation(); setShowNudge(false); }}
              aria-label="Dismiss"
              className="shrink-0 text-muted hover:text-text transition-colors"
            >
              <X size={15} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-4 sm:right-6 w-14 h-14 btn-signal flex items-center justify-center z-[90]"
      >
        {isOpen ? (
          <X className="text-ink" size={22} />
        ) : (
          <MessageSquareText className="text-ink w-6 h-6" />
        )}
      </motion.button>
    </>
  );
};

export default AIChatBot;
