import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import PortManagementAnimation from './PortManagementAnimation';

const impacts = [
  {
    title: 'Efficient Operations',
    description: 'Streamlines port operations with real-time tracking and task assignments, reducing downtime.',
    icon: 'fa-ship'
  },
  {
    title: 'Proactive Maintenance',
    description: 'Enables timely equipment maintenance and failure reporting, minimizing disruptions.',
    icon: 'fa-tools'
  },
  {
    title: 'Workforce Management',
    description: 'Enhances productivity through efficient task allocation and attendance tracking.',
    icon: 'fa-users'
  },
  {
    title: 'Data-Driven Decisions',
    description: 'Provides actionable insights through detailed analytics and reports.',
    icon: 'fa-chart-line'
  }
];

const PortManagementDemo: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Live Operations</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Video Showcase */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 max-w-[400px] mx-auto"
        >
          <div className="rounded-3xl overflow-hidden border-8 border-slate-900 dark:border-slate-800 shadow-2xl aspect-[9/16] bg-black relative group">
            <video 
              src="videos/port.mp4" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              controls
              poster="image/portintro.png"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.4rem]"></div>
          </div>
          <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-4 font-mono uppercase tracking-[0.2em]">Live Interaction Demo</p>
        </motion.div>

        {/* Interactive Animation */}
        <motion.div
           variants={fadeInUp}
           initial="hidden"
           whileInView="visible"
           viewport={{ once: true }}
           className="mb-20"
        >
             <PortManagementAnimation />
        </motion.div>

        {/* Impact Grid */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12"
        >
          {impacts.map((impact, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-start gap-4 hover:border-blue-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                 <i className={`fas ${impact.icon} text-blue-500`} />
              </div>
              <div>
                 <h3 className="font-bold uppercase tracking-tight mb-2 dark:text-white">{impact.title}</h3>
                 <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{impact.description}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default PortManagementDemo;
