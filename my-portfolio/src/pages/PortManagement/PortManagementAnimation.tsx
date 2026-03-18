import React from 'react';
import { motion } from 'framer-motion';

const PortManagementAnimation: React.FC = () => {
  return (
    <div className="relative w-full h-64 md:h-96 bg-slate-900 rounded-3xl overflow-hidden mb-12 border-4 border-slate-800 flex items-center justify-center">
      {/* Sky & Sea Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-sky-900 to-blue-900" />
      <div className="absolute bottom-0 h-1/3 w-full bg-blue-950/50" />
      
      {/* Ship */}
      <motion.div 
        className="absolute bottom-1/3 left-0"
        animate={{ 
          x: [0, 50, 50, 100, 200, 300],
          y: [0, 2, -2, 0]
        }}
        transition={{ 
          x: { duration: 10, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 40H110L100 60H20L10 40Z" fill="#334155" />
          <rect x="30" y="20" width="20" height="20" fill="#EF4444" />
          <rect x="55" y="20" width="20" height="20" fill="#3B82F6" />
          <rect x="80" y="20" width="20" height="20" fill="#F59E0B" />
          <rect x="40" y="10" width="40" height="10" fill="#FFFFFF" />
        </svg>
      </motion.div>

      {/* Crane */}
      <div className="absolute right-10 bottom-1/3 transform translate-y-10">
        <svg width="100" height="150" viewBox="0 0 100 150" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="40" y="50" width="10" height="100" fill="#F59E0B" />
          <motion.g
            animate={{ rotate: [0, -20, -20, 0] }}
            transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}
            style={{ originX: "45px", originY: "50px" }}
          >
             <rect x="10" y="50" width="80" height="5" fill="#F59E0B" />
             <motion.line 
               x1="20" y1="55" x2="20" y2="100" 
               stroke="#000" strokeWidth="2"
               animate={{ y2: [80, 120, 120, 80] }}
               transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}
             />
             <motion.rect 
               x="10" y="100" width="20" height="15" fill="#3B82F6"
               animate={{ y: [0, 40, 40, 0] }}
               transition={{ duration: 5, repeat: Infinity, repeatDelay: 1 }}
             />
          </motion.g>
        </svg>
      </div>
      
      {/* Cloud */}
      <motion.div
        className="absolute top-10 left-10 opacity-50"
        animate={{ x: [0, 100, 200] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="15" cy="15" r="15" fill="white" />
          <circle cx="35" cy="10" r="10" fill="white" />
          <circle cx="45" cy="15" r="15" fill="white" />
        </svg>
      </motion.div>

      {/* Overlay Text */}
      <div className="absolute top-4 right-4 bg-black/50 px-3 py-1 rounded text-xs font-mono text-green-400">
        STATUS: OPERATIONAL
      </div>
    </div>
  );
};

export default PortManagementAnimation;
