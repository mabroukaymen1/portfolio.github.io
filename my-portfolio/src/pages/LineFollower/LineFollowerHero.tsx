import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const LineFollowerHero: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

  return (
    <section className="py-20 px-6">
      <motion.div 
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="max-w-4xl mx-auto text-center"
      >
        <span className="inline-block px-3 py-1 rounded-full bg-violet-500/10 text-violet-500 text-xs font-bold uppercase tracking-widest mb-4">
          Embedded Systems Project
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
          Line Follower Robot
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          An innovative Arduino-based robot combining autonomous line following with Bluetooth-controlled navigation and obstacle avoidance.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://github.com/mabroukaymen1/flowingcar" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-violet-600 text-white font-bold rounded-lg hover:bg-violet-700 hover:scale-105 transition-all shadow-lg shadow-violet-500/20"
          >
            View Code
          </a>
          <button 
            onClick={() => window.history.back()}
            className="px-8 py-3 border border-slate-200 dark:border-slate-800 font-bold rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </motion.div>
    </section>
  );
};

export default LineFollowerHero;
