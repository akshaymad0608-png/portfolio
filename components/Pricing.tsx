import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Bot, Layers, Workflow, Check, Sparkles, Code2, Headphones } from 'lucide-react';
import TiltCard from './ui/TiltCard';

const Pricing: React.FC = () => {
  const packages = [
    {
      title: "Automation Setup",
      price: "From $500",
      desc: "Perfect for streamlining repetitive tasks and saving hours every week.",
      icon: Workflow,
      features: [
        "Zapier / n8n / Make integration",
        "Up to 3 multi-step workflows",
        "API connections configuration",
        "Error handling & notifications",
        "1 month support"
      ],
      delivery: "1-2 Weeks",
      popular: false
    },
    {
      title: "AI Agent Development",
      price: "From $1,500",
      desc: "Custom AI assistants connected to your data and APIs.",
      icon: Bot,
      features: [
        "OpenAI / Anthropic integration",
        "RAG (Retrieval-Augmented Gen)",
        "Vector Database setup (Pinecone)",
        "Chat interface or API endpoint",
        "Prompt engineering & testing"
      ],
      delivery: "3-4 Weeks",
      popular: true
    },
    {
      title: "Full-Stack Web App",
      price: "From $3,000",
      desc: "Complete web applications built with modern frameworks and databases.",
      icon: Layers,
      features: [
        "React / Next.js Frontend",
        "Node.js / Express Backend",
        "Database Architecture (SQL/NoSQL)",
        "Authentication & Security",
        "Deployment & CI/CD pipeline"
      ],
      delivery: "4-8 Weeks",
      popular: false
    }
  ];

  const retainers = [
    {
      title: "Technical Consulting",
      price: "$150 / hr",
      icon: Headphones,
      features: ["Architecture Planning", "Tech Stack Selection", "Code Review", "AI Strategy"]
    },
    {
      title: "Monthly Retainer",
      price: "Custom",
      icon: Code2,
      features: ["Ongoing Maintenance", "Feature Additions", "Priority Support", "Dedicated Hours"]
    }
  ];

  return (
    <section id="pricing" className="py-32 relative overflow-hidden">
      <div className="absolute top-1/4 -right-64 w-[500px] h-[500px] bg-secondary/10 blur-[150px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24 max-w-2xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-widest mb-4 block uppercase font-semibold">Investment</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-6 font-display">Transparent <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Pricing</span></h2>
          <p className="text-textSecondary text-lg">
            Clear, project-based pricing. No hidden fees. Every project is scoped accurately based on your specific requirements.
          </p>
        </motion.div>

        {/* Core Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-7xl mx-auto">
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            return (
              <TiltCard key={pkg.title} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col rounded-[2.5rem] p-10 h-full group transition-all duration-500 overflow-hidden ${
                    pkg.popular 
                      ? 'glass-card border border-primary/50 shadow-[0_0_30px_rgba(0,245,255,0.1)]' 
                      : 'glass-card border border-border hover:border-primary/30'
                  }`}
                >
                  {/* Internal Glow */}
                  <div className={`absolute -inset-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[40px] pointer-events-none ${pkg.popular ? 'bg-gradient-to-r from-primary/10 to-secondary/10 opacity-50' : 'bg-primary/5'}`} />

                  {pkg.popular && (
                    <div className="absolute top-0 right-10 bg-gradient-to-b from-primary to-accent text-white text-xs font-bold px-4 py-2 rounded-b-xl uppercase tracking-wider shadow-lg">
                      Most Popular
                    </div>
                  )}
                  
                  <div className="mb-8 relative z-10">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 shadow-inner ${
                      pkg.popular ? 'bg-[rgba(0,245,255,0.1)] text-primary border border-primary/20' : 'bg-[rgba(0,0,0,0.02)] text-text border border-border'
                    }`}>
                      <Icon size={28} />
                    </div>
                    <h3 className="text-2xl font-bold text-text mb-2 font-display">{pkg.title}</h3>
                    <div className="text-primary font-mono font-bold text-2xl mb-4">{pkg.price}</div>
                    <p className="text-textSecondary">{pkg.desc}</p>
                  </div>

                  <div className="space-y-4 mb-10 flex-1 relative z-10">
                    {pkg.features.map(feature => (
                      <div key={feature} className="flex items-start gap-3 group/item">
                        <CheckCircle2 size={20} className="text-[#22C55E] shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform" />
                        <span className="text-text text-sm leading-snug group-hover/item:text-primary transition-colors">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-auto pt-6 border-t border-border flex items-center justify-between text-sm relative z-10">
                    <span className="text-textSecondary font-medium">Est. Delivery</span>
                    <span className="text-text font-bold font-mono bg-[rgba(0,0,0,0.05)] px-3 py-1 rounded-full">{pkg.delivery}</span>
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        {/* Retainers & Consulting */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {retainers.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-[2rem] glass-card border border-border p-10 flex flex-col md:flex-row gap-8 items-center md:items-start group hover:border-[rgba(0,0,0,0.2)] transition-colors hover-target"
              >
                <div className="shrink-0 text-center md:text-left">
                  <div className="w-16 h-16 rounded-2xl bg-[rgba(0,0,0,0.02)] border border-border flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                    <Icon size={32} className="text-secondary" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2 font-display">{item.title}</h3>
                  <div className="text-primary font-mono font-bold text-lg">{item.price}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-4 flex-1 w-full mt-2 md:mt-0">
                  {item.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full bg-gradient-to-r from-primary to-primary shrink-0" />
                      <span className="text-textSecondary text-sm font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
