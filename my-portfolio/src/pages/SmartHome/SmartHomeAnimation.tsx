import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

interface SmartHomeState {
  lightOn: boolean;
  temperature: number;
  humidity: number;
  fireDetected: boolean;
  powerUsage: number;
  alarmOn: boolean;
  doorLocked: boolean;
  fanOn: boolean;
}

const SmartHomeAnimation: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animateFnRef = useRef<() => void>(() => {});
  
  const [state, setState] = useState<SmartHomeState>({
    lightOn: true,
    temperature: 24,
    humidity: 55,
    fireDetected: false,
    powerUsage: 125,
    alarmOn: false,
    doorLocked: true,
    fanOn: false,
  });

  const timeRef = useRef(0);

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

    // Draw house outline
    const houseX = width / 2 - 180;
    const houseY = 60;
    const houseWidth = 360;
    const houseHeight = 220;

    // House walls - with glow if fire detected
    if (state.fireDetected) {
      ctx.shadowBlur = 30;
      ctx.shadowColor = 'rgba(239, 68, 68, 0.8)';
    }
    
    ctx.fillStyle = state.fireDetected ? 'rgba(127, 29, 29, 0.9)' : '#2d3748';
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 3;
    
    // Main house body
    ctx.beginPath();
    ctx.rect(houseX, houseY + 60, houseWidth, houseHeight);
    ctx.fill();
    ctx.stroke();
    
    // Roof
    ctx.beginPath();
    ctx.moveTo(houseX - 20, houseY + 60);
    ctx.lineTo(houseX + houseWidth / 2, houseY);
    ctx.lineTo(houseX + houseWidth + 20, houseY + 60);
    ctx.closePath();
    ctx.fillStyle = state.fireDetected ? '#991b1b' : '#4a5568';
    ctx.fill();
    ctx.stroke();
    
    ctx.shadowBlur = 0;

    // Draw rooms grid
    const roomWidth = houseWidth / 2 - 10;
    const roomHeight = (houseHeight - 20) / 2;

    // Living Room (top-left) - with light
    const livingRoomX = houseX + 10;
    const livingRoomY = houseY + 70;
    
    ctx.fillStyle = state.lightOn ? 'rgba(251, 191, 36, 0.3)' : 'rgba(30, 30, 30, 0.5)';
    ctx.fillRect(livingRoomX, livingRoomY, roomWidth, roomHeight);
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 1;
    ctx.strokeRect(livingRoomX, livingRoomY, roomWidth, roomHeight);
    
    // Light bulb in living room
    const lightX = livingRoomX + roomWidth / 2;
    const lightY = livingRoomY + 30;
    
    if (state.lightOn) {
      // Light glow
      const gradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, 60);
      gradient.addColorStop(0, 'rgba(251, 191, 36, 0.6)');
      gradient.addColorStop(1, 'rgba(251, 191, 36, 0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(lightX, lightY, 60, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Bulb icon
    ctx.fillStyle = state.lightOn ? '#fbbf24' : '#4a5568';
    ctx.beginPath();
    ctx.arc(lightX, lightY, 12, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = state.lightOn ? '#fcd34d' : '#374151';
    ctx.beginPath();
    ctx.arc(lightX, lightY, 8, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVING ROOM', livingRoomX + roomWidth / 2, livingRoomY + roomHeight - 10);

    // Bedroom (top-right) - with fan
    const bedroomX = houseX + houseWidth / 2 + 5;
    const bedroomY = houseY + 70;
    
    ctx.fillStyle = state.fanOn ? 'rgba(59, 130, 246, 0.2)' : 'rgba(30, 30, 30, 0.5)';
    ctx.fillRect(bedroomX, bedroomY, roomWidth, roomHeight);
    ctx.strokeStyle = '#4a5568';
    ctx.strokeRect(bedroomX, bedroomY, roomWidth, roomHeight);
    
    // Fan animation
    const fanX = bedroomX + roomWidth / 2;
    const fanY = bedroomY + 35;
    
    ctx.save();
    ctx.translate(fanX, fanY);
    if (state.fanOn) {
      ctx.rotate(timeRef.current * 8);
    }
    
    ctx.fillStyle = state.fanOn ? '#3b82f6' : '#4a5568';
    for (let i = 0; i < 4; i++) {
      ctx.save();
      ctx.rotate((i * Math.PI) / 2);
      ctx.beginPath();
      ctx.ellipse(0, -12, 4, 15, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
    // Fan center
    ctx.beginPath();
    ctx.arc(0, 0, 6, 0, Math.PI * 2);
    ctx.fillStyle = '#1e293b';
    ctx.fill();
    ctx.restore();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText('BEDROOM', bedroomX + roomWidth / 2, bedroomY + roomHeight - 10);

    // Kitchen (bottom-left) - with fire sensor
    const kitchenX = houseX + 10;
    const kitchenY = houseY + 70 + roomHeight + 10;
    
    ctx.fillStyle = state.fireDetected ? 'rgba(239, 68, 68, 0.4)' : 'rgba(30, 30, 30, 0.5)';
    ctx.fillRect(kitchenX, kitchenY, roomWidth, roomHeight);
    ctx.strokeStyle = '#4a5568';
    ctx.strokeRect(kitchenX, kitchenY, roomWidth, roomHeight);
    
    // Fire/flame visualization
    const fireX = kitchenX + roomWidth / 2;
    const fireY = kitchenY + 40;
    
    if (state.fireDetected) {
      // Animated flames
      for (let i = 0; i < 5; i++) {
        const flameOffset = Math.sin(timeRef.current * 10 + i) * 5;
        const flameHeight = 20 + Math.sin(timeRef.current * 8 + i * 2) * 8;
        
        ctx.fillStyle = i % 2 === 0 ? '#ef4444' : '#f59e0b';
        ctx.beginPath();
        ctx.moveTo(fireX - 15 + i * 8, fireY + 15);
        ctx.quadraticCurveTo(
          fireX - 15 + i * 8 + flameOffset,
          fireY - flameHeight,
          fireX - 10 + i * 8,
          fireY + 15
        );
        ctx.fill();
      }
    } else {
      // Stove icon
      ctx.fillStyle = '#4a5568';
      ctx.fillRect(fireX - 20, fireY, 40, 25);
      ctx.fillStyle = '#1e293b';
      for (let i = 0; i < 2; i++) {
        ctx.beginPath();
        ctx.arc(fireX - 8 + i * 16, fireY + 12, 6, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText('KITCHEN', kitchenX + roomWidth / 2, kitchenY + roomHeight - 10);

    // Entrance (bottom-right) - with door
    const entranceX = houseX + houseWidth / 2 + 5;
    const entranceY = houseY + 70 + roomHeight + 10;
    
    ctx.fillStyle = 'rgba(30, 30, 30, 0.5)';
    ctx.fillRect(entranceX, entranceY, roomWidth, roomHeight);
    ctx.strokeStyle = '#4a5568';
    ctx.strokeRect(entranceX, entranceY, roomWidth, roomHeight);
    
    // Door
    const doorX = entranceX + roomWidth / 2 - 15;
    const doorY = entranceY + 15;
    
    ctx.fillStyle = state.doorLocked ? '#854d0e' : '#a16207';
    ctx.fillRect(doorX, doorY, 30, 50);
    ctx.strokeStyle = '#713f12';
    ctx.lineWidth = 2;
    ctx.strokeRect(doorX, doorY, 30, 50);
    
    // Door handle and lock indicator
    ctx.fillStyle = state.doorLocked ? '#22c55e' : '#ef4444';
    ctx.beginPath();
    ctx.arc(doorX + 24, doorY + 30, 4, 0, Math.PI * 2);
    ctx.fill();
    
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText('ENTRANCE', entranceX + roomWidth / 2, entranceY + roomHeight - 10);

    // Draw sensor panel (right side)
    const panelX = width - 180;
    const panelY = 30;
    
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#f97316';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(panelX, panelY, 160, 280, 12);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#f97316';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('SENSOR DATA', panelX + 80, panelY + 22);

    // Temperature
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('Temperature', panelX + 15, panelY + 50);
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 20px Inter, sans-serif';
    const displayTemp = state.temperature + Math.sin(timeRef.current) * 0.3;
    ctx.fillText(`${displayTemp.toFixed(1)}°C`, panelX + 15, panelY + 75);

    // Humidity
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Humidity', panelX + 15, panelY + 105);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 20px Inter, sans-serif';
    const displayHumidity = state.humidity + Math.sin(timeRef.current * 1.5) * 0.5;
    ctx.fillText(`${displayHumidity.toFixed(0)}%`, panelX + 15, panelY + 130);

    // Power Usage
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Power Usage', panelX + 15, panelY + 160);
    ctx.fillStyle = '#fbbf24';
    ctx.font = 'bold 20px Inter, sans-serif';
    const displayPower = state.powerUsage + (state.lightOn ? 60 : 0) + (state.fanOn ? 45 : 0);
    ctx.fillText(`${displayPower}W`, panelX + 15, panelY + 185);

    // Fire Status
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Fire Status', panelX + 15, panelY + 215);
    ctx.fillStyle = state.fireDetected ? '#ef4444' : '#22c55e';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(state.fireDetected ? '⚠ ALERT!' : '✓ Normal', panelX + 15, panelY + 235);

    // System Status
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('System', panelX + 15, panelY + 260);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('● Online', panelX + 15, panelY + 278);

    // ESP32 / Firebase indicator
    const espX = 30;
    const espY = height - 90;
    
    ctx.fillStyle = 'rgba(15, 23, 42, 0.9)';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(espX, espY, 140, 75, 8);
    ctx.fill();
    ctx.stroke();
    
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('ESP32 Controller', espX + 70, espY + 18);
    
    // Status LEDs
    const ledY = espY + 40;
    const leds = [
      { label: 'WiFi', color: '#22c55e', blink: true },
      { label: 'MQTT', color: '#3b82f6', blink: false },
      { label: 'Firebase', color: '#f59e0b', blink: true },
    ];
    
    leds.forEach((led, i) => {
      const ledX = espX + 25 + i * 40;
      const opacity = led.blink ? 0.5 + Math.sin(timeRef.current * 5 + i) * 0.5 : 1;
      ctx.fillStyle = led.color;
      ctx.globalAlpha = opacity;
      ctx.beginPath();
      ctx.arc(ledX, ledY, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      
      ctx.fillStyle = '#94a3b8';
      ctx.font = '8px Inter, sans-serif';
      ctx.fillText(led.label, ledX, ledY + 18);
    });

    // Fire alarm overlay
    if (state.fireDetected) {
      const flashOpacity = Math.sin(timeRef.current * 10) * 0.15 + 0.1;
      ctx.fillStyle = `rgba(239, 68, 68, ${flashOpacity})`;
      ctx.fillRect(0, 0, width, height);
      
      // Alarm text
      ctx.fillStyle = '#ef4444';
      ctx.font = 'bold 24px Inter, sans-serif';
      ctx.textAlign = 'center';
      const textY = 25 + Math.sin(timeRef.current * 8) * 3;
      ctx.fillText('🔥 FIRE ALARM ACTIVATED 🔥', width / 2, textY);
    }

    // Alarm sound indicator when fire
    if (state.fireDetected && state.alarmOn) {
      const soundWaveOpacity = Math.sin(timeRef.current * 15) * 0.5 + 0.5;
      ctx.strokeStyle = `rgba(239, 68, 68, ${soundWaveOpacity})`;
      ctx.lineWidth = 2;
      
      // Sound waves from buzzer
      for (let i = 1; i <= 3; i++) {
        ctx.beginPath();
        ctx.arc(kitchenX + roomWidth / 2, kitchenY + 20, 20 + i * 15, -Math.PI * 0.3, Math.PI * 0.3);
        ctx.stroke();
      }
    }

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());
  }, [mode, state]);

  // Keep the animate function ref in sync
  useEffect(() => {
    animateFnRef.current = animate;
  });

  // Initialize animation
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

  const toggleLight = () => setState(s => ({ ...s, lightOn: !s.lightOn }));
  const toggleFan = () => setState(s => ({ ...s, fanOn: !s.fanOn }));
  const toggleDoor = () => setState(s => ({ ...s, doorLocked: !s.doorLocked }));
  
  const simulateFire = () => {
    setState(s => ({ ...s, fireDetected: true, alarmOn: true }));
    setTimeout(() => {
      setState(s => ({ ...s, fireDetected: false, alarmOn: false }));
    }, 4000);
  };

  const resetDemo = () => {
    setState({
      lightOn: true,
      temperature: 24,
      humidity: 55,
      fireDetected: false,
      powerUsage: 125,
      alarmOn: false,
      doorLocked: true,
      fanOn: false,
    });
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
        <span className="text-[10px] font-black uppercase tracking-widest text-orange-500">
          Interactive Demo
        </span>
        <h3 className="text-xl font-bold text-white mt-2">Smart Home Control Panel</h3>
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
          onClick={toggleLight}
          className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${state.lightOn
              ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
        >
          <i className="fas fa-lightbulb" />
          Light {state.lightOn ? 'On' : 'Off'}
        </button>
        
        <button
          onClick={toggleFan}
          className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${state.fanOn
              ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
        >
          <i className="fas fa-fan" />
          Fan {state.fanOn ? 'On' : 'Off'}
        </button>
        
        <button
          onClick={toggleDoor}
          className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${state.doorLocked
              ? 'bg-green-500 text-white shadow-lg shadow-green-500/30'
              : 'bg-red-500 text-white shadow-lg shadow-red-500/30'
            }`}
        >
          <i className={`fas fa-${state.doorLocked ? 'lock' : 'lock-open'}`} />
          {state.doorLocked ? 'Locked' : 'Unlocked'}
        </button>
        
        <button
          onClick={simulateFire}
          disabled={state.fireDetected}
          className="px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            bg-red-600 text-white hover:bg-red-700 transition-all duration-300 
            flex items-center gap-2 disabled:opacity-50"
        >
          <i className="fas fa-fire" />
          Simulate Fire
        </button>
        
        <button
          onClick={resetDemo}
          className="px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white
            transition-all duration-300 flex items-center gap-2"
        >
          <i className="fas fa-redo" />
          Reset
        </button>
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Control devices, monitor sensors, and test fire detection in real-time
      </div>
    </motion.div>
  );
};

export default SmartHomeAnimation;
