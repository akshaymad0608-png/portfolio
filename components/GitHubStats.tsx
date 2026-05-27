import React, { useMemo } from 'react';
import { ActivityCalendar, ThemeInput } from 'react-activity-calendar';
import { motion } from 'framer-motion';
import { Github, GitPullRequest, GitCommit, GitMerge } from 'lucide-react';
import { subDays, format } from 'date-fns';

const generateMockData = () => {
  const data = [];
  const today = new Date();
  for (let i = 365; i >= 0; i--) {
    const date = subDays(today, i);
    // Generate more activity on weekdays, less on weekends
    const isWeekend = date.getDay() === 0 || date.getDay() === 6;
    const baseProbability = isWeekend ? 0.3 : 0.8;
    
    let count = 0;
    if (Math.random() < baseProbability) {
      count = Math.floor(Math.random() * 8) + 1;
    }
    
    // Some random highly active days
    if (Math.random() < 0.05) {
      count = Math.floor(Math.random() * 15) + 10;
    }
    
    let level = 0;
    if (count > 0 && count <= 3) level = 1;
    else if (count > 3 && count <= 6) level = 2;
    else if (count > 6 && count <= 10) level = 3;
    else if (count > 10) level = 4;

    data.push({
      date: format(date, 'yyyy-MM-dd'),
      count,
      level,
    });
  }
  return data;
};

const GitHubStats: React.FC = () => {
  const activityData = useMemo(() => generateMockData(), []);

  const theme: ThemeInput = {
    dark: ['#1e293b', '#004a40', '#008573', '#00bfa5', '#00f5d4']
  };

  return (
    <section id="github-stats" className="py-20 md:py-32 relative scroll-mt-24 border-t border-white/5">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none" style={{ background: 'rgba(240, 255, 68, 0.03)' }}></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center"
          >
            <span className="font-mono text-xs text-neonLime tracking-[0.25em] uppercase flex items-center gap-2 mb-3">
              <Github className="w-4 h-4" /> Code Contributions
            </span>
            <h2 className="font-display font-black text-white text-3xl md:text-5xl mb-4">
              Active <span className="text-transparent bg-clip-text bg-gradient-to-r from-neonLime to-electric">Engagement</span>
            </h2>
            <p className="text-slate-400 max-w-xl mx-auto text-sm md:text-base">
              A transparent view of my open-source and private repository contributions, demonstrating consistent engineering velocity.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-3xl p-5 md:p-10 border border-white/10 relative overflow-hidden"
        >
          {/* Decorative background elements inside the card */}
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[80px] -mr-20 -mt-20 pointer-events-none" style={{ background: 'rgba(0, 245, 212, 0.05)' }}></div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row gap-8 items-center md:items-start justify-center"
          >
            <div className="flex-grow w-full max-w-[850px] overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-electric/50 scrollbar-track-transparent">
              <div className="min-w-[750px] md:min-w-[800px] flex justify-start md:justify-center pr-4 md:pr-0">
                <ActivityCalendar 
                  data={activityData}
                  colorScheme="dark"
                  theme={theme}
                  fontSize={14}
                  blockSize={13}
                  blockMargin={5}
                  blockRadius={3}
                  labels={{
                    totalCount: '{{count}} contributions in the last year',
                  }}
                />
              </div>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-4 mt-6 md:mt-8 pt-6 md:pt-8 border-t border-white/5">
            {[
              { icon: GitCommit, title: '1,240+', subtitle: 'Commits', colorClass: 'text-electric', bgClass: 'bg-electric/10' },
              { icon: GitPullRequest, title: '180+', subtitle: 'Pull Requests', colorClass: 'text-neonLime', bgClass: 'bg-neonLime/10' },
              { icon: GitMerge, title: '85+', subtitle: 'Code Reviews', colorClass: 'text-electric', bgClass: 'bg-electric/10' },
              { icon: Github, title: 'Open Source', subtitle: 'Contributor', colorClass: 'text-neonLime', bgClass: 'bg-neonLime/10' }
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className="flex items-center gap-4 md:gap-3"
              >
                <div className={`w-10 h-10 rounded-xl ${stat.bgClass} flex items-center justify-center`}>
                  <stat.icon className={`w-5 h-5 ${stat.colorClass}`} />
                </div>
                <div>
                  <div className="font-display font-bold text-lg text-white">{stat.title}</div>
                  <div className="font-mono text-[10px] text-slate-500 uppercase tracking-widest">{stat.subtitle}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GitHubStats;
