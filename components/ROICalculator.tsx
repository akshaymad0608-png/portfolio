import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Clock, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROICalculator: React.FC = () => {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(25);

  const yearlyCost = hours * rate * 52;
  const automatedPercentage = 0.70; // 70% automation potential
  const yearlySavings = Math.round(yearlyCost * automatedPercentage);
  const hoursSaved = Math.round(hours * 52 * automatedPercentage);

  return (
    <section className="py-24 bg-midnight relative border-y border-white/5">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.05),transparent_70%)] pointer-events-none" />
      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <span className="text-electric font-mono text-sm tracking-widest mb-4 block uppercase">Interactive Tool</span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-electric to-blue-300">AI ROI</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg">
            See exactly how much time and money you are losing to manual tasks. Let's find out how much AI automation can save you.
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl"
          >
            <div className="mb-8">
              <div className="flex justify-between items-end mb-4">
                <label className="text-white font-bold text-lg">Manual Hours Per Week</label>
                <span className="text-electric font-mono text-2xl font-bold">{hours}h</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">Time spent on repetitive tasks (emails, data entry, reports).</p>
              <input 
                type="range" 
                min="5" 
                max="100" 
                value={hours} 
                onChange={(e) => setHours(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-slate-500 text-xs mt-2 font-mono">
                <span>5h</span>
                <span>100h</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-4">
                <label className="text-white font-bold text-lg">Average Hourly Cost ($)</label>
                <span className="text-electric font-mono text-2xl font-bold">${rate}</span>
              </div>
              <p className="text-slate-400 text-sm mb-4">The average hourly wage for this work.</p>
              <input 
                type="range" 
                min="10" 
                max="150" 
                step="5"
                value={rate} 
                onChange={(e) => setRate(Number(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-electric"
              />
              <div className="flex justify-between text-slate-500 text-xs mt-2 font-mono">
                <span>$10</span>
                <span>$150</span>
              </div>
            </div>
          </motion.div>

          {/* Results */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-electric/10 to-blue-500/5 border border-electric/20 p-8 rounded-3xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6 opacity-10">
              <Calculator size={100} />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-6 relative z-10">Your Estimated Yearly Savings</h3>
            
            <div className="grid grid-cols-2 gap-6 mb-8 relative z-10">
              <div>
                <div className="flex items-center gap-2 text-slate-300 mb-2">
                  <DollarSign size={18} className="text-electric" />
                  <span className="text-sm">Money Saved</span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  ${yearlySavings.toLocaleString()}
                </div>
              </div>
              
              <div>
                <div className="flex items-center gap-2 text-slate-300 mb-2">
                  <Clock size={18} className="text-electric" />
                  <span className="text-sm">Time Saved</span>
                </div>
                <div className="text-3xl lg:text-4xl font-bold text-white tracking-tight">
                  {hoursSaved.toLocaleString()}h
                </div>
              </div>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-xl p-4 mb-8 relative z-10">
              <p className="text-sm text-slate-300">
                Assuming a conservative <strong className="text-white">70% automation rate</strong>. An AI agent costs a fraction of your current manual workflow overhead.
              </p>
            </div>

            <Link 
              to="/contact"
              className="inline-flex items-center justify-center w-full gap-2 py-4 bg-electric text-midnight font-bold rounded-xl hover:bg-white transition-colors relative z-10"
            >
              Start Automating Today <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
