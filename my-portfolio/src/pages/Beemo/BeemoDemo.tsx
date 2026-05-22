import React from 'react';
import { getAssetUrl } from '../../utils/assets';
import { motion } from 'framer-motion';
import { getFadeInUp, containerStagger } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';
import BeemoAnimation from './BeemoAnimation';

const demoFeatures = [
  { title: 'Voice Command Demo', desc: 'Control lights, music, and devices with English voice commands.', icon: 'fa-microphone' },
  { title: 'Mobile App Control', desc: 'Monitor and manage tasks through the Flutter-based mobile app.', icon: 'fa-mobile-alt' },
  { title: 'Secure Pairing', desc: 'QR code authentication for secure device and robot connections.', icon: 'fa-qrcode' },
];

const BeemoDemo: React.FC = () => {
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
          <h2 className="text-3xl font-black uppercase tracking-tighter mb-4">AI Showcase</h2>
          <div className="h-1 w-20 bg-purple-500 mx-auto rounded-full" />
        </motion.div>

        {/* Video Showcase (YouTube Shorts) */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mb-20 max-w-[400px] mx-auto"
        >
          <div className="rounded-3xl overflow-hidden border-8 border-slate-900 dark:border-slate-800 shadow-2xl aspect-[9/16] bg-black relative group">
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/nUblfhb3bI4" 
              title="Beemo Showcase" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
              allowFullScreen
              className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none border border-white/10 rounded-[1.4rem]"></div>
          </div>
          <p className="text-center text-slate-500 dark:text-slate-400 text-xs mt-4 font-mono uppercase tracking-[0.2em]">Live Interaction Demo</p>
        </motion.div>

        {/* Interactive Beemo Animation */}
        <div className="mb-20">
          <BeemoAnimation />
        </div>

        {/* System Diagram */}
        <motion.div 
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8 mb-12"
        >
          <div className="text-center mb-6">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">System Workflow</span>
          </div>
          <img 
            src={getAssetUrl('image/beemo/beemo2.png')} 
            alt="Beemo System Workflow" 
            className="w-full max-w-2xl mx-auto rounded-xl shadow-xl hover:scale-[1.02] transition-transform duration-500"
            loading="lazy"
          />
        </motion.div>

        {/* Demo Features */}
        <motion.div 
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {demoFeatures.map((feature, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp}
              className="bg-slate-900 dark:bg-slate-800 p-6 rounded-2xl text-center border border-purple-500/20 hover:border-purple-500 transition-colors"
            >
              <i className={`fas ${feature.icon} text-purple-400 text-2xl mb-4`} />
              <h3 className="text-white font-bold uppercase tracking-tight mb-2">{feature.title}</h3>
              <p className="text-sm text-slate-400">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default BeemoDemo;

