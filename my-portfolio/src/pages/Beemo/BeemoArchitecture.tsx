import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const steps = [
  {
    title: 'Voice Capture',
    details: 'High-quality microphone captures voice commands in English with advanced noise filtering.',
    tag: 'Input'
  },
  {
    title: 'Speech Recognition',
    details: 'VOSK ASR processes audio, converting speech to text with high accuracy.',
    tag: 'Process'
  },
  {
    title: 'Intent Analysis',
    details: 'Gemini AI analyzes the transcribed text to understand user intentions.',
    tag: 'AI'
  },
  {
    title: 'Task Execution',
    details: 'Commands are executed through TCP/IP or REST API to control devices.',
    tag: 'Control'
  },
  {
    title: 'Feedback Response',
    details: 'Real-time feedback provided through mobile app and robot expressions.',
    tag: 'Output'
  }
];

const BeemoArchitecture: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">System Architecture</h2>
          <p className="text-slate-600 dark:text-slate-400">Perception → Reasoning → Action pipeline for intelligent automation.</p>
        </motion.div>

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
              className="flex gap-6 items-start p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-purple-500"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-purple-500/10 rounded-lg flex items-center justify-center font-black text-purple-500">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold uppercase tracking-tight dark:text-white">{step.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-purple-500/10 text-purple-500 font-black rounded uppercase tracking-widest">{step.tag}</span>
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

export default BeemoArchitecture;
