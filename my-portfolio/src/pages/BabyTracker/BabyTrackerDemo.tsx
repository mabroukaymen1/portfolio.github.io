import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const screenshots = [
  { src: 'image/soft/soft1.png', alt: 'Chat Support' },
  { src: 'image/soft/soft2.png', alt: 'Vaccination Schedule' },
  { src: 'image/soft/soft3.png', alt: 'Breastfeeding Tracking' },
  { src: 'image/soft/soft4.png', alt: 'Pain Score Monitoring' },
  { src: 'image/soft/soft5.png', alt: 'Medical Library' },
];

const BabyTrackerDemo: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const stagger = containerStagger(mode);

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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Live Showcase</h2>
          <div className="h-1 w-20 bg-blue-500 mx-auto rounded-full" />
        </motion.div>

        {/* Video Feature */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-12 max-w-[400px] mx-auto"
        >
          <div className="rounded-3xl overflow-hidden border-8 border-slate-900 dark:border-slate-800 shadow-2xl aspect-[9/16] bg-black relative group">
            <video 
              src="videos/softshot.mp4" 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              controls
              poster="image/softintro.png"
            />
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.4rem]"></div>
          </div>
          <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-4 font-mono uppercase tracking-[0.2em]">Live Interaction Demo</p>
        </motion.div>

        {/* Screenshot Grid */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-5 gap-4"
        >
          {screenshots.map((shot, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              className="rounded-xl overflow-hidden border-2 border-slate-100 dark:border-slate-800 hover:border-blue-500 transition-colors cursor-zoom-in group"
            >
              <img 
                src={shot.src} 
                alt={shot.alt} 
                className="w-full h-auto group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BabyTrackerDemo;
