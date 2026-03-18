import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const metrics = [
  { value: '32.7', label: 'BLEU-4 (Validation)', desc: 'Translation quality score' },
  { value: '31.2', label: 'BLEU-4 (Test)', desc: 'Generalization score' },
  { value: '45.3', label: 'TER', desc: 'Translation edit rate' },
  { value: '58.1', label: 'ChrF', desc: 'Character F-score' },
  { value: '42', label: 'Tokens/sec', desc: 'RTX 3090 inference speed' },
];

const sampleTranslations = [
  { source: 'شكون يضرب الجرس؟', target: 'Who rang the bell?' },
  { source: 'وين الماكلة؟', target: 'Where is the food?' },
];

const TranslationEvaluation: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Performance Metrics</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>

        {/* Metrics Grid */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12"
        >
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-slate-900 dark:bg-slate-800 p-6 rounded-2xl text-center border border-emerald-500/20 hover:border-emerald-500 transition-colors"
            >
              <div className="text-3xl md:text-4xl font-black text-emerald-400 mb-2">{metric.value}</div>
              <h3 className="text-white font-bold uppercase tracking-tight mb-1 text-sm">{metric.label}</h3>
              <p className="text-xs text-slate-400">{metric.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Sample Translations */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-8 border border-slate-200 dark:border-slate-700"
        >
          <h3 className="font-bold uppercase tracking-tight mb-6 dark:text-white">Sample Translations</h3>
          <div className="space-y-4">
            {sampleTranslations.map((sample, idx) => (
              <div key={idx} className="flex flex-col md:flex-row gap-4 items-center p-4 bg-white dark:bg-slate-900 rounded-xl">
                <div className="flex-1 text-right font-arabic text-lg dark:text-white" dir="rtl">{sample.source}</div>
                <div className="text-emerald-500 font-bold">→</div>
                <div className="flex-1 text-left text-slate-600 dark:text-slate-400">{sample.target}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TranslationEvaluation;
