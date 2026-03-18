import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const PortManagementSummary: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-8 border-b border-white/10 pb-6">Project Insights</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-blue-400 font-bold uppercase tracking-tight mb-4">Development Challenges</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Ensuring reliable real-time synchronization in a potentially low-connectivity port environment was key. We utilized Firebase's offline capabilities to queue updates and sync when connectivity is restored.
              </p>
            </div>
            <div>
              <h3 className="text-blue-400 font-bold uppercase tracking-tight mb-4">Key Outcomes</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                The application significantly reduced equipment downtime by enabling faster reporting and automated maintenance scheduling. Workflow transparency improved employee accountability and resource allocation.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Project Status: Active Development</span>
             </div>
             <p className="text-sm text-slate-300">
                A robust Flutter-based mobile application designed to optimize port operations, equipment maintenance, and employee workflows.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PortManagementSummary;
