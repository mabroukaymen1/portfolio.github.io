import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import TranslationAnimation from './TranslationAnimation';

const TranslationAIDemo: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Live Translation Demo</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Interactive Translation Animation */}
        <TranslationAnimation />

        {/* Static Visual from Original */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">Dialectal Processing</span>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-center gap-8">
             <div className="bg-slate-800 p-6 rounded-2xl text-center w-full md:w-1/3 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">Tunisian Arabic</h3>
                <p className="text-2xl font-arabic text-blue-400">"شكون يضرب الجرس؟"</p>
             </div>
             
             <div className="flex flex-col items-center text-slate-500">
                <i className="fas fa-arrow-down md:rotate-[-90deg] text-2xl mb-2"></i>
                <span className="text-xs font-bold uppercase tracking-wider">AI Model</span>
                <i className="fas fa-arrow-down md:rotate-[-90deg] text-2xl mt-2"></i>
             </div>

             <div className="bg-slate-800 p-6 rounded-2xl text-center w-full md:w-1/3 border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-2">English</h3>
                <p className="text-2xl font-bold text-emerald-400">"Who rang the bell?"</p>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TranslationAIDemo;
