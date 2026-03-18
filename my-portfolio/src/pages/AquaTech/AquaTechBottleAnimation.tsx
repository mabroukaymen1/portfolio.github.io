import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

type DemoMode = 'auto' | 'manual';

interface SystemState {
  bottlePosition: number; // 0 = start, 1 = filling station, 2 = capping station, 3 = exit
  fillLevel: number; // 0-100
  capPosition: number; // 0 = up, 1 = down
  valveOpen: boolean;
  bottleCount: number;
  tankLevel: number;
  status: string;
  isProcessing: boolean;
}

const AquaTechBottleAnimation: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animateFnRef = useRef<() => void>(() => {});
  const [demoMode, setDemoMode] = useState<DemoMode>('auto');
  
  const stateRef = useRef<SystemState>({
    bottlePosition: 0,
    fillLevel: 0,
    capPosition: 0,
    valveOpen: false,
    bottleCount: 0,
    tankLevel: 85,
    status: 'Waiting for bottle',
    isProcessing: false,
  });

  const timeRef = useRef(0);
  const frameRef = useRef(0);

  // Main animation loop
  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const state = stateRef.current;

    timeRef.current += 0.016;
    frameRef.current++;

    // Clear canvas
    ctx.fillStyle = mode === 'terminal' ? '#0a0a0a' : '#0c1929';
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern
    ctx.strokeStyle = mode === 'terminal' ? '#1a1a1a' : '#1e3a5f';
    ctx.lineWidth = 0.5;
    for (let x = 0; x < width; x += 30) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 30) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Positions
    const conveyorY = height - 80;
    const fillingStationX = width * 0.35;
    const cappingStationX = width * 0.65;

    // Draw conveyor belt
    ctx.fillStyle = '#374151';
    ctx.fillRect(50, conveyorY, width - 100, 20);
    
    // Conveyor rollers
    ctx.fillStyle = '#1f2937';
    for (let x = 70; x < width - 70; x += 40) {
      ctx.beginPath();
      ctx.arc(x, conveyorY + 10, 8, 0, Math.PI * 2);
      ctx.fill();
      // Roller rotation animation
      ctx.strokeStyle = '#4b5563';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(x, conveyorY + 10, 8, timeRef.current * 3, timeRef.current * 3 + Math.PI);
      ctx.stroke();
    }

    // Draw water tank
    const tankX = 30;
    const tankY = 50;
    const tankWidth = 80;
    const tankHeight = 150;
    
    // Tank body
    ctx.fillStyle = '#1e3a5f';
    ctx.strokeStyle = '#06b6d4';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(tankX, tankY, tankWidth, tankHeight, 8);
    ctx.fill();
    ctx.stroke();
    
    // Water in tank
    const waterHeight = (state.tankLevel / 100) * (tankHeight - 20);
    ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
    ctx.fillRect(tankX + 5, tankY + tankHeight - waterHeight - 5, tankWidth - 10, waterHeight);
    
    // Water waves
    ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    const waveY = tankY + tankHeight - waterHeight - 5;
    for (let x = tankX + 5; x < tankX + tankWidth - 5; x += 3) {
      const y = waveY + Math.sin((x + timeRef.current * 50) * 0.1) * 3;
      if (x === tankX + 5) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
    
    // Tank label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WATER', tankX + tankWidth / 2, tankY + 20);
    ctx.fillText(`${state.tankLevel}%`, tankX + tankWidth / 2, tankY + 38);

    // Draw filling station
    ctx.fillStyle = '#1e40af';
    ctx.strokeStyle = '#3b82f6';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(fillingStationX - 40, 60, 80, 120, 8);
    ctx.fill();
    ctx.stroke();
    
    // Filling nozzle
    ctx.fillStyle = '#6b7280';
    ctx.fillRect(fillingStationX - 10, 180, 20, 40);
    
    // Valve indicator
    ctx.fillStyle = state.valveOpen ? '#22c55e' : '#ef4444';
    ctx.beginPath();
    ctx.arc(fillingStationX, 200, 6, 0, Math.PI * 2);
    ctx.fill();
    
    // Water stream when valve open
    if (state.valveOpen) {
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.8)';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(fillingStationX, 220);
      ctx.lineTo(fillingStationX, conveyorY - 60);
      ctx.stroke();
      
      // Splash effect
      for (let i = 0; i < 5; i++) {
        const splashX = fillingStationX + (Math.random() - 0.5) * 20;
        const splashY = conveyorY - 60 + Math.random() * 10;
        ctx.beginPath();
        ctx.arc(splashX, splashY, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(6, 182, 212, 0.6)';
        ctx.fill();
      }
    }
    
    // Station label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('FILLING', fillingStationX, 85);

    // Draw capping station
    ctx.fillStyle = '#7c3aed';
    ctx.strokeStyle = '#a78bfa';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(cappingStationX - 40, 60, 80, 120, 8);
    ctx.fill();
    ctx.stroke();
    
    // Capping mechanism
    const capArmY = 180 + state.capPosition * 40;
    ctx.fillStyle = '#9ca3af';
    ctx.fillRect(cappingStationX - 15, 180, 30, capArmY - 180 + 20);
    
    // Cap holder
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cappingStationX, capArmY + 20, 12, 0, Math.PI * 2);
    ctx.fill();
    
    // Station label
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.fillText('CAPPING', cappingStationX, 85);

    // Calculate bottle X position based on state
    let bottleX = 0;
    const bottleTargets = [80, fillingStationX, cappingStationX, width - 80];
    
    if (state.isProcessing) {
      bottleX = bottleTargets[Math.floor(state.bottlePosition)];
    } else {
      // Smooth interpolation
      const currentTarget = Math.floor(state.bottlePosition);
      const nextTarget = Math.min(currentTarget + 1, 3);
      const progress = state.bottlePosition - currentTarget;
      bottleX = bottleTargets[currentTarget] + (bottleTargets[nextTarget] - bottleTargets[currentTarget]) * progress;
    }

    // Draw bottle
    if (state.bottlePosition >= 0) {
      // Bottle body
      ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.roundRect(bottleX - 15, conveyorY - 60, 30, 55, 4);
      ctx.fill();
      ctx.stroke();
      
      // Bottle neck
      ctx.beginPath();
      ctx.roundRect(bottleX - 8, conveyorY - 75, 16, 20, 2);
      ctx.fill();
      ctx.stroke();
      
      // Water in bottle
      if (state.fillLevel > 0) {
        const bottleFillHeight = (state.fillLevel / 100) * 45;
        ctx.fillStyle = 'rgba(6, 182, 212, 0.7)';
        ctx.fillRect(bottleX - 12, conveyorY - 8 - bottleFillHeight, 24, bottleFillHeight);
      }
      
      // Cap on bottle
      if (state.capPosition >= 0.9 && Math.floor(state.bottlePosition) >= 2) {
        ctx.fillStyle = '#f59e0b';
        ctx.beginPath();
        ctx.roundRect(bottleX - 10, conveyorY - 82, 20, 10, 3);
        ctx.fill();
      }
    }

    // ESP32 Controller visual
    ctx.fillStyle = '#059669';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(width - 130, 50, 100, 60, 6);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.fillText('ESP32', width - 80, 70);
    
    // Status LEDs on ESP32
    ctx.fillStyle = state.isProcessing ? '#22c55e' : '#64748b';
    ctx.beginPath();
    ctx.arc(width - 110, 90, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = state.valveOpen ? '#06b6d4' : '#64748b';
    ctx.beginPath();
    ctx.arc(width - 95, 90, 5, 0, Math.PI * 2);
    ctx.fill();
    
    // WiFi indicator
    const wifiPulse = Math.sin(timeRef.current * 5) * 0.3 + 0.7;
    ctx.fillStyle = `rgba(34, 197, 94, ${wifiPulse})`;
    ctx.beginPath();
    ctx.arc(width - 65, 90, 5, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#10b981';
    ctx.font = '8px Inter, sans-serif';
    ctx.fillText('WiFi', width - 55, 93);

    // Firebase cloud visual
    ctx.fillStyle = '#f59e0b';
    ctx.strokeStyle = '#fbbf24';
    ctx.lineWidth = 2;
    
    // Cloud shape
    ctx.beginPath();
    ctx.arc(width - 80, 140, 15, Math.PI, Math.PI * 2);
    ctx.arc(width - 60, 135, 20, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(width - 40, 140, 15, 0, Math.PI);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText('Firebase', width - 60, 143);

    // Connection lines
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.5)';
    ctx.setLineDash([5, 5]);
    ctx.beginPath();
    ctx.moveTo(width - 80, 110);
    ctx.lineTo(width - 60, 130);
    ctx.stroke();
    ctx.setLineDash([]);

    // Status panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    ctx.beginPath();
    ctx.roundRect(10, height - 70, 200, 60, 8);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Mode: ${demoMode.toUpperCase()}`, 20, height - 50);
    
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#06b6d4';
    ctx.fillText(`Bottles: ${state.bottleCount}`, 20, height - 32);
    
    ctx.fillStyle = state.status.includes('Complete') ? '#22c55e' : '#94a3b8';
    ctx.fillText(state.status, 20, height - 15);

    // Auto mode logic
    if (demoMode === 'auto') {
      // State machine for bottle processing
      if (!state.isProcessing && state.bottlePosition < 0.1) {
        // Start new bottle
        state.bottlePosition = 0;
        state.fillLevel = 0;
        state.capPosition = 0;
        state.status = 'Bottle entering...';
        state.isProcessing = true;
      } else if (state.bottlePosition < 1 && state.isProcessing) {
        // Moving to filling station
        state.bottlePosition += 0.015;
        state.status = 'Moving to fill station';
        if (state.bottlePosition >= 1) {
          state.bottlePosition = 1;
          state.valveOpen = true;
          state.status = 'Filling bottle...';
        }
      } else if (state.bottlePosition === 1 && state.fillLevel < 100) {
        // Filling bottle
        state.fillLevel += 1.5;
        state.tankLevel = Math.max(state.tankLevel - 0.05, 20);
        if (state.fillLevel >= 100) {
          state.fillLevel = 100;
          state.valveOpen = false;
          state.status = 'Fill complete';
        }
      } else if (state.bottlePosition >= 1 && state.bottlePosition < 2 && state.fillLevel >= 100) {
        // Moving to capping station
        state.bottlePosition += 0.015;
        state.status = 'Moving to capping';
        if (state.bottlePosition >= 2) {
          state.bottlePosition = 2;
          state.status = 'Capping bottle...';
        }
      } else if (state.bottlePosition === 2 && state.capPosition < 1) {
        // Capping
        state.capPosition += 0.05;
        if (state.capPosition >= 1) {
          state.capPosition = 1;
          state.status = 'Cap secured';
        }
      } else if (state.bottlePosition >= 2 && state.bottlePosition < 3 && state.capPosition >= 1) {
        // Moving to exit
        state.bottlePosition += 0.015;
        state.status = 'Bottle exiting...';
        if (state.bottlePosition >= 3) {
          state.bottlePosition = 3;
          state.bottleCount++;
          state.status = 'Complete! Resetting...';
          // Reset for next bottle after delay
          setTimeout(() => {
            state.bottlePosition = 0;
            state.fillLevel = 0;
            state.capPosition = 0;
            state.isProcessing = false;
          }, 1500);
        }
      }
    }

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());
  }, [mode, demoMode]);

  // Keep the animate function ref in sync
  useEffect(() => {
    animateFnRef.current = animate;
  });

  // Initialize and start animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const container = canvas.parentElement;
    if (container) {
      canvas.width = Math.min(container.clientWidth, 800);
      canvas.height = 350;
    }

    // Reset state
    stateRef.current = {
      bottlePosition: 0,
      fillLevel: 0,
      capPosition: 0,
      valveOpen: false,
      bottleCount: 0,
      tankLevel: 85,
      status: 'System ready',
      isProcessing: false,
    };

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [demoMode]);

  const handleReset = () => {
    stateRef.current = {
      bottlePosition: 0,
      fillLevel: 0,
      capPosition: 0,
      valveOpen: false,
      bottleCount: 0,
      tankLevel: 85,
      status: 'System reset',
      isProcessing: false,
    };
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
        <span className="text-[10px] font-black uppercase tracking-widest text-cyan-500">
          Interactive Demo
        </span>
        <h3 className="text-xl font-bold text-white mt-2">See AquaTech in Action</h3>
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
          onClick={() => setDemoMode('auto')}
          className={`
            px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${demoMode === 'auto'
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }
          `}
        >
          <i className="fas fa-robot" />
          Auto Mode
        </button>
        <button
          onClick={() => setDemoMode('manual')}
          className={`
            px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${demoMode === 'manual'
              ? 'bg-cyan-500 text-white shadow-lg shadow-cyan-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }
          `}
        >
          <i className="fas fa-hand-paper" />
          Manual Mode
        </button>
        <button
          onClick={handleReset}
          className="px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white
            transition-all duration-300 flex items-center gap-2"
        >
          <i className="fas fa-redo" />
          Reset
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Watch the automated bottle filling and capping process with real-time IoT monitoring
      </div>
    </motion.div>
  );
};

export default AquaTechBottleAnimation;
