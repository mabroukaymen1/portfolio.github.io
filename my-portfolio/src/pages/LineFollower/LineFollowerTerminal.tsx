import React, { useRef, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTerminalSound } from '../../hooks/useTerminalSound';
import { useTerminalSequence } from '../../hooks/useTerminalSequence';
import '../../components/TerminalPanel/terminal.css';

interface TerminalStepProps {
  command: string;
  lines: string[];
  isActive: boolean;
  onComplete: () => void;
}

const TerminalStep: React.FC<TerminalStepProps> = ({ command, lines, isActive, onComplete }) => {
  const { playClick } = useTerminalSound();
  const reducedMotion = usePrefersReducedMotion();

  const { displayedContent, isDone } = useTypingEffect(
    lines, 
    { 
      typeSpeed: 10, 
      pauseDuration: 50, 
      onCharType: playClick,
      onComplete 
    }, 
    reducedMotion
  );

  return (
    <div className="mb-8 font-mono group">
      <div className="flex items-center gap-2 text-violet-400 mb-2">
        <span className="opacity-50 select-none">$</span>
        <span className="font-bold underline decoration-violet-500/30 underline-offset-4 uppercase tracking-widest text-xs md:text-sm">
          {command}
        </span>
        {isActive && !isDone && (
          <span className="w-2 h-4 bg-violet-400 animate-pulse ml-1" />
        )}
      </div>
      
      <div className="space-y-1 pl-4 border-l-2 border-green-500/10 group-hover:border-violet-500/20 transition-colors duration-300">
        {displayedContent.map((line, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <span className="text-green-500/30 pointer-events-none select-none text-[10px] mt-1 font-mono">
              [{(idx + 1).toString().padStart(2, '0')}]
            </span>
            <span className="terminal-text-glow text-green-500/90 text-sm md:text-base leading-relaxed tracking-wide">
              {line.startsWith('[INFO]') ? <><span className="text-blue-400 font-bold">[INFO]</span>{line.replace('[INFO]', '')}</> :
               line.startsWith('[SENSOR]') ? <><span className="text-violet-400 font-bold">[SENSOR]</span>{line.replace('[SENSOR]', '')}</> :
               line.startsWith('[MOTOR]') ? <><span className="text-yellow-400 font-bold">[MOTOR]</span>{line.replace('[MOTOR]', '')}</> :
               line.startsWith('[TECH]') ? <><span className="text-cyan-400 font-bold">[TECH]</span>{line.replace('[TECH]', '')}</> : 
               line.startsWith('>') ? <span className="text-violet-300 italic">{line}</span> :
               line}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const LineFollowerTerminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => [
    {
      command: 'init --system line-follower',
      lines: [
        '[INFO] SYSTEM: Autonomous Navigation Unit',
        '[INFO] MCU: Arduino Uno (ATmega328P)',
        '[INFO] STATUS: Online & Calibrated',
        '> Handshake completed. 100% Battery.',
      ]
    },
    {
      command: 'cat sensors/config.json',
      lines: [
        '[SENSOR] IR_ARRAY: 2x tcrt5000 (Line Detection)',
        '[SENSOR] SONAR: HC-SR04 (Obstacle Avoidance)',
        '[SENSOR] COMMS: HC-05 Bluetooth Module',
        '> Sensor fusion matrix active.',
      ]
    },
    {
      command: 'inspect logic/core_loop.cpp',
      lines: [
        '[MOTOR] MODE: PID Closed-Loop Control',
        '[MOTOR] DRIVER: L298N H-Bridge (Dual Channel)',
        '[MOTOR] ACTUATORS: 2x 12V DC Motors (Gearbox)',
        '> Autopilot engaged. Tracking black line.',
      ]
    },
    {
      command: 'ls features --all',
      lines: [
        '[FEAT] Autonomous Navigation (PID)',
        '[FEAT] Obstacle Avoidance (<15cm Stop)',
        '[FEAT] Bluetooth Remote Control (Android)',
        '[FEAT] Dual Mode Operation (Auto/Manual)',
      ]
    }
  ], []);

  const { activeStepIndex, isDone, handleNextStep } = useTerminalSequence({ stepCount: steps.length });

  // Auto-scroll
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [activeStepIndex]); // Scroll on step change, individual lines handle their own mount scrolling implicitly via layout expansion

  return (
    <section 
      className="terminal-container w-full h-full flex flex-col p-6 md:p-10 relative focus:outline-none overflow-y-auto scrollbar-hide bg-black/95 backdrop-blur-md"
      ref={containerRef}
    >
      <div className="terminal-overlay pointer-events-none fixed inset-0 z-10"></div>
      <div className="scanline pointer-events-none fixed inset-0 z-10"></div>

      <div className="mb-8 md:mb-12 text-[10px] uppercase tracking-[0.4em] text-violet-500/40 font-mono border-b border-violet-500/10 pb-6 flex justify-between items-center z-20 sticky top-0 bg-black/80 backdrop-blur-sm">
        <span>LineFollower.sys [v2.4]</span>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-green-500' : 'bg-yellow-500 animate-pulse'}`}></div>
           <span>{isDone ? 'ONLINE' : 'BOOTING'}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-0 pb-20">
        {steps.slice(0, activeStepIndex + 1).map((step, idx) => (
          <TerminalStep 
            key={idx}
            command={step.command}
            lines={step.lines}
            isActive={idx === activeStepIndex && !isDone}
            onComplete={handleNextStep}
          />
        ))}

        {isDone && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5 }}
            className="mt-12 space-y-6 pb-20 border-t border-violet-500/20 pt-8"
          >
             <div className="text-violet-400 font-mono text-xs uppercase tracking-widest mb-4">
                &gt; SYSTEM_READY: Control Link Established
             </div>
             
             <div className="flex flex-wrap gap-4">
               <a 
                 href="https://github.com/mabroukaymen1/flowingcar" 
                 target="_blank" 
                 rel="noreferrer"
                 className="terminal-btn group relative px-6 py-3 bg-violet-500/10 border border-violet-500/30 hover:bg-violet-500/20 text-violet-300 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   <i className="fab fa-github"></i> Source_Code
                 </span>
               </a>
               
               <button 
                 onClick={() => window.history.back()} 
                 className="terminal-btn group relative px-6 py-3 border border-green-500/30 hover:bg-green-500/10 text-green-400 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span>&lt; Return_To_Base</span>
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LineFollowerTerminal;
