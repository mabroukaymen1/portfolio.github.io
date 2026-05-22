import React, { useState, useEffect, useRef, useMemo } from 'react';
import { getAssetUrl } from '../../utils/assets';
import { motion, AnimatePresence } from 'framer-motion';
import { useTypingEffect } from '../../hooks/useTypingEffect';
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion';
import { useTerminalSound } from '../../hooks/useTerminalSound';
import { projects } from '../../data/projects';
import './terminal.css';

// --- Sub-Components ---

interface TerminalStepProps {
  command: string;
  lines: string[];
  isActive: boolean;
  onComplete: () => void;
  showCommandOnly?: boolean;
}

const TerminalStep: React.FC<TerminalStepProps> = ({ command, lines, isActive, onComplete, showCommandOnly }) => {
  const { playClick } = useTerminalSound();
  const reducedMotion = usePrefersReducedMotion();

  const { displayedContent, isDone } = useTypingEffect(
    isActive ? lines : [], 
    { 
      typeSpeed: 10, 
      pauseDuration: 100, 
      onCharType: playClick,
      onComplete 
    }, 
    reducedMotion
  );

  return (
    <div className="mb-6 font-mono">
      <div className="flex items-center gap-2 text-blue-400 mb-1">
        <span className="opacity-50">$</span>
        <span className="font-bold underline decoration-blue-500/30 underline-offset-4 uppercase tracking-widest text-xs">{command}</span>
        {isActive && !isDone && <span className="w-2 h-4 bg-blue-400 animate-pulse ml-1" />}
      </div>
      {!showCommandOnly && (
        <div className="space-y-1 pl-4 border-l border-green-500/10">
          {displayedContent.map((line, idx) => (
            <div key={idx} className="flex gap-3">
              <span className="text-green-500/30 pointer-events-none select-none text-[10px] mt-1">[{idx.toString().padStart(2, '0')}]</span>
              <span className="terminal-text-glow text-green-500/90 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {line.startsWith('[INFO]') ? <><span className="text-blue-400 font-bold">[INFO]</span>{line.replace('[INFO]', '')}</> :
                 line.startsWith('[OK]') ? <><span className="text-green-400 font-bold">[OK]</span>{line.replace('[OK]', '')}</> :
                 line.startsWith('[BIO]') ? <><span className="text-indigo-400 font-bold">[BIO]</span>{line.replace('[BIO]', '')}</> :
                 line.startsWith('[SKILL]') ? <><span className="text-yellow-400 font-bold">[SKILL]</span>{line.replace('[SKILL]', '')}</> :
                 line.startsWith('[LANG]') ? <><span className="text-pink-400 font-bold">[LANG]</span>{line.replace('[LANG]', '')}</> :
                 line.startsWith('[FAQ]') ? <><span className="text-cyan-400 font-bold">[FAQ]</span>{line.replace('[FAQ]', '')}</> :
                 line.startsWith('[CONTACT]') ? <><span className="text-orange-400 font-bold">[CONTACT]</span>{line.replace('[CONTACT]', '')}</> : line}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Component ---

const TerminalPanel: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isBooted, setIsBooted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { playSuccess } = useTerminalSound();

  // Contact Flow State
  const [contactState, setContactState] = useState<'IDLE' | 'NAME' | 'EMAIL' | 'MESSAGE' | 'SENDING' | 'SUCCESS'>('IDLE');
  const [contactData, setContactData] = useState({ name: '', email: '', message: '' });
  const [contactInputValue, setContactInputValue] = useState('');

  const bootSteps = useMemo(() => [
    {
      command: 'whoami --full',
      lines: [
        '[INFO] USER: Aymen Mabrouk',
        '[INFO] ROLE: Front-End Developer & IoT Specialist',
        '[INFO] LOC: Monastir, Tunisia',
        '-----------------------------------------',
        '[BIO] Computer engineer specializing in IoT and Embedded Systems.',
        '[BIO] Passionate about creating mobile apps and integrating IoT technologies.',
        '[BIO] Building innovative solutions that bridge hardware and software.',
      ]
    },
    {
      command: 'ls languages',
      lines: [
        '[LANG] Arabic: Native (100%)',
        '[LANG] French: Intermediate (70%)',
        '[LANG] English: B2 - IELTS Band 6 (75%)',
        '[LANG] German: Beginner (25%)',
      ]
    },
    {
      command: 'ls skills/expertise',
      lines: [
        '[SKILL] Flutter: 70% | Mobile | Cross-platform apps',
        '[SKILL] Scrum: 80% | Agile | Team Leadership',
        '[SKILL] Node.js: 65% | Backend | REST APIs',
        '[SKILL] Python: 65% | ML/Backend | AI Models',
        '[SKILL] Embedded C: 60% | Systems | Low-level opt',
        '[SKILL] MongoDB: 60% | Database | NoSQL',
        '[SKILL] Java: 60% | Backend | Android Core',
        '[SKILL] Machine Learning: 55% | AI | Computer Vision',
        '[SKILL] Firebase: 50% | Backend | Real-time DB',
        '[SKILL] RPi/Linux: 50% | Systems | OS Config',
        '[SKILL] HTML/CSS/JS: 40% | Web | Responsive',
        '[SKILL] Docker: 40% | Tools | Containerization',
      ]
    },
    {
      command: 'cat user/faq.md',
      lines: [
        '[FAQ] Q: Tech Stack? A: Flutter, IoT (ESP32/LoRa), Embedded Systems.',
        '[FAQ] Q: Timeline? A: 4-6 weeks (App) to 3-6 months (IoT System).',
        '[FAQ] Q: Remote? A: Yes, global collaboration available.',
        '[FAQ] Q: Process? A: Agile (Plan > Prototype > Dev > Deploy).',
      ]
    },
    {
      command: 'cat contact_info.txt',
      lines: [
        '[CONTACT] Email: aymenmabrouk803@gmail.com',
        '[CONTACT] Phone: +216 94-231-159',
        '[CONTACT] Address: Monastir, Tunisia',
        '[INFO] Status: Available for new projects.',
      ]
    },
    {
      command: 'cat system/downloads.md',
      lines: ['[OK] CV_EN_2025.pdf available.', '[OK] CV_FR_2025.pdf available.']
    },
    {
      command: 'query missions --featured',
      lines: projects.map(p => `[MISSION] ${p.title} | ${p.status} | ${p.tags.slice(0, 2).join(', ')}`)
    }
  ], []);

  const handleNextStep = () => {
    if (activeStepIndex < bootSteps.length - 1) {
      setActiveStepIndex(prev => prev + 1);
    } else {
      setIsBooted(true);
      playSuccess();
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactInputValue.trim()) return;

    if (contactState === 'NAME') {
      setContactData(prev => ({ ...prev, name: contactInputValue }));
      setContactState('EMAIL');
    } else if (contactState === 'EMAIL') {
      setContactData(prev => ({ ...prev, email: contactInputValue }));
      setContactState('MESSAGE');
    } else if (contactState === 'MESSAGE') {
      setContactData(prev => ({ ...prev, message: contactInputValue }));
      setContactState('SENDING');
      // Simulate sending
      setTimeout(() => {
        setContactState('SUCCESS');
        playSuccess();
      }, 2000);
    }
    setContactInputValue('');
  };

  // Auto-scroll on content change
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [activeStepIndex, contactState, contactData, contactInputValue]);

  return (
    <section 
      className="terminal-container w-full h-full flex flex-col p-6 md:p-10 relative focus:outline-none overflow-y-auto scrollbar-hide"
      ref={containerRef}
    >
      <div className="terminal-overlay"></div>
      <div className="scanline"></div>

      {/* Dynamic Header */}
      <div className="mb-12 text-[10px] uppercase tracking-[0.4em] text-green-500/40 font-mono border-b border-green-500/10 pb-6 flex justify-between">
        <div>MAINFRAME v2.0.25 | STATUS: {isBooted ? 'READY' : 'BOOTING'}</div>
        <div className="hidden md:block">USER@AYMEN_OS: ~{contactState !== 'IDLE' ? '/contact' : ''}</div>
      </div>

      <div className="max-w-4xl mx-auto w-full z-20 pb-20">
        {/* Boot Phase */}
        {bootSteps.slice(0, activeStepIndex + 1).map((step, idx) => (
          <TerminalStep 
            key={idx}
            command={step.command}
            lines={step.lines}
            isActive={idx === activeStepIndex && !isBooted}
            onComplete={handleNextStep}
          />
        ))}

        {/* Post-Boot: Extra Actions & Contact */}
        {isBooted && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-10">
            {/* Interactive Assets */}
            <div className="font-mono">
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <span className="opacity-50">$</span>
                <span className="font-bold uppercase tracking-widest text-xs">ls available_actions/</span>
              </div>
              <div className="flex flex-wrap gap-4 pl-4">
                <a href={getAssetUrl('enresume.pdf')} download className="terminal-btn flex items-center gap-2 group">
                   <i className="fas fa-file-pdf group-hover:scale-110 transition-transform" />
                   <span>DOWNLOAD_CV_EN</span>
                </a>
                <a href={getAssetUrl('frresumeaymen01.pdf')} download className="terminal-btn flex items-center gap-2 group border-purple-500/40 text-purple-400 hover:bg-purple-500/10">
                   <i className="fas fa-file-pdf group-hover:scale-110 transition-transform" />
                   <span>DOWNLOAD_CV_FR</span>
                </a>
                <a href="https://github.com/mabroukaymen1" target="_blank" className="terminal-btn flex items-center gap-2 group border-gray-500/40 text-gray-400 hover:bg-gray-500/10">
                   <i className="fab fa-github group-hover:scale-110 transition-transform" />
                   <span>GITHUB_HUB</span>
                </a>
              </div>
            </div>

            {/* Project Quick View */}
            <div className="font-mono">
               <div className="flex items-center gap-2 text-blue-400 mb-4">
                  <span className="opacity-50">$</span>
                  <span className="font-bold uppercase tracking-widest text-xs">ls projects --grid</span>
               </div>
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-4">
                  {projects.slice(0, 4).map(p => (
                    <div key={p.id} className="p-4 border border-green-500/20 rounded bg-green-500/5 hover:bg-green-500/10 transition-colors group">
                       <div className="text-xs font-bold text-green-400 mb-1 tracking-tighter uppercase">{p.title}</div>
                       <div className="text-[10px] text-green-500/60 mb-3 truncate">{p.summary}</div>
                       <div className="flex justify-between items-center text-[9px] font-bold">
                          <span className="px-2 py-0.5 border border-green-500/30 rounded">{p.status}</span>
                          <a href={p.githubUrl} className="hover:text-white transition-colors">PROJ_DETAILS &gt;</a>
                       </div>
                    </div>
                  ))}
               </div>
            </div>

            {/* Contact Mission Controller */}
            <div className="font-mono pt-4 border-t border-green-500/10 mt-10">
              <div className="flex items-center gap-2 text-blue-400 mb-4">
                <span className="opacity-50">$</span>
                <span className="font-bold uppercase tracking-widest text-xs">init mission_brief_protocol</span>
              </div>
              
              <div className="pl-4 space-y-4">
                {contactState === 'IDLE' ? (
                   <button 
                     onClick={() => setContactState('NAME')}
                     className="px-6 py-2 border border-blue-500/40 text-blue-400 text-xs font-bold hover:bg-blue-500/10 transition-all rounded uppercase tracking-widest"
                   >
                     Establish Connection
                   </button>
                ) : (
                  <div className="space-y-4">
                    {/* Previous step values */}
                    {contactData.name && <div className="text-sm"><span className="text-blue-400 font-bold">[CLIENT]:</span> {contactData.name}</div>}
                    {contactData.email && <div className="text-sm"><span className="text-blue-400 font-bold">[CONTACT]:</span> {contactData.email}</div>}
                    
                    {/* Current Prompt */}
                    <AnimatePresence mode="wait">
                       {contactState === 'NAME' && <motion.div key="name" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">&gt; PLEASE STATE YOUR IDENTIFICATION (Name/Surname):</motion.div>}
                       {contactState === 'EMAIL' && <motion.div key="email" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">&gt; PROVIDE RETURN CONTACT FREQUENCY (Email):</motion.div>}
                       {contactState === 'MESSAGE' && <motion.div key="msg" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-green-400">&gt; TRANSMIT MISSION OBJECTIVES (Your Message):</motion.div>}
                       {contactState === 'SENDING' && (
                         <motion.div key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-cyan-400 animate-pulse">
                            &gt; ENCRYPTING AND TRANSMITTING SIGNAL...
                         </motion.div>
                       )}
                       {contactState === 'SUCCESS' && (
                         <motion.div key="ok" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
                           <div className="text-green-400 font-black tracking-widest border border-green-400 p-2 inline-block">MISSION BRIEF SENT SUCCESSFULLY</div>
                           <div className="text-[10px] text-green-500/60">The signal has been acknowledged. I will reach out shortly.</div>
                           <button onClick={() => {setContactState('IDLE'); setContactData({ name: '', email: '', message: '' })}} className="text-[10px] underline hover:text-white transition-colors block mt-4">RE-START PROTOCOL</button>
                         </motion.div>
                       )}
                    </AnimatePresence>

                    {/* Input Field */}
                    {['NAME', 'EMAIL', 'MESSAGE'].includes(contactState) && (
                      <form onSubmit={handleContactSubmit} className="flex gap-2 items-center bg-green-500/5 p-2 rounded border border-green-500/10">
                        <span className="text-green-400 font-mono font-bold animate-pulse">&gt;_</span>
                        <input 
                          autoFocus
                          className="flex-1 bg-transparent border-none focus:ring-0 text-green-400 font-mono text-sm placeholder:text-green-900/50"
                          placeholder="Type response here..."
                          value={contactInputValue}
                          onChange={(e) => setContactInputValue(e.target.value)}
                        />
                      </form>
                    )}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Static Decorative Footer */}
      <div className="fixed bottom-4 left-10 right-10 hidden lg:flex justify-between text-[10px] font-mono text-green-500/20 uppercase tracking-[0.4em] pointer-events-none z-30 opacity-60">
        <div className="flex gap-8">
           <span>CPU_USAGE: 14%</span>
           <span>NET_STATUS: ENCRYPTED_STABLE</span>
        </div>
        <div>BIOS_VER: 2.0.25 | AYMEN_M_MAINFRAME</div>
      </div>
    </section>
  );
};

export default TerminalPanel;
