import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const features = [
  {
    title: 'Agent Directory',
    description: 'Browse and filter professional agents with data fetched from MongoDB through Node.js API endpoints.',
    icon: 'fas fa-users-cog'
  },
  {
    title: 'Booking System',
    description: 'Add agents to a basket and confirm orders with a seamless checkout process powered by backend services.',
    icon: 'fas fa-calendar-check'
  },
  {
    title: 'API Management',
    description: 'Comprehensive API documentation and testing with Postman for all backend services.',
    icon: 'fas fa-file-code'
  }
];

const MegaTellFeatures: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

  return (
    <section className="py-20 px-6 bg-slate-50 dark:bg-slate-900/50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Core Features</h2>
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="p-8 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center mb-6 text-xl">
                <i className={feature.icon} />
              </div>
              <h3 className="text-xl font-bold mb-4 text-slate-900 dark:text-white">{feature.title}</h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default MegaTellFeatures;
