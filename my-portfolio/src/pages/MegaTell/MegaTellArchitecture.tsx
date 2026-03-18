import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const architectureLayers = [
  {
    title: 'Node.js Backend',
    description: 'RESTful API built with Express.js handling authentication, data processing, and business logic with JWT security.',
    icon: 'fas fa-server'
  },
  {
    title: 'MongoDB Database',
    description: 'NoSQL database storing user profiles, agent details, bookings, and transactions with optimized queries.',
    icon: 'fas fa-database'
  },
  {
    title: 'Flutter Frontend',
    description: 'Cross-platform mobile app with responsive UI, state management, and API integration for seamless user experience.',
    icon: 'fas fa-mobile-alt'
  }
];

const MegaTellArchitecture: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

  return (
    <section className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Technical Architecture</h2>
        <div className="space-y-6">
          {architectureLayers.map((layer, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="flex flex-col md:flex-row items-center md:items-start gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800"
            >
              <div className="w-16 h-16 shrink-0 bg-blue-500/10 text-blue-500 rounded-2xl flex items-center justify-center text-2xl">
                <i className={layer.icon} />
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-white">{layer.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic md:not-italic">
                  {layer.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MegaTellArchitecture;
