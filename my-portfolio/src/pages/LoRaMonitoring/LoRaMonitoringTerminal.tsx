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
      <div className="flex items-center gap-2 text-amber-400 mb-2">
        <span className="opacity-50 select-none">$</span>
        <span className="font-bold underline decoration-amber-500/30 underline-offset-4 uppercase tracking-widest text-xs md:text-sm">{command}</span>
        {isActive && !isDone && <span className="w-2 h-4 bg-amber-400 animate-pulse ml-1" />}
      </div>
      <div className="space-y-1 pl-4 border-l-2 border-amber-500/10 group-hover:border-amber-500/30 transition-colors duration-300">
        {displayedContent.map((line, idx) => (
          <motion.div 
            key={idx} 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex gap-3"
          >
            <span className="text-amber-500/30 pointer-events-none select-none text-[10px] mt-1 font-mono">[{idx.toString().padStart(2, '0')}]</span>
            <span className="terminal-text-glow text-amber-100/90 text-sm md:text-base leading-relaxed tracking-wide">
              {line.startsWith('[INFO]') ? <><span className="text-cyan-400 font-bold">[INFO]</span>{line.replace('[INFO]', '')}</> :
               line.startsWith('[RADIO]') ? <><span className="text-amber-400 font-bold">[RADIO]</span>{line.replace('[RADIO]', '')}</> :
               line.startsWith('[DATA]') ? <><span className="text-green-400 font-bold">[DATA]</span>{line.replace('[DATA]', '')}</> :
               line.startsWith('[TECH]') ? <><span className="text-indigo-400 font-bold">[TECH]</span>{line.replace('[TECH]', '')}</> : 
               line.startsWith('>') ? <span className="text-amber-300 italic">{line}</span> :
               line}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const LoRaMonitoringTerminal: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const steps = useMemo(() => [
    {
      command: 'init --mesh lora-network',
      lines: [
        '[INFO] PROJECT: Long Range Telemetry',
        '[INFO] FREQ: 868 MHz (EU Band) | Range: ~300m',
        '[INFO] POWER: 0.5mA (Low Power Consumption)',
        '> Signal Strength: -92dBm. Link stable.',
      ]
    },
    {
      command: 'cat nodes/config.json',
      lines: [
        '[RADIO] NODE_TX: ESP32 + SX1276 (Transmitter)',
        '[RADIO] NODE_RX: ESP32 + SX1276 (Receiver/Gateway)',
        '[DATA] SENSORS: BME280 (Temp/Press/Hum) + GPS(Neo-6M)',
        '> Packet loss < 1%. Link stable.',
      ]
    },
    {
      command: 'monitor --live packets',
      lines: [
        '[DATA] PKT #1024: Temp=24.5C | Hum=45% | Lat=35.50N',
        '[DATA] PKT #1025: Temp=24.6C | Hum=46% | Lat=35.50N',
        '[DATA] PKT #1026: RSSI=-89dBm | SNR=9dB',
        '> Data forwarded to Firebase Cloud via Wi-Fi Gateway.',
      ]
    },
    {
      command: 'ls stack --full',
      lines: [
        '[TECH] Hardware: ESP32 LoRa (Heltec V2)',
        '[TECH] Protocol: LoRaWAN / P2P Meshing',
        '[TECH] Cloud: Firebase Realtime DB',
        '[TECH] UI: Flutter Dashboard (Mobile)',
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
      className="terminal-container w-full h-full flex flex-col p-6 md:p-10 relative focus:outline-none overflow-y-auto scrollbar-hide bg-neutral-950"
      ref={containerRef}
    >
      <div className="terminal-overlay"></div>
      <div className="scanline"></div>

      <div className="mb-12 text-[10px] uppercase tracking-[0.4em] text-amber-500/40 font-mono border-b border-amber-500/10 pb-6 flex justify-between items-center z-20 sticky top-0 bg-neutral-950/90 backdrop-blur-sm">
        <span>LoRa_Mesh_Net [v3.0]</span>
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${isDone ? 'bg-amber-500' : 'bg-amber-500/50 animate-pulse'}`}></div>
           <span>{isDone ? 'SYNCED' : 'SCANNING'}</span>
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
            className="mt-12 space-y-6 pb-20 border-t border-amber-500/20 pt-8"
          >
             <div className="text-amber-400 font-mono text-xs uppercase tracking-widest mb-4">
                &gt; TELEMETRY_STREAM: Active & Recording
             </div>
             
             <div className="flex flex-wrap gap-4">
               <a 
                 href="https://github.com/mabroukaymen1/LoRa-Monitoring" 
                 target="_blank" 
                 rel="noreferrer"
                 className="terminal-btn group relative px-6 py-3 bg-amber-500/10 border border-amber-500/30 hover:bg-amber-500/20 text-amber-300 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span className="relative z-10 flex items-center gap-2">
                   <i className="fab fa-github"></i> Source_Code
                 </span>
               </a>
               
               <button 
                 onClick={() => window.history.back()} 
                 className="terminal-btn group relative px-6 py-3 border border-neutral-500/30 hover:bg-neutral-500/10 text-neutral-400 font-mono text-xs tracking-widest uppercase transition-all"
               >
                 <span>&lt; Terminate_Link</span>
               </button>
             </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default LoRaMonitoringTerminal;
