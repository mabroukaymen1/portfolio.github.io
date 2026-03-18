import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const BeemoSummary: React.FC = () => {
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
              <h3 className="text-purple-400 font-bold uppercase tracking-tight mb-4">Technical Challenges</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Integrating VOSK ASR for real-time voice recognition with high accuracy required careful audio processing and noise filtering. Coordinating Gemini AI intent analysis with device control demanded robust error handling and fallback mechanisms.
              </p>
            </div>
            <div>
              <h3 className="text-purple-400 font-bold uppercase tracking-tight mb-4">Key Learnings</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Gained extensive experience in AI integration, speech recognition, and natural language understanding. The project reinforced the importance of user experience design in voice-controlled systems and real-time communication architectures.
              </p>
            </div>
          </div>

          <div className="mt-12 p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm">
             <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span className="text-xs font-black uppercase tracking-widest text-slate-500">Project Status: Active Development</span>
             </div>
             <p className="text-sm text-slate-300">
                Beemo represents a breakthrough in AI-powered office automation, combining voice recognition with smart device control for a seamless workplace experience.
             </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeemoSummary;
