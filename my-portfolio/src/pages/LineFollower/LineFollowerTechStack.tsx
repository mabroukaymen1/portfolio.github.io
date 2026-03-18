import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const technologies = [
  { name: 'Arduino', category: 'MCU' },
  { name: 'C/C++', category: 'Language' },
  { name: 'ESP32', category: 'Processor' },
  { name: 'IR Sensors', category: 'Detection' },
  { name: 'Ultrasonic Sensor', category: 'Obstacle' },
  { name: 'L298N H-Bridge', category: 'Motor Driver' },
  { name: 'HC-05 Bluetooth', category: 'Communication' },
  { name: 'DC Motors', category: 'Actuators' },
];

const LineFollowerTechStack: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 bg-slate-50 dark:bg-slate-900/50 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Technology Stack</h2>
          <div className="h-1 w-20 bg-violet-500 mx-auto rounded-full" />
        </motion.div>

        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          {technologies.map((tech, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 text-center hover:border-violet-500 hover:shadow-md transition-all group"
            >
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-1">{tech.category}</div>
              <div className="font-bold dark:text-white group-hover:text-violet-500 transition-colors uppercase tracking-tight">{tech.name}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LineFollowerTechStack;
