import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ArcadeLayout from '../../components/ArcadeLayout/ArcadeLayout';
import { useViewMode } from '../../context/viewModeHooks';
import Navbar from '../../components/Controls/Navbar';
import clsx from 'clsx';

const Home: React.FC = () => {
  const { mode, isArcade, isTerminal } = useViewMode();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={clsx("min-h-screen w-full relative overflow-hidden transition-colors duration-500", {
      "bg-black": isTerminal,
      "bg-[#F6ECD7] dark:bg-gray-900": isArcade,
    })}>
      
      {/* Background Grid Pattern - Arcade/Mixed */}
      {mode !== 'terminal' && (
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.07] z-0" style={{ backgroundImage: `radial-gradient(circle, #000 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
      )}

      <AnimatePresence>
        {isLoading && (
          <motion.div
            key="loader"
            exit={{ opacity: 0, scale: 1.1 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center font-mono text-green-500 pointer-events-none"
          >
            <motion.div 
               animate={{ opacity: [1, 0.5, 1] }}
               transition={{ repeat: Infinity, duration: 1 }}
               className="text-2xl font-black uppercase tracking-[0.5em] mb-4"
            >
              System Booting
            </motion.div>
            <div className="w-64 h-1 bg-green-900/30 relative overflow-hidden rounded-full">
               <motion.div 
                 initial={{ left: '-100%' }}
                 animate={{ left: '100%' }}
                 transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
                 className="absolute inset-0 bg-green-500"
               />
            </div>
            <div className="mt-8 text-[10px] opacity-40 uppercase tracking-widest">Aymen.M Terminal v2.0.25</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <Navbar />

      <AnimatePresence>
        <motion.div
          key="arcade-view"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="h-screen w-full relative overflow-y-auto scrollbar-hide z-10"
        >
          <ArcadeLayout />
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default Home;
