import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const BabyTrackerSummary: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

  return (
    <section className="py-20 bg-slate-900 text-white px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-6">Project Reflection</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-blue-400 font-bold uppercase tracking-tight mb-4">Development Challenges</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Building healthcare-focused software requires extreme precision in vaccination scheduling and pain score visualization. Ensuring data accuracy across diverse device types and maintaining a responsive multilingual interface (Arabic/French/English) was a primary technical hurdle.
              </p>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold uppercase tracking-tight mb-4">Key Learnings</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The project highlighted the importance of user-centric design for parents under stress. Implementing real-time Firebase sync taught me valuable lessons in conflict resolution and offline-first data management for mobile applications.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Project Status: Prototype / Active Development</span>
             </div>
             <p className="text-sm text-slate-300">
                BabyTracker is currently evolving with more advanced health diagnostics and enhanced chatbot capabilities to serve a wider demographic of healthcare providers.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BabyTrackerSummary;
