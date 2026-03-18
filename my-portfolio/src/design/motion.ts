import type { Variants } from 'framer-motion';
import type { ViewMode } from '../context/viewModeHooks';

// Animation Constants
const SPRING_BOUNCE = { type: 'spring' as const, stiffness: 300, damping: 15 };

export const getFadeInUp = (mode: ViewMode): Variants => {
  if (mode === 'terminal') {
    return {
      hidden: { opacity: 0, y: 10 },
      visible: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.1, ease: 'linear' } 
      }
    };
  }
  return {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: SPRING_BOUNCE
    }
  };
};

export const getCardHover = (mode: ViewMode): Variants => {
  if (mode === 'terminal') {
    return {
      hover: { 
        x: 4, 
        transition: { duration: 0.05 } 
      }
    };
  }
  return {
    hover: { 
      scale: 1.05,
      y: -5,
      rotate: 1,
      transition: { type: 'spring', stiffness: 400, damping: 10 }
    }
  };
};

export const containerStagger = (mode: ViewMode): Variants => {
  return {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: mode === 'terminal' ? 0.05 : 0.1
      }
    }
  };
};

export const getPageTransition = () => {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.3 }
  };
}
