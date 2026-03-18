import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const steps = [
  {
    title: 'Input Processing',
    details: 'Tunisian Arabic text tokenized with dialect-enhanced SentencePiece tokenizer.',
    tag: 'Pre-process'
  },
  {
    title: 'Encoder Stack',
    details: '12 transformer encoder layers with multi-head attention and position bias.',
    tag: 'Encode'
  },
  {
    title: 'Cross-Attention',
    details: 'Decoder attends to encoder representations with learned temperature scaling.',
    tag: 'Decode'
  },
  {
    title: 'Output Generation',
    details: 'Autoregressive decoding with beam search produces English translation.',
    tag: 'Output'
  }
];

const specs = [
  { label: 'Architecture', value: 'Transformer (seq2seq)' },
  { label: 'Layers', value: '12 encoder, 12 decoder' },
  { label: 'Attention Heads', value: '16' },
  { label: 'Hidden Size', value: '1024' },
  { label: 'Parameters', value: '610M' },
  { label: 'Pretraining', value: '50 languages' },
];

const TranslationArchitecture: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Model Architecture</h2>
          <p className="text-slate-600 dark:text-slate-400">mBART-50 foundation with dialect-specific enhancements.</p>
        </motion.div>

        {/* Model Specs */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12"
        >
          {specs.map((spec, idx) => (
            <div key={idx} className="bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{spec.label}</div>
              <div className="font-bold dark:text-white">{spec.value}</div>
            </div>
          ))}
        </motion.div>

        {/* Pipeline Steps */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {steps.map((step, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="flex gap-6 items-start p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-emerald-500"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-emerald-500/10 rounded-lg flex items-center justify-center font-black text-emerald-500">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold uppercase tracking-tight dark:text-white">{step.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-emerald-500/10 text-emerald-500 font-black rounded uppercase tracking-widest">{step.tag}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{step.details}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TranslationArchitecture;
