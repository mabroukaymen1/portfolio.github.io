import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LineFollowerArcade from './LineFollowerArcade';
import Navbar from '../../components/Controls/Navbar';
import { getPageTransition } from '../../design/motion';

const LineFollower: React.FC = () => {
  const pageTransition = getPageTransition();

  return (
    <div className="min-h-screen w-full relative overflow-hidden bg-[#F6ECD7] dark:bg-gray-900 transition-colors duration-500">
      
      {/* Background Grid Pattern - Arcade */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] z-0" style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

      {/* Navigation */}
      <Navbar />

      <AnimatePresence mode="wait">
        <motion.div
          key="arcade"
          {...pageTransition}
          className="h-screen w-full relative overflow-y-auto scrollbar-hide z-10"
        >
          <LineFollowerArcade />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default LineFollower;
