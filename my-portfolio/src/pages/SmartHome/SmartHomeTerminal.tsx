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
      <div className="flex items-center gap-2 text-orange-400 mb-2">
        <span className="opacity-50 select-none">$</span>
        <span className="font-bold underline decoration-orange-500/30 underline-offset-4 uppercase tracking-widest text-xs md:text-sm">{command}</span>
        {isActive && !isDone && <span className="w-2 h-4 bg-orange-400 animate-pulse ml-1" />}
      </div>
      <div className="space-y-1 pl-4 border-l-2 border-orange-500/10 group-hover:border-orange-500/30 transition-colors duration-300">
        {displayedContent.map((line, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <span className="text-orange-500/30 pointer-events-none select-none text-[10px] mt-1 font-mono">[{idx.toString().padStart(2, '0')}]</span>
            <span className="terminal-text-glow text-orange-100/90 text-sm md:text-base leading-relaxed tracking-wide">
              {line.startsWith('[INFO]') ? <><span className="text-blue-400 font-bold">[INFO]</span>{line.replace('[INFO]', '')}</> :
               line.startsWith('[IOT]') ? <><span className="text-yellow-400 font-bold">[IOT]</span>{line.replace('[IOT]', '')}</> :
               line.startsWith('[SEC]') ? <><span className="text-red-400 font-bold">[SEC]</span>{line.replace('[SEC]', '')}</> :
               line.startsWith('[AUTO]') ? <><span className="text-green-400 font-bold">[AUTO]</span>{line.replace('[AUTO]', '')}</> : 
               line.startsWith('>') ? <span className="text-orange-300 italic">{line}</span> :
               line}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const SmartHomeTerminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);


  const steps = useMemo(() => [
    {
      command: 'connect --secure home-network',
      lines: [
        '[INFO] SYSTEM: Smart Home Automation Hub',
        '[INFO] GATEWAY: ESP32 + MQTT Broker',
        '[INFO] STATUS: Connected to Firebase Cloud',
        '> Handshake completed. 128-bit encryption active.',
      ]
    },
    {
      command: 'sensors --read_all',
      lines: [
        '[ENV] DHT11: Temp 24°C | Humidity 45%',
        '[PWR] ACS712: Load 1.2A | Consumption Normal',
        '[SEC] FLAME: Negative | Gas: Negative',
        '> Environmental parameters within nominal range.',
      ]
    },
    {
      command: 'cat config/automation_rules.yaml',
      lines: [
        '[AUTO] Rule 1: IF Temp > 30°C THEN Fan=ON',
        '[AUTO] Rule 2: IF Gas > Threshold THEN Alarm=ON',
        '[AUTO] Rule 3: IF Time=18:00 THEN Lights=ON',
        '> Automation logic executing in real-time.',
      ]
    },
    {
      command: 'ls tech_stack',
      lines: [
        '[TECH] IoT: ESP32, MQTT, PlatformIO',
        '[TECH] Sensors: DHT11 (Env), ACS712 (Power)',
        '[TECH] Client: Flutter App + Firebase Backend',
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
      className="terminal-container w-full h-full flex flex-col p-6 md:p-10 relative focus:outline-none overflow-y-auto scrollbar-hide bg-stone-950"
      ref={containerRef}
    >
      <div className="terminal-overlay"></div>
      <div className="scanline"></div>

      <div className="mb-12 text-[10px] uppercase tracking-[0.4em] text-orange-500/40 font-mono border-b border-orange-500/10 pb-6 flex justify-between items-center z-20 sticky top-0 bg-stone-950/90 backdrop-blur-sm">
        <span>SmartHome_Hub.py [v1.4]</span>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-orange-500' : 'bg-orange-500/50 animate-pulse'}`}></div>
           <span>{isDone ? 'SECURE' : 'CONNECTING'}</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-20">
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
            className="mt-12 space-y-6 pb-20 border-t border-orange-500/20 pt-8"
          >
             <div className="text-orange-400 font-mono text-xs uppercase tracking-widest mb-4">
                &gt; DASHBOARD_LIVE: Monitoring active sensors
             </div>
             
             <div className="flex flex-wrap gap-4">
               <a 
                 href="https://github.com/mabroukaymen1/Smart-Home" 
                 target="_blank" 
                 rel="noreferrer"
                 className="terminal-btn group relative px-6 py-3 bg-orange-500/10 border border-orange-500/30 hover:bg-orange-500/20 text-orange-300 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   <i className="fab fa-github"></i> Source_Code
                 </span>
               </a>
               
               <button 
                 onClick={() => window.history.back()} 
                 className="terminal-btn group relative px-6 py-3 border border-stone-500/30 hover:bg-stone-500/10 text-stone-400 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span>&lt; Logout</span>
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default SmartHomeTerminal;
