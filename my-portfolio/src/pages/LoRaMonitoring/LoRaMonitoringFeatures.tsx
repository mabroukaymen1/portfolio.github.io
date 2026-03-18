import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const features = [
  {
    title: 'Long-Range Communication',
    description: 'Transmit data up to 300m in urban environments using 868MHz LoRa protocol.',
    icon: 'fa-satellite-dish',
    color: 'emerald'
  },
  {
    title: 'Low Power Consumption',
    description: 'Only 0.5mA current draw during active transmission, enabling long battery life.',
    icon: 'fa-bolt',
    color: 'amber'
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Live temperature and humidity updates displayed on OLED and Firebase dashboard.',
    icon: 'fa-chart-line',
    color: 'blue'
  },
  {
    title: 'Cloud Data Sync',
    description: 'Firebase integration for remote access, historical analysis, and data persistence.',
    icon: 'fa-cloud-upload-alt',
    color: 'indigo'
  }
];

const LoRaMonitoringFeatures: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">System Capabilities</h2>
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

export default LoRaMonitoringFeatures;
