import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

interface BeemoState {
  status: 'idle' | 'listening' | 'processing' | 'executing' | 'success';
  expression: 'happy' | 'neutral' | 'listening' | 'thinking' | 'success';
  currentCommand: string;
  lightOn: boolean;
  musicPlaying: boolean;
  audioLevel: number;
}

const BeemoAnimation: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animateFnRef = useRef<() => void>(() => {});
  
  const [state, setState] = useState<BeemoState>({
    status: 'idle',
    expression: 'neutral',
    currentCommand: '',
    lightOn: false,
    musicPlaying: false,
    audioLevel: 0,
  });

  const timeRef = useRef(0);
  const particlesRef = useRef<Array<{x: number, y: number, vx: number, vy: number, life: number}>>([]);

  // Main animation loop
  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    timeRef.current += 0.016;

    // Clear canvas
    ctx.fillStyle = mode === 'terminal' ? '#0a0a0a' : '#1a1a2e';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // --- Robot Drawing ---
    
    // Robot Body
    const robotWidth = 120;
    const robotHeight = 140;
    const robotX = centerX - robotWidth / 2;
    const robotY = centerY - 20;

    // Shadow
    ctx.fillStyle = 'rgba(0,0,0,0.3)';
    ctx.beginPath();
    ctx.ellipse(centerX, robotY + robotHeight + 10, 50, 10, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body Shape
    ctx.fillStyle = '#60a5fa'; // Blue-400
    ctx.strokeStyle = '#2563eb'; // Blue-600
    ctx.lineWidth = 4;
    ctx.beginPath();
    ctx.roundRect(robotX, robotY, robotWidth, robotHeight, 20);
    ctx.fill();
    ctx.stroke();

    // Screen (Face) area
    const screenWidth = 90;
    const screenHeight = 70;
    const screenX = centerX - screenWidth / 2;
    const screenY = robotY + 15;

    // Screen Glow
    ctx.shadowBlur = 10;
    ctx.shadowColor = '#93c5fd';
    ctx.fillStyle = '#1e3a8a'; // Dark blue screen
    ctx.beginPath();
    ctx.roundRect(screenX, screenY, screenWidth, screenHeight, 10);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Face Expressions
    ctx.strokeStyle = '#10b981'; // Green face default
    ctx.lineWidth = 4;
    ctx.lineCap = 'round';

    const eyeSpacing = 25;
    const eyeY = screenY + 25;

    if (state.expression === 'happy' || state.expression === 'success') {
      // Happy Eyes (^)
      ctx.strokeStyle = '#10b981';
      ctx.beginPath();
      // Left
      ctx.moveTo(centerX - eyeSpacing - 10, eyeY + 5);
      ctx.lineTo(centerX - eyeSpacing, eyeY - 5);
      ctx.lineTo(centerX - eyeSpacing + 10, eyeY + 5);
      // Right
      ctx.moveTo(centerX + eyeSpacing - 10, eyeY + 5);
      ctx.lineTo(centerX + eyeSpacing, eyeY - 5);
      ctx.lineTo(centerX + eyeSpacing + 10, eyeY + 5);
      ctx.stroke();

      // Smile
      ctx.beginPath();
      ctx.arc(centerX, screenY + 45, 10, 0, Math.PI, false);
      ctx.stroke();

    } else if (state.expression === 'neutral') {
      // Neutral Eyes (dots)
      ctx.fillStyle = '#10b981';
      ctx.beginPath();
      ctx.arc(centerX - eyeSpacing, eyeY, 4, 0, Math.PI * 2);
      ctx.arc(centerX + eyeSpacing, eyeY, 4, 0, Math.PI * 2);
      ctx.fill();
      
      // Neutral Mouth (line)
      ctx.beginPath();
      ctx.moveTo(centerX - 5, screenY + 45);
      ctx.lineTo(centerX + 5, screenY + 45);
      ctx.stroke();

    } else if (state.expression === 'listening') {
      // Listening Eyes (wider)
      ctx.fillStyle = '#60a5fa'; // Blue eyes when listening
      ctx.beginPath();
      ctx.arc(centerX - eyeSpacing, eyeY, 5 + Math.sin(timeRef.current * 10) * 1, 0, Math.PI * 2);
      ctx.arc(centerX + eyeSpacing, eyeY, 5 + Math.sin(timeRef.current * 10) * 1, 0, Math.PI * 2);
      ctx.fill();

      // Mouth is a waveform
      ctx.strokeStyle = '#60a5fa';
      ctx.lineWidth = 2;
      ctx.beginPath();
      for(let x = -15; x <= 15; x+=2) {
         const y = Math.sin(x * 0.5 + timeRef.current * 15) * (state.audioLevel / 5 + 2);
         if(x === -15) ctx.moveTo(centerX + x, screenY + 45 + y);
         else ctx.lineTo(centerX + x, screenY + 45 + y);
      }
      ctx.stroke();

    } else if (state.expression === 'thinking') {
      // Thinking (one eye big one small)
      ctx.fillStyle = '#f59e0b'; // Amber
      ctx.beginPath();
      ctx.arc(centerX - eyeSpacing, eyeY, 6, 0, Math.PI * 2);
      ctx.arc(centerX + eyeSpacing, eyeY, 3, 0, Math.PI * 2);
      ctx.fill();

      // Loading dots mouth
      ctx.fillStyle = '#f59e0b';
      const dotOffset = Math.floor(timeRef.current * 5) % 3;
      for(let i=0; i<3; i++) {
        ctx.beginPath();
        ctx.arc(centerX - 10 + i * 10, screenY + 45 - (i === dotOffset ? 3 : 0), 2, 0, Math.PI*2);
        ctx.fill();
      }
    }

    // Buttons on body
    const btnY = robotY + 95;
    // Green
    ctx.fillStyle = '#10b981';
    ctx.beginPath(); ctx.arc(centerX - 20, btnY, 6, 0, Math.PI*2); ctx.fill();
    // Red
    ctx.fillStyle = '#ef4444';
    ctx.beginPath(); ctx.arc(centerX, btnY + 10, 6, 0, Math.PI*2); ctx.fill();
    // Yellow
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath(); ctx.arc(centerX + 20, btnY, 6, 0, Math.PI*2); ctx.fill();

    // Arms
    // Left Arm (animated if music playing)
    const armY = robotY + 60;
    const leftArmAngle = state.musicPlaying ? Math.sin(timeRef.current * 10) * 0.5 + 0.5 : 0.2;
    ctx.lineWidth = 8;
    ctx.strokeStyle = '#2563eb';
    ctx.beginPath();
    ctx.moveTo(robotX, armY);
    ctx.quadraticCurveTo(robotX - 20, armY + 10, robotX - 25, armY + 30 - leftArmAngle * 20);
    ctx.stroke();
    // Hand
    ctx.fillStyle = '#2563eb';
    ctx.beginPath(); ctx.arc(robotX - 25, armY + 30 - leftArmAngle * 20, 6, 0, Math.PI*2); ctx.fill();

    // Right Arm
    const rightArmAngle = state.musicPlaying ? Math.sin(timeRef.current * 10 + Math.PI) * 0.5 + 0.5 : 0.2;
    ctx.beginPath();
    ctx.moveTo(robotX + robotWidth, armY);
    ctx.quadraticCurveTo(robotX + robotWidth + 20, armY + 10, robotX + robotWidth + 25, armY + 30 - rightArmAngle * 20);
    ctx.stroke();
    // Hand
    ctx.beginPath(); ctx.arc(robotX + robotWidth + 25, armY + 30 - rightArmAngle * 20, 6, 0, Math.PI*2); ctx.fill();

    // --- Environment / Effects ---

    // Light Bulb Effect (Top Left)
    if (state.lightOn) {
       const lightX = width * 0.2;
       const lightY = height * 0.3;
       
       // Glow
       const gradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 60);
       gradient.addColorStop(0, 'rgba(253, 224, 71, 0.4)');
       gradient.addColorStop(1, 'rgba(253, 224, 71, 0)');
       ctx.fillStyle = gradient;
       ctx.beginPath(); ctx.arc(lightX, lightY, 60, 0, Math.PI*2); ctx.fill();

       // Bulb
       ctx.fillStyle = '#fde047';
       ctx.beginPath(); ctx.arc(lightX, lightY, 15, 0, Math.PI*2); ctx.fill();
       // Rays
       ctx.strokeStyle = '#fde047';
       ctx.lineWidth = 2;
       for(let i=0; i<8; i++) {
         const angle = (i / 8) * Math.PI * 2;
         ctx.beginPath();
         ctx.moveTo(lightX + Math.cos(angle)*20, lightY + Math.sin(angle)*20);
         ctx.lineTo(lightX + Math.cos(angle)*30, lightY + Math.sin(angle)*30);
         ctx.stroke();
       }
    }

    // Music Notes Effect (Top Right)
    if (state.musicPlaying) {
        if (Math.random() < 0.05) {
            particlesRef.current.push({
                x: width * 0.8,
                y: height * 0.3,
                vx: (Math.random() - 0.5) * 2,
                vy: -Math.random() * 2 - 1,
                life: 1.0
            });
        }
    }

    // Update and draw particles
    for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.02;

        if (p.life <= 0) {
            particlesRef.current.splice(i, 1);
            continue;
        }

        ctx.globalAlpha = p.life;
        ctx.fillStyle = '#ec4899'; // Pink
        ctx.font = '20px Arial';
        ctx.fillText('♪', p.x, p.y);
        ctx.globalAlpha = 1;
    }

    // --- Status & Workflow Visualization ---
    
    // Status Bubble
    const bubbleX = centerX + 80;
    const bubbleY = centerY - 80;
    
    if (state.status !== 'idle') {
        // Bubble shape
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.moveTo(bubbleX, bubbleY);
        ctx.quadraticCurveTo(bubbleX + 60, bubbleY - 20, bubbleX + 120, bubbleY); // Top curve
        ctx.quadraticCurveTo(bubbleX + 140, bubbleY + 40, bubbleX + 120, bubbleY + 80); // Right
        ctx.quadraticCurveTo(bubbleX + 60, bubbleY + 100, bubbleX, bubbleY + 80); // Bottom
        ctx.quadraticCurveTo(bubbleX - 20, bubbleY + 40, bubbleX, bubbleY); // Left
        ctx.fill();
        
        // Dynamic tail
        ctx.beginPath();
        ctx.moveTo(bubbleX + 10, bubbleY + 75);
        ctx.lineTo(centerX + 50, centerY - 20); // Point to robot head
        ctx.lineTo(bubbleX + 40, bubbleY + 80);
        ctx.fill();

        // Text
        ctx.fillStyle = '#1e293b';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';

        if (state.status === 'listening') {
            ctx.fillText('Listening...', bubbleX + 60, bubbleY + 45);
            // Visualizer bars
            ctx.fillStyle = '#3b82f6';
            for(let i=0; i<5; i++) {
                const h = 5 + Math.random() * state.audioLevel;
                ctx.fillRect(bubbleX + 40 + i*10, bubbleY + 60 - h, 6, h);
            }
        } else if (state.status === 'processing') {
             ctx.fillText('Processing...', bubbleX + 60, bubbleY + 35);
             ctx.font = '10px Inter, sans-serif';
             ctx.fillStyle = '#64748b';
             ctx.fillText(state.currentCommand, bubbleX + 60, bubbleY + 55);
             // AI Brain icon representation
             ctx.fillStyle = '#8b5cf6';
             ctx.beginPath(); ctx.arc(bubbleX + 60, bubbleY + 75, 4, 0, Math.PI*2); ctx.fill();
        } else if (state.status === 'executing') {
             ctx.fillText('Executing:', bubbleX + 60, bubbleY + 35);
             ctx.fillStyle = '#10b981';
             ctx.fillText(state.currentCommand, bubbleX + 60, bubbleY + 55);
        } else if (state.status === 'success') {
             ctx.fillStyle = '#10b981';
             ctx.font = 'bold 14px Inter, sans-serif';
             ctx.fillText('Done!', bubbleX + 60, bubbleY + 45);
        }
    }


    animationRef.current = requestAnimationFrame(() => animateFnRef.current());
  }, [mode, state]);

  useEffect(() => {
    animateFnRef.current = animate;
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const container = canvas.parentElement;
    if (container) {
      canvas.width = Math.min(container.clientWidth, 800);
      canvas.height = 350;
    }

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Interaction Handlers
  const runCommand = (cmd: string, action: () => void) => {
    if (state.status !== 'idle' && state.status !== 'success') return;

    // 1. Listening
    setState(s => ({ ...s, status: 'listening', expression: 'listening', audioLevel: 10 }));
    const volInterval = setInterval(() => {
        setState(s => ({ ...s, audioLevel: Math.random() * 20 + 5 }));
    }, 100);

    setTimeout(() => {
        clearInterval(volInterval);
        // 2. Processing
        setState(s => ({ ...s, status: 'processing', expression: 'thinking', currentCommand: cmd, audioLevel: 0 }));
        
        setTimeout(() => {
            // 3. Executing + Action
            setState(s => ({ ...s, status: 'executing', expression: 'happy' }));
            action();
            
            setTimeout(() => {
                // 4. Done
                setState(s => ({ ...s, status: 'success', expression: 'success' }));
                
                setTimeout(() => {
                   // Reset
                   setState(s => ({ ...s, status: 'idle', expression: 'neutral' }));
                }, 1500);
            }, 1000);
        }, 1500);
    }, 2000);
  };

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 p-6"
    >
      <div className="text-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-purple-500">
          Interactive Demo
        </span>
        <h3 className="text-xl font-bold text-white mt-2">Voice Command Simulation</h3>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full rounded-xl border border-slate-700"
          style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        <button
          onClick={() => runCommand("Turn on lights", () => setState(s => ({ ...s, lightOn: !s.lightOn })))}
          disabled={state.status !== 'idle' && state.status !== 'success'}
          className="px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            bg-yellow-500 text-black hover:bg-yellow-400 transition-all duration-300 
            flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-lightbulb" />
          "Toggle Lights"
        </button>
        
        <button
          onClick={() => runCommand("Play music", () => setState(s => ({ ...s, musicPlaying: !s.musicPlaying })))}
          disabled={state.status !== 'idle' && state.status !== 'success'}
          className="px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            bg-pink-500 text-white hover:bg-pink-400 transition-all duration-300 
            flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-music" />
           "Toggle Music"
        </button>
        
        <button
          onClick={() => runCommand("System status", () => {})}
          disabled={state.status !== 'idle' && state.status !== 'success'}
          className="px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            bg-blue-500 text-white hover:bg-blue-400 transition-all duration-300 
            flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <i className="fas fa-robot" />
          "Check Status"
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Click a command to simulate the Voice &rarr; AI &rarr; Action processing pipeline
      </div>
    </motion.div>
  );
};

export default BeemoAnimation;
