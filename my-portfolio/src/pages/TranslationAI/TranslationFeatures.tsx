import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const features = [
  {
    title: 'Memory Optimization',
    description: 'Gradient checkpointing, mixed-precision training, and 8-bit quantization for efficient GPU usage.',
    icon: 'fa-memory',
    color: 'emerald'
  },
  {
    title: 'Dialect Processing',
    description: 'Extended vocabulary with SentencePiece tokenization and code-switching tokens for Tunisian Arabic.',
    icon: 'fa-language',
    color: 'blue'
  },
  {
    title: 'Advanced Training',
    description: 'Curriculum learning, noise injection, data augmentation, and early stopping for optimal performance.',
    icon: 'fa-brain',
    color: 'violet'
  },
  {
    title: 'Flexible Deployment',
    description: 'FastAPI endpoint, ONNX export, Docker containerization, and interactive console for testing.',
    icon: 'fa-rocket',
    color: 'amber'
  }
];

const TranslationFeatures: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Neural Modules</h2>
          <div className="h-1 w-20 bg-emerald-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:border-emerald-500 transition-colors group"
            >
              <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <i className={`fas ${feature.icon} text-${feature.color}-500 text-xl`} />
              </div>
              <h3 className="text-lg font-bold mb-3 dark:text-white uppercase tracking-tight">{feature.title}</h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TranslationFeatures;
