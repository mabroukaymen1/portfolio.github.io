import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const LineFollowerSummary: React.FC = () => {
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
              <h3 className="text-violet-400 font-bold uppercase tracking-tight mb-4">Technical Challenges</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Tuning IR sensor thresholds for reliable line detection across different lighting conditions was critical. Balancing motor speed with turning precision required extensive PID-style adjustments to achieve smooth navigation.
              </p>
            </div>
            <div>
              <h3 className="text-violet-400 font-bold uppercase tracking-tight mb-4">Key Learnings</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Gained hands-on experience in embedded systems programming, sensor integration, and wireless communication. The project reinforced the importance of systematic debugging and incremental testing in robotics development.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-violet-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Project Status: Academic / Completed</span>
             </div>
             <p className="text-sm text-slate-300">
                Developed at Institut Supérieur d'Informatique de Mahdia during the 2024-2025 academic year. The robot demonstrates practical applications of embedded systems for educational purposes and automated transport systems.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LineFollowerSummary;
