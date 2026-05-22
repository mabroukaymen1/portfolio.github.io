import React from 'react';
import { getAssetUrl } from '../../utils/assets';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const demoImages = [
  { src: 'image/mega/mega1.png', alt: 'Agent Directory' },
  { src: 'image/mega/mega2.png', alt: 'API Management' },
  { src: 'image/mega/mega3.png', alt: 'Booking System' }
];

const MegaTellDemo: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 text-center text-slate-900 dark:text-white">Product Showcase</h2>
        
        {/* Main Video Demo */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 max-w-[400px] mx-auto"
        >
          <div className="rounded-3xl overflow-hidden border-8 border-slate-900 dark:border-slate-800 shadow-2xl aspect-[9/16] bg-black relative group">
            <video 
              controls 
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
              poster={getAssetUrl('image/megaintroduce.png')}
            >
              <source src={getAssetUrl('videos/mega.mp4')} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.4rem]"></div>
          </div>
          <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-4 font-mono uppercase tracking-[0.2em]">Live Interaction Demo</p>
        </motion.div>

        {/* Screenshot Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoImages.map((img, idx) => (
            <motion.div 
              key={idx}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-900 shadow-sm"
            >
              <img 
                src={getAssetUrl(img.src)} 
                alt={img.alt} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                loading="lazy"
              />
              <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                 <span className="text-white font-bold text-sm tracking-widest uppercase">View Screen</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MegaTellDemo;
