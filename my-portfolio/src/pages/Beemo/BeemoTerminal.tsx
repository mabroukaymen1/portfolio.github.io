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
      <div className="flex items-center gap-2 text-emerald-400 mb-2">
        <span className="opacity-50 select-none">$</span>
        <span className="font-bold underline decoration-emerald-500/30 underline-offset-4 uppercase tracking-widest text-xs md:text-sm">{command}</span>
        {isActive && !isDone && <span className="w-2 h-4 bg-emerald-400 animate-pulse ml-1" />}
      </div>
      <div className="space-y-1 pl-4 border-l-2 border-emerald-500/10 group-hover:border-emerald-500/30 transition-colors duration-300">
        {displayedContent.map((line, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <span className="text-emerald-500/30 pointer-events-none select-none text-[10px] mt-1 font-mono">[{idx.toString().padStart(2, '0')}]</span>
            <span className="terminal-text-glow text-emerald-100/90 text-sm md:text-base leading-relaxed tracking-wide">
              {line.startsWith('[INFO]') ? <><span className="text-emerald-400 font-bold">[INFO]</span>{line.replace('[INFO]', '')}</> :
               line.startsWith('[SYS]') ? <><span className="text-teal-400 font-bold">[SYS]</span>{line.replace('[SYS]', '')}</> :
               line.startsWith('[GAME]') ? <><span className="text-green-400 font-bold">[GAME]</span>{line.replace('[GAME]', '')}</> :
               line.startsWith('[TECH]') ? <><span className="text-lime-400 font-bold">[TECH]</span>{line.replace('[TECH]', '')}</> : 
               line.startsWith('>') ? <span className="text-emerald-300 italic">{line}</span> :
               line}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const BeemoTerminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => [
    {
      command: 'whoami',
      lines: [
        '[INFO] IDENTITY: BMO (Be More)',
        '[INFO] TYPE: AI Assistant & Home Controller',
        '[INFO] CORE: Voice Interaction System',
        '> "Who wants to play video games?"',
      ]
    },
    {
      command: 'check_modules --status',
      lines: [
        '[SYS] ASR: VOSK English Model (95% Accuracy)',
        '[SYS] NLU: Google Gemini AI (Context Aware)',
        '[SYS] COM: TCP/IP & WebSockets (Real-time)',
        '[SYS] CLIENT: Flutter Mobile App (Cross-platform)',
      ]
    },
    {
      command: 'cat active_features.log',
      lines: [
        '[GAME] Voice Command Processing (Active)',
        '[GAME] Smart Device Control (Lights/Music)',
        '[GAME] Remote Monitoring via App',
        '> Waiting for user intent...',
      ]
    },
    {
      command: 'ls tech_stack',
      lines: [
        '[TECH] Core: Python, VOSK, Gemini AI',
        '[TECH] App: Flutter, Firebase, REST API',
        '[TECH] Hardware: RPi 4, Waveshare LCD, 3D Print',
      ]
    }
  ], []);

  const { activeStepIndex, isDone, handleNextStep } = useTerminalSequence({ stepCount: steps.length });

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [activeStepIndex]);

  return (
    <section 
      className="terminal-container w-full h-full flex flex-col p-6 md:p-10 relative focus:outline-none overflow-y-auto scrollbar-hide bg-slate-950"
      ref={containerRef}
    >
      <div className="terminal-overlay"></div>
      <div className="scanline"></div>

      <div className="mb-12 text-[10px] uppercase tracking-[0.4em] text-emerald-500/40 font-mono border-b border-emerald-500/10 pb-6 flex justify-between items-center z-20 sticky top-0 bg-slate-950/90 backdrop-blur-sm">
        <span>BMO_Console [v5.0]</span>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-emerald-500' : 'bg-emerald-500/50 animate-pulse'}`}></div>
           <span>{isDone ? 'HAPPY' : 'BOOTING'}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-20 pb-20">
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
            className="mt-12 space-y-6 pb-20 border-t border-emerald-500/20 pt-8"
          >
             <div className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
                &gt; SYSTEM_MESSAGE: Yay! BMO is chop!
             </div>
             
             <div className="flex flex-wrap gap-4">
               <a 
                 href="https://github.com/mabroukaymen1/Beemo" 
                 target="_blank" 
                 rel="noreferrer"
                 className="terminal-btn group relative px-6 py-3 bg-emerald-500/10 border border-emerald-500/30 hover:bg-emerald-500/20 text-emerald-300 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   <i className="fab fa-github"></i> Source_Code
                 </span>
               </a>
               
               <button 
                 onClick={() => window.history.back()} 
                 className="terminal-btn group relative px-6 py-3 border border-slate-500/30 hover:bg-slate-500/10 text-slate-400 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span>&lt; Sleep_Mode</span>
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BeemoTerminal;
