import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const AquaTechSummary: React.FC = () => {
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
              <h3 className="text-cyan-400 font-bold uppercase tracking-tight mb-4">Technical Challenges</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Achieving precise liquid flow control required careful calibration of solenoid valve timing. Synchronizing Firebase real-time updates with hardware execution demanded robust error handling and network resilience.
              </p>
            </div>
            <div>
              <h3 className="text-cyan-400 font-bold uppercase tracking-tight mb-4">Key Learnings</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Gained extensive experience in IoT system integration, industrial automation, and cross-platform mobile development. The project reinforced the importance of real-time synchronization and fail-safe mechanisms in production environments.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Project Status: Active Development</span>
             </div>
             <p className="text-sm text-slate-300">
                Developed at Institut Supérieur d'Informatique de Mahdia. Project conceived by <strong>Louay Mdimagh</strong>. The system demonstrates industrial IoT applications with Flutter frontend and ESP32 hardware control.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AquaTechSummary;
