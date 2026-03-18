import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const steps = [
  {
    title: 'Sensor Data Collection',
    details: 'DHT11 sensor measures temperature (±2°C) and humidity (±5%) values.',
    tag: 'Input'
  },
  {
    title: 'LoRa Transmission',
    details: 'Data encoded and transmitted at 868MHz frequency with 125kHz bandwidth.',
    tag: 'Process'
  },
  {
    title: 'Signal Reception',
    details: 'Receiver captures LoRa signal with RSSI between -80dBm to -120dBm.',
    tag: 'Process'
  },
  {
    title: 'Local Display',
    details: 'Real-time data displayed on 128x64 pixel OLED screen.',
    tag: 'Output'
  },
  {
    title: 'Cloud Synchronization',
    details: 'Data uploaded to Firebase via Wi-Fi for remote monitoring and analysis.',
    tag: 'Sync'
  }
];

const LoRaMonitoringArchitecture: React.FC = () => {
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
          <p className="text-slate-600 dark:text-slate-400">Complete data flow from sensor collection to cloud synchronization.</p>
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

export default LoRaMonitoringArchitecture;
