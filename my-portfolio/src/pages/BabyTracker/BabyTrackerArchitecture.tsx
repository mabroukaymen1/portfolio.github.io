import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const layers = [
  {
    title: 'Data Collection',
    details: 'Parent input for feeding, sleep, and pain metrics via mobile UI.',
    icon: 'fa-input-pipe',
    tag: 'Frontend'
  },
  {
    title: 'Cloud Sync & Storage',
    details: 'Firebase real-time synchronization and secure data storage.',
    icon: 'fa-cloud-upload-alt',
    tag: 'Backend'
  },
  {
    title: 'Care Insights',
    details: 'Automated vaccination schedules and health data visualization.',
    icon: 'fa-chart-line',
    tag: 'Processing'
  },
  {
    title: 'Actionable Alerts',
    details: 'Push notifications for feeding reminders and medical checks.',
    icon: 'fa-bell',
    tag: 'Output'
  }
];

const BabyTrackerArchitecture: React.FC = () => {
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
          <p className="text-slate-600 dark:text-slate-400">Streamlining healthcare management through integrated mobile and cloud technologies.</p>
        </motion.div>

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-6"
        >
          {layers.map((layer, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="flex gap-6 items-start p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-blue-500"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-blue-500/10 rounded-lg flex items-center justify-center">
                <i className={`fas ${layer.icon} text-blue-500`} />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold uppercase tracking-tight dark:text-white">{layer.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-blue-500/10 text-blue-500 font-black rounded uppercase tracking-widest">{layer.tag}</span>
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{layer.details}</p>
              </div>
              <div className="hidden md:flex flex-col items-center justify-center opacity-10">
                <span className="text-2xl font-black italic">0{idx + 1}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BabyTrackerArchitecture;
