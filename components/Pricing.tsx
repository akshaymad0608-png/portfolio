import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, MessageSquare, Globe, Code2, Building2, Infinity, Clock, Sparkles, Check } from 'lucide-react';

const Pricing: React.FC = () => {
  const packages = [
    {
      title: "Starter Package",
      price: "Starting at ₹5,000",
      subtitle: "AI Consultation & Prompt Engineering",
      desc: "Perfect for individuals and small businesses.",
      icon: Sparkles,
      features: [
        "AI consultation (up to 2 hours)",
        "Custom Prompt Engineering",
        "AI workflow recommendations",
        "Documentation",
        "7 days support"
      ],
      delivery: "Varies"
    },
    {
      title: "AI Automation Package",
      price: "₹15,000 – ₹40,000",
      subtitle: "Business Workflows & Integrations",
      desc: "Save time by automating repetitive work.",
      icon: Zap,
      features: [
        "AI workflow automation",
        "API integrations",
        "Email & CRM automation",
        "AI agent setup",
        "Testing & deployment"
      ],
      delivery: "5–10 Days"
    },
    {
      title: "AI Chatbot Development",
      price: "₹20,000 – ₹75,000",
      subtitle: "Intelligent Customer Support",
      desc: "Client-facing chatbots trained on your data.",
      icon: MessageSquare,
      features: [
        "Website Chatbot & Knowledge Base",
        "PDF Chat & FAQ Bot",
        "Lead Generation",
        "CRM Integration",
        "AI Responses"
      ],
      delivery: "7–15 Days"
    },
    {
      title: "Business Website + AI",
      price: "₹25,000 – ₹80,000",
      subtitle: "Modern Web Development",
      desc: "Fast, responsive websites built to convert.",
      icon: Globe,
      features: [
        "Modern Responsive Website",
        "AI Features",
        "SEO Optimization",
        "Contact Forms & Analytics",
        "Deployment"
      ],
      delivery: "7–20 Days"
    },
    {
      title: "Custom AI Web App",
      price: "₹50,000 – ₹2,50,000+",
      subtitle: "Micro-SaaS & Dashboards",
      desc: "Full-stack AI applications and tools.",
      icon: Code2,
      features: [
        "AI SaaS & Dashboards",
        "Resume Analyzer",
        "Prompt Generator",
        "AI CRM / Internal Tool",
        "AI Tool Directory",
        "Full Deployment"
      ],
      delivery: "2–8 Weeks",
      popular: true
    },
    {
      title: "Enterprise Solutions",
      price: "From ₹2,50,000",
      subtitle: "Scale with AI Strategy",
      desc: "Comprehensive solutions for large teams.",
      icon: Building2,
      features: [
        "AI Strategy & Agent Development",
        "Business Automation",
        "Internal AI Tools",
        "Team Training",
        "Ongoing Support"
      ],
      delivery: "Custom"
    }
  ];

  const retainers = [
    {
      title: "AI Partner for Startups",
      price: "₹40,000 – ₹1,50,000 / Month",
      icon: Infinity,
      features: [
        "Unlimited AI Consultation",
        "Prompt Engineering",
        "Automation",
        "AI Product Development",
        "Bug Fixes & Feature Development",
        "Priority Support"
      ]
    },
    {
      title: "Hourly Consulting",
      price: "₹2,000 / Hour",
      icon: Clock,
      features: [
        "Strategy Calls",
        "Prompt Engineering",
        "AI Consulting",
        "Code Review",
        "Architecture Planning"
      ]
    }
  ];

  const servicesTable = [
    { name: "AI Consulting", price: "₹2,000/hour" },
    { name: "Bug Fixes", price: "Starting ₹5,000" },
    { name: "Prompt Engineering", price: "Starting ₹5,000" },
    { name: "API Integration", price: "Starting ₹10,000" },
    { name: "AI Automation", price: "Starting ₹15,000" },
    { name: "Chatbot Development", price: "Starting ₹20,000" },
    { name: "AI Agent Development", price: "Starting ₹20,000" },
    { name: "Website Development", price: "Starting ₹25,000" },
    { name: "Resume Analyzer", price: "Starting ₹30,000" },
    { name: "SEO AI Tool", price: "Starting ₹35,000" },
    { name: "AI Dashboard", price: "Starting ₹50,000" },
  ];

  const includes = [
    "Discovery Call", "Requirement Analysis", "UI/UX Design", 
    "Development", "Testing", "Deployment", "Documentation", 
    "Source Code", "Post-launch Support"
  ];

  return (
    <section id="pricing" className="py-24 bg-midnight relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,245,212,0.05),transparent_50%)] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(240,255,68,0.05),transparent_50%)] pointer-events-none" />

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block uppercase">Investment</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 tracking-tight">
            Transparent Pricing for <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-blue-300">Premium AI Solutions</span>
          </h2>
          <p className="text-slate-400 text-base max-w-2xl mx-auto">
            Positioned in the mid-to-premium market, reflecting deep AI engineering and automation expertise. Competitive rates for startups, SMBs, and enterprise teams.
          </p>
        </motion.div>

        {/* Core Packages Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16 max-w-7xl mx-auto">
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
                    ? 'bg-slate-900/80 border-2 border-electric/50 shadow-[0_0_30px_rgba(0,245,212,0.15)]' 
                    : 'bg-white/[0.02] border border-white/10 hover:border-white/20'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-electric text-midnight text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                
                <div className="mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                    pkg.popular ? 'bg-electric/20 text-electric' : 'bg-white/5 text-white'
                  }`}>
                    <Icon size={24} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">{pkg.title}</h3>
                  <div className="text-electric font-mono font-medium text-lg mb-2">{pkg.price}</div>
                  <p className="text-sm text-slate-400">{pkg.desc}</p>
                </div>

                <div className="space-y-3 mb-8 flex-1">
                  {pkg.features.map(feature => (
                    <div key={feature} className="flex items-start gap-3">
                      <CheckCircle2 size={18} className="text-neonLime shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-6 border-t border-white/10 flex items-center justify-between text-sm">
                  <span className="text-slate-500 font-mono">Delivery</span>
                  <span className="text-white font-medium">{pkg.delivery}</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Retainers & Consulting */}
        <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-5xl mx-auto">
          {retainers.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="rounded-3xl bg-gradient-to-br from-slate-900/80 to-slate-900/40 border border-white/10 p-8 flex flex-col md:flex-row gap-8 items-center md:items-start"
              >
                <div className="shrink-0 text-center md:text-left">
                  <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4 mx-auto md:mx-0">
                    <Icon size={32} className="text-electric" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <div className="text-neonLime font-mono font-medium">{item.price}</div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2 flex-1 w-full">
                  {item.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-electric shrink-0" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Detailed Breakdown & Terms */}
        <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Services Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 rounded-3xl bg-white/[0.02] border border-white/10 p-8"
          >
            <h3 className="text-xl font-bold text-white mb-6">Additional Services</h3>
            <div className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
              {servicesTable.map((service, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-white/5">
                  <span className="text-slate-300 text-sm">{service.name}</span>
                  <span className="text-electric font-mono text-xs">{service.price}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Terms & Includes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* What's Included */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Every Project Includes</h3>
              <div className="flex flex-wrap gap-2">
                {includes.map((item, i) => (
                  <div key={i} className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-white/5 text-slate-300 text-xs">
                    <Check size={12} className="text-neonLime" /> {item}
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Terms */}
            <div className="rounded-3xl bg-white/[0.02] border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">Payment Terms</h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <strong className="block text-white mb-1">Standard Projects:</strong>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded"><span className="text-xs">Advance</span> <span className="font-mono text-electric">50%</span></div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded mt-1"><span className="text-xs">Before Final Delivery</span> <span className="font-mono text-electric">50%</span></div>
                </div>
                <div>
                  <strong className="block text-white mb-1">Projects above ₹1,00,000:</strong>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded"><span className="text-xs">Advance</span> <span className="font-mono text-electric">30%</span></div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded mt-1"><span className="text-xs">Midway Milestone</span> <span className="font-mono text-electric">40%</span></div>
                  <div className="flex justify-between items-center bg-white/5 p-2 rounded mt-1"><span className="text-xs">Before Delivery</span> <span className="font-mono text-electric">30%</span></div>
                </div>
              </div>
            </div>

            {/* Special Offer */}
            <div className="rounded-3xl bg-electric/10 border border-electric/20 p-6">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-electric" /> Special Offer
              </h3>
              <p className="text-sm text-slate-300 mb-3">
                <strong className="text-electric">10% Discount</strong> available for Startups, NGOs, Educational Institutions, and Long-term Contracts.
              </p>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Pricing;
