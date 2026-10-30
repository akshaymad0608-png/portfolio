import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CalendarDays, MessageCircle } from 'lucide-react';
import { HERO_CONTENT } from '../constants';
import RobotMascot from './ui/RobotMascot';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
}

const SUGGESTED_QUESTIONS = [
  "What services do you offer?",
  "How much does a project cost?",
  "Do you build AI Agents?",
  "What's your tech stack?",
  "Website banane ka kharcha kitna hoga?"
];

const CALENDLY = 'https://calendly.com/akshaymad0608';
const WHATSAPP = `https://wa.me/917600885080?text=${encodeURIComponent("Hi Akshay, I was chatting on your website")}`;

const RESPONSES: Record<string, string> = {
  "What services do you offer?": "I specialize in building intelligent AI agents, custom automation workflows, and high-conversion web applications.",
  "How much does a project cost?": "Pricing is per project. A website starts at $275 (about ₹25,000), an n8n automation build at $300, an AI agent or chatbot at $900, and a full product build at $1,800. The pricing page lists every tier in rupees or dollars. Happy to give you a precise number on WhatsApp once I know the scope.",
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
  const [lead, setLead] = useState<'hidden' | 'form' | 'sending' | 'sent' | 'dismissed'>('hidden');
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadError, setLeadError] = useState<string | null>(null);

  // The greeting waits until you've had a moment to read the page, stays for
  // a short while, and is shown once per visit. Left up indefinitely it sat
  // over the corner of the content on every page and came back on every reload.
  const dismissNudge = () => {
    setShowNudge(false);
    try {
      sessionStorage.setItem('chat_nudge_seen', '1');
    } catch {
      /* private mode: the nudge may show again, which is harmless */
    }
  };

  useEffect(() => {
    try {
      if (sessionStorage.getItem('chat_nudge_seen') === '1') return;
    } catch {
      /* fall through and show it */
    }
    const show = setTimeout(() => setShowNudge(true), 2500);
    const hide = setTimeout(dismissNudge, 2500 + 15000);
    return () => {
      clearTimeout(show);
      clearTimeout(hide);
    };
  }, []);

  const userTurns = messages.filter((m) => m.sender === 'user').length;
  useEffect(() => {
    if (userTurns >= 2 && lead === 'hidden' && !isTyping) setLead('form');
  }, [userTurns, lead, isTyping]);

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!leadName.trim() || leadPhone.replace(/\D/g, '').length < 8) {
      setLeadError('Add your name and a phone or WhatsApp number.');
      return;
    }
    setLeadError(null);
    setLead('sending');
    try {
      const res = await fetch('https://formspree.io/f/mbdndbdr', {
        method: 'POST',
        headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: leadName.trim(),
          phone: leadPhone.trim(),
          message: 'Lead from the chat widget',
          source: 'chat widget',
          transcript: messages.slice(-8).map((m) => `${m.sender === 'user' ? 'Visitor' : 'Bot'}: ${m.text}`).join('\n'),
        }),
      });
      if (!res.ok) throw new Error('bad status');
      setLead('sent');
    } catch {
      setLead('form');
      setLeadError("That didn't go through. Message me on WhatsApp instead.");
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen, lead]);

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
        // The endpoint explains itself when it can't answer — an unset API key
        // reads very differently from an outage, and the visitor deserves the
        // real reason rather than a generic failure.
        const reason = await response.json().then((d) => d?.error).catch(() => null);
        throw new Error(reason || 'Failed to send message');
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
        text: error instanceof Error && error.message !== 'Failed to send message'
          ? error.message
          : "I can't reach the chat service right now. Ping me on WhatsApp and I'll answer myself.",
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
            <div className="bg-frame border-b border-border px-4 py-3 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 rounded-full bg-cards flex items-center justify-center relative overflow-hidden border border-wire/30">
                    <RobotMascot head animated={false} className="h-8 w-8" />
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

            {/* Quick actions */}
            <div className="flex gap-2 border-b border-border bg-frame px-4 py-2">
              <a
                href={CALENDLY}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-wire px-3 py-1.5 text-[12px] font-semibold text-ink"
              >
                <CalendarDays size={13} /> Book a call
              </a>
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-[12px] font-medium text-text hover:border-wire/40"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
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
              {(lead === 'form' || lead === 'sending') && (
                <form onSubmit={submitLead} className="rounded-2xl border border-wire/30 bg-cards p-3 text-sm">
                  <p className="font-semibold text-text">Want a quote? Leave your number.</p>
                  <p className="mt-0.5 text-[12px] text-textSecondary">I reply on WhatsApp, usually the same day. Used only to answer you.</p>
                  <input
                    value={leadName}
                    onChange={(e) => setLeadName(e.target.value)}
                    placeholder="Your name"
                    autoComplete="name"
                    className="mt-2 w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder-muted focus:border-wire/50 focus:outline-none"
                  />
                  <input
                    value={leadPhone}
                    onChange={(e) => setLeadPhone(e.target.value)}
                    placeholder="WhatsApp or phone number"
                    type="tel"
                    autoComplete="tel"
                    className="mt-2 w-full rounded-lg border border-border bg-ink px-3 py-2 text-sm text-text placeholder-muted focus:border-wire/50 focus:outline-none"
                  />
                  {leadError && <p className="mt-2 text-[12px] text-red-500">{leadError}</p>}
                  <div className="mt-2 flex items-center gap-3">
                    <button type="submit" disabled={lead === 'sending'} className="btn-signal px-4 py-2 text-[13px] disabled:opacity-60">
                      {lead === 'sending' ? 'Sending…' : 'Send'}
                    </button>
                    <button type="button" onClick={() => setLead('dismissed')} className="text-[12px] text-muted hover:text-text">
                      No thanks
                    </button>
                  </div>
                </form>
              )}
              {lead === 'sent' && (
                <div className="rounded-2xl border border-wire/30 bg-cards p-3 text-sm text-text">
                  Thanks, {leadName.trim().split(' ')[0]}. I will message you on WhatsApp soon.
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
            <div className="p-3 border-t border-border bg-frame">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend(inputValue)}
                  placeholder="Ask in English, Hindi or Gujarati"
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
            className="fixed bottom-[112px] right-3 sm:right-5 z-[90] max-w-[250px] cursor-pointer"
            onClick={() => { dismissNudge(); setIsOpen(true); }}
          >
            {/* Comic speech bubble whose tail points down at the robot. */}
            <div className="relative rounded-[22px] border-2 border-wire bg-cards px-4 py-3 shadow-xl shadow-wire/10">
              <p className="pr-4 text-center text-[14px] font-bold leading-snug text-text">
                I&rsquo;m here to help you with pricing, booking a call, and more
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); dismissNudge(); }}
                aria-label="Dismiss"
                className="absolute right-1 top-1 flex h-7 w-7 items-center justify-center text-muted transition-colors hover:text-text"
              >
                <X size={14} />
              </button>
              <span aria-hidden className="absolute -bottom-[9px] right-9 h-4 w-4 rotate-45 border-b-2 border-r-2 border-wire bg-cards" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/*
        Closed, the launcher is the robot mascot itself, floating in the corner:
        a friendlier "ask me" than a plain round button, and nothing to load,
        since it is SVG. Clicking it opens the chat.

        Open, it collapses to a plain close button so the panel never sits on
        top of a moving graphic. The float, blink and antenna wiggle are CSS and
        the stylesheet's reduced-motion block switches them off.
      */}
      <motion.button
        onClick={() => { dismissNudge(); setIsOpen(!isOpen); }}
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.95 }}
        aria-label={isOpen ? 'Close the chat' : 'Open the chat'}
        aria-expanded={isOpen}
        className={`fixed z-[90] flex items-center justify-center ${
          isOpen
            ? 'bottom-6 right-4 sm:right-6 h-14 w-14 rounded-full btn-signal !rounded-full'
            : 'bottom-2 right-2 sm:right-4 h-[104px] w-[86px]'
        }`}
      >
        {isOpen ? <X className="text-ink" size={22} /> : <RobotMascot className="h-full w-full drop-shadow-lg" />}
      </motion.button>
    </>
  );
};

export default AIChatBot;
