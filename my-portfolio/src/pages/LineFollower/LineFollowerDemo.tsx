import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import LineFollowerRobotAnimation from './LineFollowerRobotAnimation';
import LineFollowerCircuit from './LineFollowerCircuit';

const LineFollowerDemo: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Robot Showcase</h2>
          <div className="h-1 w-20 bg-violet-500 mx-auto rounded-full" />
        </motion.div>

        {/* Interactive Robot Animation */}
        <LineFollowerRobotAnimation />

        {/* Circuit Diagram */}
        <div className="mt-12">
          <LineFollowerCircuit />
        </div>

        {/* Robot Image */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">Hardware Assembly</span>
          </div>
          <img 
            src="image/robot.png" 
            alt="Line Follower Robot" 
            className="w-full max-w-lg mx-auto rounded-xl shadow-xl"
            loading="lazy"
          />
        </motion.div>

        {/* Operation Modes */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {[
            { title: 'Line Following', desc: 'Autonomous path tracking using IR sensors', icon: 'fa-route' },
            { title: 'Obstacle Avoidance', desc: 'Ultrasonic detection and navigation', icon: 'fa-shield-alt' },
            { title: 'Combined Mode', desc: 'Intelligent sensor fusion for complex paths', icon: 'fa-random' },
          ].map((mode, idx) => (
            <div key={idx} className="bg-slate-900 dark:bg-slate-800 p-6 rounded-2xl text-center border border-violet-500/20 hover:border-violet-500 transition-colors">
              <i className={`fas ${mode.icon} text-violet-400 text-2xl mb-4`} />
              <h3 className="text-white font-bold uppercase tracking-tight mb-2">{mode.title}</h3>
              <p className="text-sm text-slate-400">{mode.desc}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default LineFollowerDemo;

