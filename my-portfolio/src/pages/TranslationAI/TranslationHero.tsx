import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const TranslationHero: React.FC = () => {
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
        <span className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-bold uppercase tracking-widest mb-4">
          AI-Powered Translation
        </span>
        <h1 className="text-5xl md:text-7xl font-black text-slate-900 dark:text-white mb-6 tracking-tighter">
          Tunisian Translator
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
          An advanced neural machine translation system built on mBART-50, fine-tuned to translate Tunisian Arabic dialect to English with high accuracy.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <a 
            href="https://github.com/mabroukaymen1/tunisian_english" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 hover:scale-105 transition-all shadow-lg shadow-emerald-500/20"
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

export default TranslationHero;
