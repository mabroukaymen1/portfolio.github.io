import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const features = [
  {
    title: 'Automated Filling',
    description: 'Precise liquid flow control via solenoid valves for accurate bottle filling.',
    icon: 'fa-tint',
    color: 'cyan'
  },
  {
    title: 'Auto Capping',
    description: 'Stepper motor-powered capping mechanism with position detection.',
    icon: 'fa-cogs',
    color: 'blue'
  },
  {
    title: 'Real-Time Monitoring',
    description: 'Live production stats synced to mobile app via Firebase.',
    icon: 'fa-chart-line',
    color: 'teal'
  },
  {
    title: 'Remote Control',
    description: 'Flutter app enables parameter configuration from anywhere.',
    icon: 'fa-mobile-alt',
    color: 'indigo'
  }
];

const AquaTechFeatures: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">System Features</h2>
          <div className="h-1 w-20 bg-cyan-500 mx-auto rounded-full" />
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
              className="bg-white dark:bg-slate-800 p-8 rounded-2xl border-2 border-slate-100 dark:border-slate-700 shadow-sm hover:border-cyan-500 transition-colors group"
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

export default AquaTechFeatures;
