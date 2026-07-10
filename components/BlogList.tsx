import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import TiltCard from './ui/TiltCard';

const BlogList: React.FC = () => {
  const posts = [
    {
      id: 1,
      title: "How to Build an AI Agent in 2026",
      excerpt: "A comprehensive guide on creating autonomous AI agents using modern frameworks and LLMs.",
      date: "July 1, 2026",
      author: "Akshay Mahajan",
      category: "AI Engineering"
    },
    {
      id: 2,
      title: "The Future of Web Development with Generative AI",
      excerpt: "Exploring how LLMs are changing the way we build interfaces and structure full-stack applications.",
      date: "June 15, 2026",
      author: "Akshay Mahajan",
      category: "Web Dev"
    },
    {
      id: 3,
      title: "Automating Your Business Workflows with n8n",
      excerpt: "Stop doing manual data entry. Here's how to automate your CRM and email triage seamlessly.",
      date: "May 28, 2026",
      author: "Akshay Mahajan",
      category: "Automation"
    }
  ];

  return (
    <section className="py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-2xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-widest mb-4 block uppercase font-semibold">Insights</span>
          <h2 className="text-4xl md:text-5xl font-bold text-text mb-6 font-display">Latest from the <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">Blog</span></h2>
          <p className="text-textSecondary text-lg">
            Thoughts, tutorials, and deep dives into AI engineering, workflow automation, and modern web development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, idx) => (
            <TiltCard key={post.id} className="h-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card rounded-[2rem] p-8 border border-border hover:border-primary/30 flex flex-col h-full group"
              >
                <div className="text-primary font-mono text-xs uppercase tracking-wider mb-4 font-semibold px-3 py-1 rounded-full bg-[rgba(0,245,255,0.1)] inline-block w-fit">
                  {post.category}
                </div>
                <h3 className="text-2xl font-bold text-text mb-4 font-display group-hover:text-primary transition-colors">{post.title}</h3>
                <p className="text-textSecondary mb-6 flex-grow">{post.excerpt}</p>
                <div className="flex items-center justify-between mt-auto pt-6 border-t border-border/50">
                  <div className="flex items-center gap-4 text-xs text-textSecondary font-mono">
                    <div className="flex items-center gap-1.5"><Calendar size={14} /> {post.date}</div>
                  </div>
                  <button className="text-primary hover:text-text transition-colors">
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
};
export default BlogList;
