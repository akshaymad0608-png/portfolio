import React from 'react';
import { motion } from 'framer-motion';
import { Award, Check, ExternalLink } from 'lucide-react';
import { CERTIFICATES } from '../constants';

const Certificates: React.FC = () => {
  return (
    <section id="certifications" className="py-24 bg-section relative border-t border-border overflow-hidden">
      <div className="container mx-auto px-6 relative z-10 max-w-7xl">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 max-w-3xl mx-auto"
        >
          <span className="text-primary font-mono text-sm tracking-wider uppercase bg-blue-50 px-4 py-1.5 rounded-full border border-blue-100 mb-6 inline-block">
            Credentials
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
            Validated <span className="text-primary">Expertise</span>
          </h2>
          <p className="text-textSecondary text-lg leading-relaxed">
            Continuous learning and rigorous certifications to ensure my AI and automation architectures meet the highest industry standards.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CERTIFICATES.map((cert, index) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
              className="bg-cards border border-border rounded-2xl p-8 hover:shadow-md transition-shadow flex flex-col h-full"
            >
              <div className="flex items-start gap-5 mb-8">
                <div className="p-4 bg-slate-50 border border-border rounded-xl shrink-0 text-primary">
                  <Award className="w-8 h-8" />
                </div>
                <div className="pt-1">
                  <h3 className="text-xl md:text-2xl font-bold text-text mb-2">
                    {cert.title}
                  </h3>
                  <p className="text-sm text-textSecondary font-medium">
                    {cert.issuer} <span className="mx-2 opacity-50">•</span> {cert.date}
                  </p>
                </div>
              </div>
              
              <div className="flex-grow mb-6">
                <p className="text-xs font-semibold text-textSecondary mb-4 uppercase tracking-widest">
                  Core Capabilities
                </p>
                <ul className="space-y-3">
                  {cert.expertise.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-textSecondary text-sm font-medium">
                      <Check className="w-5 h-5 text-success shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              
              {cert.downloadLink && (
                <div className="mt-auto pt-6 border-t border-border">
                  <a 
                    href={cert.downloadLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary font-semibold hover:text-blue-700 transition-colors"
                  >
                    View Credential <ExternalLink size={16} />
                  </a>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certificates;
