import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

interface LoRaState {
  temperature: number;
  humidity: number;
  signalStrength: number;
  packetLoss: number;
  isTransmitting: boolean;
  packetsReceived: number;
  lastPacketTime: number;
}

interface DataPacket {
  id: number;
  x: number;
  progress: number;
  temperature: number;
  humidity: number;
}

const LoRaAnimation: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animateFnRef = useRef<() => void>(() => {});
  const [isRunning, setIsRunning] = useState(true);
  
  const stateRef = useRef<LoRaState>({
    temperature: 25.0,
    humidity: 60,
    signalStrength: 90,
    packetLoss: 2,
    isTransmitting: false,
    packetsReceived: 0,
    lastPacketTime: 0,
  });

  const packetsRef = useRef<DataPacket[]>([]);
  const timeRef = useRef(0);
  const nextPacketIdRef = useRef(0);

  // Main animation loop
  const animate = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const state = stateRef.current;
    const packets = packetsRef.current;

    timeRef.current += 0.016;

    // Clear canvas
    ctx.fillStyle = mode === 'terminal' ? '#0a0a0a' : '#0f172a';
    ctx.fillRect(0, 0, width, height);

    // Draw signal wave background
    ctx.strokeStyle = 'rgba(16, 185, 129, 0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      for (let x = 0; x < width; x += 5) {
        const y = height / 2 + Math.sin((x + timeRef.current * 50 + i * 20) * 0.02) * (30 + i * 10);
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    }

    // Transmitter (Sender) - Left side
    const txX = 80;
    const txY = height / 2;

    // Transmitter board
    ctx.fillStyle = '#1e3a5f';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(txX - 50, txY - 60, 100, 120, 10);
    ctx.fill();
    ctx.stroke();

    // Transmitter label
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('TRANSMITTER', txX, txY - 70);

    // LoRa module representation
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(txX - 35, txY - 45, 70, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText('Heltec LoRa32', txX, txY - 22);

    // DHT11 sensor
    ctx.fillStyle = '#3b82f6';
    ctx.beginPath();
    ctx.roundRect(txX - 30, txY + 5, 60, 35, 5);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 8px Inter, sans-serif';
    ctx.fillText('DHT11', txX, txY + 27);

    // Temperature/Humidity values at transmitter
    ctx.fillStyle = '#94a3b8';
    ctx.font = '9px Inter, sans-serif';
    ctx.fillText(`${state.temperature.toFixed(1)}°C | ${state.humidity}%`, txX, txY + 50);

    // Transmitter antenna with signal waves
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(txX + 30, txY - 45);
    ctx.lineTo(txX + 30, txY - 75);
    ctx.stroke();

    // Antenna top
    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(txX + 30, txY - 78, 5, 0, Math.PI * 2);
    ctx.fill();

    // Signal waves from antenna when transmitting
    if (state.isTransmitting || packets.length > 0) {
      for (let i = 1; i <= 3; i++) {
        const waveRadius = 20 + i * 15 + (timeRef.current * 30) % 30;
        const opacity = Math.max(0, 1 - waveRadius / 80);
        ctx.strokeStyle = `rgba(16, 185, 129, ${opacity})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(txX + 30, txY - 78, waveRadius, -Math.PI / 4, Math.PI / 4);
        ctx.stroke();
      }
    }

    // Receiver (Gateway) - Right side
    const rxX = width - 80;
    const rxY = height / 2;

    // Receiver board
    ctx.fillStyle = '#1e3a5f';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.roundRect(rxX - 50, rxY - 60, 100, 120, 10);
    ctx.fill();
    ctx.stroke();

    // Receiver label
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('RECEIVER', rxX, rxY - 70);

    // LoRa module
    ctx.fillStyle = '#0f766e';
    ctx.fillRect(rxX - 35, rxY - 45, 70, 40);
    ctx.fillStyle = '#fff';
    ctx.font = 'bold 9px Inter, sans-serif';
    ctx.fillText('Heltec LoRa32', rxX, rxY - 22);

    // OLED display simulation
    ctx.fillStyle = '#000';
    ctx.strokeStyle = '#4a5568';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(rxX - 30, rxY + 5, 60, 35, 3);
    ctx.fill();
    ctx.stroke();

    // OLED content
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 7px monospace';
    ctx.fillText(`Temp: ${state.temperature.toFixed(1)}C`, rxX, rxY + 20);
    ctx.fillText(`Hum: ${state.humidity}%`, rxX, rxY + 32);

    // Receiver antenna
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(rxX - 30, rxY - 45);
    ctx.lineTo(rxX - 30, rxY - 75);
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.beginPath();
    ctx.arc(rxX - 30, rxY - 78, 5, 0, Math.PI * 2);
    ctx.fill();

    // Draw and update data packets
    if (isRunning) {
      // Create new packet periodically
      if (timeRef.current - state.lastPacketTime > 2) {
        state.lastPacketTime = timeRef.current;
        state.isTransmitting = true;
        
        // Simulate sensor reading variations
        state.temperature = 23 + Math.random() * 4;
        state.humidity = 55 + Math.floor(Math.random() * 15);
        
        packets.push({
          id: nextPacketIdRef.current++,
          x: txX + 50,
          progress: 0,
          temperature: state.temperature,
          humidity: state.humidity,
        });

        setTimeout(() => {
          state.isTransmitting = false;
        }, 500);
      }

      // Update packets
      const packetSpeed = 2;
      const targetX = rxX - 50;
      
      for (let i = packets.length - 1; i >= 0; i--) {
        const packet = packets[i];
        packet.x += packetSpeed;
        packet.progress = (packet.x - (txX + 50)) / (targetX - (txX + 50));

        // Draw packet
        const packetY = height / 2 + Math.sin(packet.x * 0.05 + packet.id) * 20;
        
        // Packet glow
        const gradient = ctx.createRadialGradient(packet.x, packetY, 0, packet.x, packetY, 20);
        gradient.addColorStop(0, 'rgba(16, 185, 129, 0.8)');
        gradient.addColorStop(1, 'rgba(16, 185, 129, 0)');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(packet.x, packetY, 20, 0, Math.PI * 2);
        ctx.fill();

        // Packet core
        ctx.fillStyle = '#10b981';
        ctx.beginPath();
        ctx.arc(packet.x, packetY, 8, 0, Math.PI * 2);
        ctx.fill();

        // Packet data visualization
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 6px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('DATA', packet.x, packetY + 3);

        // Trail effect
        for (let t = 1; t <= 5; t++) {
          const trailX = packet.x - t * 10;
          const trailY = height / 2 + Math.sin(trailX * 0.05 + packet.id) * 20;
          ctx.fillStyle = `rgba(16, 185, 129, ${0.3 - t * 0.05})`;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Remove packet when it reaches destination
        if (packet.x >= targetX) {
          packets.splice(i, 1);
          state.packetsReceived++;
          
          // Chance of packet loss
          if (Math.random() < 0.02) {
            state.packetLoss = Math.min(state.packetLoss + 0.5, 10);
          } else {
            state.packetLoss = Math.max(state.packetLoss - 0.1, 1);
          }
        }
      }
    }

    // Distance indicator
    ctx.fillStyle = '#64748b';
    ctx.font = '11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('← 300m Range →', width / 2, height - 50);

    // Frequency indicator
    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.fillText('868 MHz LoRa', width / 2, height - 30);

    // Firebase cloud (top right)
    const cloudX = width - 60;
    const cloudY = 50;

    // Draw cloud shape
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(cloudX - 15, cloudY, 12, Math.PI, Math.PI * 2);
    ctx.arc(cloudX + 5, cloudY - 5, 15, Math.PI * 1.1, Math.PI * 1.9);
    ctx.arc(cloudX + 20, cloudY, 12, 0, Math.PI);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 8px Inter, sans-serif';
    ctx.fillText('Firebase', cloudX, cloudY + 2);

    // Connection line to receiver
    ctx.strokeStyle = 'rgba(245, 158, 11, 0.5)';
    ctx.setLineDash([5, 5]);
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(rxX, rxY - 60);
    ctx.lineTo(cloudX, cloudY + 20);
    ctx.stroke();
    ctx.setLineDash([]);

    // WiFi icon near receiver
    const wifiY = rxY - 90;
    ctx.fillStyle = '#3b82f6';
    ctx.font = '12px FontAwesome, sans-serif';
    ctx.textAlign = 'center';
    
    // Simple WiFi arc representation
    for (let i = 1; i <= 3; i++) {
      const arcOpacity = 0.3 + (Math.sin(timeRef.current * 3 + i) * 0.3 + 0.3);
      ctx.strokeStyle = `rgba(59, 130, 246, ${arcOpacity})`;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(rxX, wifiY + 10, 5 + i * 5, Math.PI * 1.2, Math.PI * 1.8);
      ctx.stroke();
    }

    // Stats panel
    ctx.fillStyle = 'rgba(15, 23, 42, 0.95)';
    ctx.strokeStyle = '#10b981';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.roundRect(10, 10, 180, 130, 10);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#10b981';
    ctx.font = 'bold 11px Inter, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('LIVE DATA', 100, 28);

    ctx.textAlign = 'left';
    ctx.font = '10px Inter, sans-serif';
    
    // Temperature
    ctx.fillStyle = '#fff';
    ctx.fillText('Temperature:', 20, 50);
    ctx.fillStyle = '#3b82f6';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`${state.temperature.toFixed(1)}°C`, 100, 50);

    // Humidity
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Humidity:', 20, 70);
    ctx.fillStyle = '#06b6d4';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`${state.humidity}%`, 100, 70);

    // Signal strength
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Signal:', 20, 90);
    ctx.fillStyle = '#22c55e';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`${state.signalStrength}%`, 100, 90);

    // Packets received
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Packets:', 20, 110);
    ctx.fillStyle = '#f59e0b';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`${state.packetsReceived}`, 100, 110);

    // Packet loss
    ctx.fillStyle = '#fff';
    ctx.font = '10px Inter, sans-serif';
    ctx.fillText('Loss Rate:', 20, 130);
    ctx.fillStyle = state.packetLoss > 5 ? '#ef4444' : '#22c55e';
    ctx.font = 'bold 14px Inter, sans-serif';
    ctx.fillText(`${state.packetLoss.toFixed(1)}%`, 100, 130);

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());
  }, [mode, isRunning]);

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
      canvas.height = 320;
    }

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const handleStart = () => {
    setIsRunning(true);
    stateRef.current.lastPacketTime = 0;
  };

  const handleStop = () => {
    setIsRunning(false);
  };

  const handleReset = () => {
    stateRef.current = {
      temperature: 25.0,
      humidity: 60,
      signalStrength: 90,
      packetLoss: 2,
      isTransmitting: false,
      packetsReceived: 0,
      lastPacketTime: 0,
    };
    packetsRef.current = [];
    setIsRunning(true);
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
        <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">
          Interactive Demo
        </span>
        <h3 className="text-xl font-bold text-white mt-2">LoRa Data Transmission</h3>
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
          onClick={handleStart}
          disabled={isRunning}
          className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${isRunning
              ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
        >
          <i className="fas fa-play" />
          Start
        </button>
        
        <button
          onClick={handleStop}
          disabled={!isRunning}
          className={`px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
            transition-all duration-300 flex items-center gap-2
            ${!isRunning
              ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
              : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
            }`}
        >
          <i className="fas fa-pause" />
          Stop
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
        Watch data packets travel wirelessly from the DHT11 sensor to the cloud via LoRa
      </div>
    </motion.div>
  );
};

export default LoRaAnimation;
