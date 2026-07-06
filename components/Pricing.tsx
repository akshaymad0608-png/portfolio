import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Bot, Layers, Workflow, Check, Sparkles, Code2, Headphones } from 'lucide-react';

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
    <section id="pricing" className="py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-widest mb-4 block uppercase font-semibold">Investment</span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">Transparent <span className="text-primary">Pricing</span></h2>
          <p className="text-textSecondary">
            Clear, project-based pricing. No hidden fees. Every project is scoped accurately based on your specific requirements.
          </p>
        </motion.div>

        {/* Core Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 max-w-7xl mx-auto">
          {packages.map((pkg, idx) => {
            const Icon = pkg.icon;
            return (
              <motion.div
                key={pkg.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col rounded-3xl p-8 transition-all duration-300 ${
                  pkg.popular 
                    ? 'bg-white border-2 border-primary shadow-lg' 
                    : 'bg-white border border-border hover:border-primary/50 shadow-sm hover:shadow-md'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    pkg.popular ? 'bg-blue-50 text-primary' : 'bg-slate-50 text-textSecondary'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-text mb-2">{pkg.title}</h3>
                  <div className="text-primary font-mono font-bold text-xl mb-2">{pkg.price}</div>
                  <p className="text-sm text-textSecondary">{pkg.desc}</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {pkg.features.map(feature => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-success shrink-0 mt-0.5" />
                      <span className="text-text text-sm leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-textSecondary font-medium">Est. Delivery</span>
                  <span className="text-text font-bold">{pkg.delivery}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Retainers & Consulting */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {retainers.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-slate-50 border border-border p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm"
              >
                <div className="shrink-0 text-center md:text-left">
                  <div className="w-16 h-16 rounded-full bg-white border border-border flex items-center justify-center mb-4 mx-auto md:mx-0 shadow-sm">
                    <Icon size={32} className="text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-text mb-2">{item.title}</h3>
                  <div className="text-primary font-mono font-bold">{item.price}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 flex-1 w-full mt-2 md:mt-0">
                  {item.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-primary shrink-0" />
                      <span className="text-textSecondary text-sm">{feature}</span>
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
