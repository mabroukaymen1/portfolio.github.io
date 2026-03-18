import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import LoRaAnimation from './LoRaAnimation';

const metrics = [
  { value: '300m', label: 'Transmission Range', desc: 'Effective communication in urban environment.' },
  { value: '0.5mA', label: 'Power Consumption', desc: 'Current draw during active transmission.' },
  { value: '2%', label: 'Packet Loss', desc: 'Reliable data transmission under normal conditions.' },
  { value: '±2°C', label: 'Accuracy', desc: 'DHT11 sensor precision in controlled environment.' },
];

const LoRaMonitoringDemo: React.FC = () => {
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

        {/* Interactive LoRa Animation */}
        <LoRaAnimation />

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {metrics.map((metric, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-slate-900 dark:bg-slate-800 p-6 rounded-2xl text-center border border-emerald-500/20 hover:border-emerald-500 transition-colors"
            >
              <div className="text-4xl md:text-5xl font-black text-emerald-400 mb-2">{metric.value}</div>
              <h3 className="text-white font-bold uppercase tracking-tight mb-2">{metric.label}</h3>
              <p className="text-sm text-slate-400">{metric.desc}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* System Diagram */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">System Diagram</span>
          </div>
          <img 
            src="image/loraa.png" 
            alt="LoRa System Diagram" 
            className="w-full max-w-2xl mx-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default LoRaMonitoringDemo;

