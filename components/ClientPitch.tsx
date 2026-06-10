import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BriefcaseBusiness, CheckCircle2, Clock, MessageSquare, Rocket, ShieldCheck, Target, Zap } from 'lucide-react';

const ClientPitch: React.FC = () => {
  const outcomes = [
    'AI chatbot for leads, support and FAQ automation',
    'Business workflow automation using n8n, Zapier and AI agents',
    'Fast landing pages and product websites built for conversions',
    'SEO, content and social-media automation systems',
    'Custom AI tools, dashboards and micro-SaaS prototypes',
    'Clear handover, documentation and long-term support'
  ];

  const packages = [
    {
      title: 'Starter Build',
      desc: 'Best for small businesses that need a professional website, landing page, tool page or simple automation.',
      timeline: 'Fast MVP delivery',
      icon: Rocket
    },
    {
      title: 'Automation System',
      desc: 'Best for companies that want to save time by automating leads, emails, reports, content and operations.',
      timeline: 'Workflow + testing',
      icon: Zap
    },
    {
      title: 'AI Agent / SaaS MVP',
      desc: 'Best for founders who want a working AI product, chatbot, directory, resume tool or custom dashboard.',
      timeline: 'Prototype to launch',
      icon: BriefcaseBusiness
    }
  ];

  return (
    <section id="client-offer" className="py-16 md:py-24 bg-midnight relative overflow-hidden scroll-mt-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(0,240,255,0.12),transparent_35%),radial-gradient(circle_at_80%_60%,rgba(189,255,0,0.08),transparent_35%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block">FOR COMPANIES & CLIENTS</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-5">
            Hire me to build practical <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-neonLime">AI + Web systems</span>
          </h2>
          <p className="text-slate-400 text-base md:text-lg leading-relaxed">
            This portfolio is designed as a client proof page: it shows what I can build, the business problem it solves, and how companies can quickly contact me for a project.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 items-stretch max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-white/[0.04] border border-white/10 p-6 md:p-8 backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-2xl bg-electric/10 text-electric border border-electric/20">
                <Target size={28} />
              </div>
              <div>
                <h3 className="text-2xl font-black text-white">What I can deliver</h3>
                <p className="text-slate-500 text-sm">Clear services for business decision makers</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-3">
              {outcomes.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-start gap-3 rounded-2xl bg-slate-900/60 border border-white/5 p-4"
                >
                  <CheckCircle2 size={18} className="text-neonLime shrink-0 mt-0.5" />
                  <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 rounded-2xl bg-electric/10 border border-electric/20 p-5">
              <h4 className="text-white font-black mb-2 flex items-center gap-2"><ShieldCheck className="text-electric" size={20} /> Client-ready promise</h4>
              <p className="text-slate-300 text-sm leading-relaxed">Every project is presented with a problem, solution, features, result/benefit, live demo link and direct WhatsApp contact so companies can trust the work quickly.</p>
            </div>
          </motion.div>

          <div className="grid gap-4">
            {packages.map((pkg, i) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group rounded-3xl bg-slate-900/50 border border-white/10 hover:border-electric/50 p-6 transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                    <div className="p-4 rounded-2xl bg-white/5 text-electric border border-white/10 group-hover:bg-electric group-hover:text-midnight transition-colors shrink-0">
                      <Icon size={30} />
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                        <h3 className="text-xl font-black text-white group-hover:text-electric transition-colors">{pkg.title}</h3>
                        <span className="inline-flex items-center gap-1 text-xs text-neonLime font-mono bg-neonLime/10 border border-neonLime/20 px-3 py-1 rounded-full w-fit"><Clock size={12} /> {pkg.timeline}</span>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{pkg.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}

            <motion.a
              href="https://wa.me/917600885080?text=Hi%20Akshay,%20I%20checked%20your%20portfolio%20and%20want%20to%20discuss%20a%20company%20project"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white text-midnight font-black px-6 py-4 hover:bg-electric transition-colors"
            >
              Discuss a Company Project <MessageSquare size={20} /> <ArrowRight size={18} />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientPitch;
