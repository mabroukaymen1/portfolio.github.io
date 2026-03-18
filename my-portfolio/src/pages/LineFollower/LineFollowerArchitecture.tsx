import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const steps = [
  {
    title: 'IR Sensor Detection',
    details: 'Infrared sensors detect the black line and send signals to the microcontroller.',
    tag: 'Input'
  },
  {
    title: 'Signal Processing',
    details: 'Arduino processes sensor data and determines the robot\'s position relative to the line.',
    tag: 'Process'
  },
  {
    title: 'Motor Control',
    details: 'L298N H-Bridge driver controls motor speed and direction based on sensor feedback.',
    tag: 'Control'
  },
  {
    title: 'Obstacle Check',
    details: 'Ultrasonic sensor monitors path for obstacles and triggers avoidance maneuvers.',
    tag: 'Safety'
  },
  {
    title: 'Bluetooth Override',
    details: 'HC-05 module enables manual control via smartphone app when needed.',
    tag: 'Remote'
  }
];

const LineFollowerArchitecture: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Control Flow</h2>
          <p className="text-slate-600 dark:text-slate-400">How the robot processes input and executes navigation decisions.</p>
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
              className="flex gap-6 items-start p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border-l-4 border-violet-500"
            >
              <div className="w-12 h-12 flex-shrink-0 bg-violet-500/10 rounded-lg flex items-center justify-center font-black text-violet-500">
                {idx + 1}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-1">
                  <h3 className="font-bold uppercase tracking-tight dark:text-white">{step.title}</h3>
                  <span className="text-[10px] px-2 py-0.5 bg-violet-500/10 text-violet-500 font-black rounded uppercase tracking-widest">{step.tag}</span>
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

export default LineFollowerArchitecture;
