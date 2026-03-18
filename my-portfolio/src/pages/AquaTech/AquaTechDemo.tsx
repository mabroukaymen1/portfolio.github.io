import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import AquaTechBottleAnimation from './AquaTechBottleAnimation';

const stats = [
  { value: '85%', label: 'Water Tank Level', desc: 'Current tank capacity' },
  { value: '120', label: 'Bottles Processed', desc: 'Daily production count' },
  { value: '98%', label: 'Fill Accuracy', desc: 'Precision measurement' },
  { value: 'Active', label: 'System Status', desc: 'Real-time monitoring' },
];

const AquaTechDemo: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Production Dashboard</h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
        </motion.div>

        {/* Interactive Bottle Animation */}
        <AquaTechBottleAnimation />

        {/* Stats Grid */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 mb-12"
        >
          {stats.map((stat, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-slate-900 dark:bg-slate-800 p-6 rounded-2xl text-center border border-cyan-500/20 hover:border-cyan-500 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-black text-cyan-400 mb-2">{stat.value}</div>
              <h3 className="text-white font-bold uppercase tracking-tight mb-1">{stat.label}</h3>
              <p className="text-xs text-slate-400">{stat.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* System Image */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">Control Interface</span>
          </div>
          <img 
            src="image/farma.png" 
            alt="AquaTech Control System" 
            className="w-full max-w-lg mx-auto rounded-xl shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default AquaTechDemo;

