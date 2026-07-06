import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "CEO",
    company: "TechFlow Solutions",
    content: "Akshay built an incredible AI agent for our customer support that reduced our response time by 80%. His understanding of automation and prompt engineering is unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Founder",
    company: "GrowthX",
    content: "The website Akshay developed for us not only looks stunning but also converts 3x better than our previous one. The integration of AI chatbots was seamless and highly effective.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150"
  },
  {
    id: 3,
    name: "Emma Davis",
    role: "Marketing Director",
    company: "Elevate Media",
    content: "We hired Akshay for an SEO overhaul and automated content pipeline. Within 3 months, our organic traffic doubled. He is a true professional who delivers real results.",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=150"
  }
];

const Testimonials: React.FC = () => {
  return (
    <section className="py-24 bg-section relative border-t border-border">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">Client <span className="text-primary">Success Stories</span></h2>
          <p className="text-lg text-textSecondary max-w-2xl mx-auto">
            See what industry leaders are saying about my work.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="relative p-8 rounded-2xl bg-cards border border-border shadow-sm flex flex-col hover:shadow-md transition-shadow"
            >
              <div className="absolute top-6 right-8 text-slate-100">
                <Quote size={40} fill="currentColor" />
              </div>
              <p className="text-text leading-relaxed mb-8 relative z-10">"{t.content}"</p>
              
              <div className="mt-auto flex items-center gap-4">
                <img 
                  src={t.avatar} 
                  alt={t.name} 
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="text-text font-bold">{t.name}</h4>
                  <p className="text-sm text-textSecondary">{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
