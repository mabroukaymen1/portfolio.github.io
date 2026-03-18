import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const techItems = [
  'Flutter', 'Dart', 'Node.js', 'MongoDB', 
  'Express', 'Postman', 'REST API', 'JWT', 
  'Mongoose', 'State Management'
];

const MegaTellTechStack: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-12 text-slate-900 dark:text-white">Technology Stack</h2>
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-4"
        >
          {techItems.map((tech, idx) => (
            <motion.span 
              key={idx}
              variants={fadeInUp}
              className="px-6 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-700 dark:text-slate-300 font-medium text-sm transition-all hover:scale-105 hover:border-blue-400 dark:hover:border-blue-500"
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MegaTellTechStack;
