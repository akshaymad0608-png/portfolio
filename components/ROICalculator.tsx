import TiltCard from './ui/TiltCard';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, Clock, DollarSign, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const ROICalculator: React.FC = () => {
  const [hours, setHours] = useState(20);
  const [rate, setRate] = useState(50);

  const weeklySavings = hours * rate;
  const monthlySavings = weeklySavings * 4;
  const yearlySavings = monthlySavings * 12;

  return (
    <section className="py-20 bg-transparent border-t border-border">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-primary font-mono text-sm tracking-widest mb-4 block uppercase font-semibold">Interactive Tool</span>
            <h2 className="text-3xl md:text-5xl font-bold text-text mb-6">
              Calculate Your <span className="text-primary">Automation ROI</span>
            </h2>
            <p className="text-textSecondary max-w-2xl mx-auto">
              See how much time and money you can save by automating repetitive tasks in your business.
            </p>
          </div>

          <TiltCard>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Input Controls */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-10 glass-card bg-background/80 backdrop-blur-xl p-8 md:p-10 rounded-3xl border border-border shadow-sm"
            >
              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-lg font-bold text-text">Hours spent on manual tasks</label>
                  <span className="text-primary font-mono text-2xl font-bold">{hours}h</span>
                </div>
                <p className="text-sm text-textSecondary mb-6">Per week (data entry, scheduling, reporting, etc.)</p>
                <input 
                  type="range" 
                  min="5" 
                  max="100" 
                  step="5"
                  value={hours}
                  onChange={(e) => setHours(parseInt(e.target.value))}
                  className="w-full h-2 bg-[rgba(0,0,0,0.1)] rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                  <span>5h</span>
                  <span>100h</span>
                </div>
              </div>

              <div>
                <div className="flex justify-between items-end mb-4">
                  <label className="text-lg font-bold text-text">Average hourly value/cost</label>
                  <span className="text-primary font-mono text-2xl font-bold">${rate}</span>
                </div>
                <p className="text-sm text-textSecondary mb-6">Your hourly rate or employee cost</p>
                <input 
                  type="range" 
                  min="15" 
                  max="200" 
                  step="5"
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value))}
                  className="w-full h-2 bg-[rgba(0,0,0,0.1)] rounded-lg appearance-none cursor-pointer accent-primary"
                />
                <div className="flex justify-between text-xs text-slate-400 mt-2 font-mono">
                  <span>$15</span>
                  <span>$200</span>
                </div>
              </div>
            </motion.div>

            {/* Results Display */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-[rgba(37,99,235,0.1)] border border-[rgba(37,99,235,0.2)] p-8 md:p-10 rounded-3xl relative overflow-hidden shadow-sm"
            >
              <h3 className="text-2xl font-bold text-text mb-8 flex items-center gap-3">
                <TrendingUp className="text-primary" /> Projected Savings
              </h3>

              <div className="space-y-6 mb-10">
                <div className="flex items-center justify-between p-4 rounded-2xl glass-card bg-background/80 backdrop-blur-xl border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.1)] flex items-center justify-center">
                      <DollarSign size={18} className="text-primary" />
                    </div>
                    <span className="text-text font-medium">Monthly Savings</span>
                  </div>
                  <span className="text-xl font-bold text-text">${monthlySavings.toLocaleString()}</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-2xl glass-card bg-background/80 backdrop-blur-xl border border-border shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[rgba(37,99,235,0.1)] flex items-center justify-center">
                      <Clock size={18} className="text-primary" />
                    </div>
                    <span className="text-text font-medium">Time Recovered</span>
                  </div>
                  <span className="text-xl font-bold text-text">{hours * 4} hrs/mo</span>
                </div>
                
                <div className="p-6 rounded-2xl bg-primary text-white shadow-md">
                  <div className="text-sm font-medium opacity-80 mb-2">Estimated Yearly ROI</div>
                  <div className="text-3xl md:text-5xl font-bold">${yearlySavings.toLocaleString()}</div>
                </div>
              </div>

              <Link 
                to="/contact" 
                className="inline-flex items-center justify-center w-full gap-2 py-4 glass-card bg-background/80 backdrop-blur-xl text-primary font-bold rounded-xl border border-primary/20 hover:bg-primary hover:text-text transition-all shadow-sm"
              >
                <Calculator size={20} />
                Get a Custom ROI Audit
              </Link>
            </motion.div>
          </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default ROICalculator;
