import React from 'react';
import { getAssetUrl } from '../../utils/assets';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import SmartHomeAnimation from './SmartHomeAnimation';

const SmartHomeDemo: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">Live Showcase</h2>
          <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full" />
        </motion.div>

        {/* Interactive Smart Home Animation */}
        <SmartHomeAnimation />

        {/* System Architecture Diagram */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">System Architecture</span>
          </div>
          <img 
            src={getAssetUrl('image/smartarchi.png')} 
            alt="Smart Home System Architecture" 
            className="w-full max-w-3xl mx-auto rounded-lg opacity-90 hover:opacity-100 transition-opacity"
            loading="lazy"
          />
        </motion.div>

        {/* App Preview */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">Mobile App Interface</span>
          </div>
          <img 
            src={getAssetUrl('image/smartintro.png')} 
            alt="Smart Home Mobile App" 
            className="w-full max-w-md mx-auto rounded-xl shadow-xl"
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default SmartHomeDemo;

