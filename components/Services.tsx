import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Zap, Globe, MessageSquare, Code, Search, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    id: "ai-agents",
    icon: Bot,
    title: "AI Agents",
    description: "Intelligent autonomous agents that execute complex business tasks without human intervention.",
    benefits: ["24/7 Availability", "Cost Reduction", "Error-free Execution"],
  },
  {
    id: "ai-automation",
    icon: Zap,
    title: "AI Automation",
    description: "Streamline your business operations by connecting your tools with custom AI pipelines.",
    benefits: ["Faster Turnaround", "Scalable Processes", "Data Sync"],
  },
  {
    id: "ai-chatbots",
    icon: MessageSquare,
    title: "AI Chatbots",
    description: "Advanced conversational AI for customer support, lead generation, and internal knowledge bases.",
    benefits: ["Instant Replies", "Higher Conversion", "Multilingual Support"],
  },
  {
    id: "prompt-engineering",
    icon: Code,
    title: "Prompt Engineering",
    description: "Optimizing LLM interactions to get precise, reliable, and high-quality outputs for your use case.",
    benefits: ["Better Accuracy", "Lower API Costs", "Structured Data"],
  },
  {
    id: "web-development",
    icon: Globe,
    title: "Website Development",
    description: "High-performance, beautifully designed, and conversion-optimized websites and web apps.",
    benefits: ["Modern UI/UX", "Lightning Fast", "Mobile Responsive"],
  },
  {
    id: "seo",
    icon: Search,
    title: "SEO Optimization",
    description: "Data-driven SEO strategies to rank higher on search engines and generate organic leads.",
    benefits: ["More Traffic", "Better Rankings", "Quality Leads"],
  }
];

const Services: React.FC = () => {
  return (
    <section className="py-24 bg-section relative overflow-hidden">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
            AI Engineering & <span className="text-primary">Automation Architecture</span>
          </h2>
          <p className="text-lg text-textSecondary leading-relaxed">
            As an AI Engineer & Automation Architect, I build end-to-end intelligent systems that scale your operations, eliminate manual tasks, and increase revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-cards border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300 flex flex-col h-full"
            >
              <div className="w-14 h-14 bg-blue-50 text-primary rounded-xl flex items-center justify-center mb-6">
                <service.icon size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text mb-3">{service.title}</h3>
              <p className="text-textSecondary mb-6 flex-grow">{service.description}</p>
              
              <ul className="space-y-3 mb-8">
                {service.benefits.map((benefit, i) => (
                  <li key={i} className="flex items-center gap-3 text-textSecondary text-sm font-medium">
                    <CheckCircle2 className="w-5 h-5 text-success" />
                    {benefit}
                  </li>
                ))}
              </ul>

              <Link 
                to={`/services#${service.id}`}
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition-colors mt-auto group"
              >
                Learn More <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors shadow-md"
          >
            Get a Free Quote
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
