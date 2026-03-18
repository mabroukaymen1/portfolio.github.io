import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const MegaTellSummary: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

  return (
    <section className="py-20 px-6 bg-slate-900 text-white dark:bg-slate-950">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
        >
          <div>
            <h2 className="text-3xl font-black mb-6 tracking-tight">Backend Implementation</h2>
            <ul className="space-y-4 text-slate-400">
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1" />
                <span>JWT-based authentication system for secure user access</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1" />
                <span>MongoDB with Mongoose for robust data modeling</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1" />
                <span>Comprehensive error handling and logging protocols</span>
              </li>
              <li className="flex gap-3">
                <i className="fas fa-check-circle text-blue-500 mt-1" />
                <span>Role-based access control for administrative functions</span>
              </li>
            </ul>
          </div>
          
          <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">Project Status</h3>
            <div className="space-y-4 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Version</span>
                <span className="font-mono">v1.2.0-alpha</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Stability</span>
                <span className="text-yellow-500">Active Prototype</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-500 uppercase tracking-widest text-[10px]">Lines of Code</span>
                <span className="font-mono">~12.4k</span>
              </div>
              <div className="pt-4">
                <p className="text-slate-400 leading-relaxed italic">
                  "This project served as a deep dive into full-stack mobile architecture, bridging the gap between responsive Dart UI and scalable Node.js infrastructure."
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default MegaTellSummary;
