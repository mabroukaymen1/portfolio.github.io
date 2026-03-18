import React from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

const LineFollowerCircuit: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden border-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6"
    >
      <div className="text-center mb-6">
        <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">
          Hardware Architecture
        </span>
        <h3 className="text-xl font-bold dark:text-white mt-2">Circuit Diagram</h3>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox="0 0 800 500"
          className="w-full max-w-4xl mx-auto"
          style={{ minWidth: '600px' }}
        >
          {/* Background */}
          <rect width="800" height="500" fill="#0f172a" rx="12" />
          
          {/* Grid pattern */}
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1e293b" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="800" height="500" fill="url(#grid)" />

          {/* Arduino Uno - Center */}
          <g transform="translate(320, 180)">
            <rect x="0" y="0" width="160" height="120" rx="8" fill="#1e40af" stroke="#3b82f6" strokeWidth="2" />
            <rect x="10" y="10" width="140" height="30" rx="4" fill="#0f172a" />
            <text x="80" y="30" textAnchor="middle" fill="#60a5fa" fontSize="12" fontWeight="bold">ARDUINO UNO</text>
            
            {/* Digital pins */}
            <g transform="translate(0, 50)">
              {[...Array(8)].map((_, i) => (
                <g key={i}>
                  <circle cx={20 + i * 17} cy="10" r="4" fill="#fbbf24" />
                  <text x={20 + i * 17} y="25" textAnchor="middle" fill="#94a3b8" fontSize="8">D{i + 2}</text>
                </g>
              ))}
            </g>
            
            {/* Power pins */}
            <g transform="translate(0, 85)">
              <circle cx="25" cy="10" r="5" fill="#ef4444" />
              <text x="25" y="25" textAnchor="middle" fill="#ef4444" fontSize="8">5V</text>
              <circle cx="55" cy="10" r="5" fill="#1e1e1e" stroke="#64748b" />
              <text x="55" y="25" textAnchor="middle" fill="#64748b" fontSize="8">GND</text>
              <circle cx="85" cy="10" r="5" fill="#ef4444" />
              <text x="85" y="25" textAnchor="middle" fill="#ef4444" fontSize="8">VIN</text>
            </g>
            
            {/* USB port */}
            <rect x="130" y="45" width="30" height="20" rx="2" fill="#334155" />
            <text x="145" y="58" textAnchor="middle" fill="#64748b" fontSize="7">USB</text>
          </g>

          {/* IR Sensors - Left */}
          <g transform="translate(40, 100)">
            <rect x="0" y="0" width="100" height="70" rx="6" fill="#047857" stroke="#10b981" strokeWidth="2" />
            <text x="50" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">IR SENSORS</text>
            <text x="50" y="35" textAnchor="middle" fill="#a7f3d0" fontSize="9">(TCRT5000 x2)</text>
            
            {/* Sensor indicators */}
            <circle cx="30" cy="55" r="8" fill="#18181b" stroke="#22c55e" strokeWidth="2" />
            <text x="30" y="58" textAnchor="middle" fill="#22c55e" fontSize="8">L</text>
            <circle cx="70" cy="55" r="8" fill="#18181b" stroke="#22c55e" strokeWidth="2" />
            <text x="70" y="58" textAnchor="middle" fill="#22c55e" fontSize="8">R</text>
          </g>

          {/* Connection: IR Sensors to Arduino */}
          <path d="M 140 135 Q 200 135 320 220" stroke="#22c55e" strokeWidth="2" fill="none" strokeDasharray="5,3" />
          <path d="M 140 145 Q 200 145 320 230" stroke="#fbbf24" strokeWidth="2" fill="none" />

          {/* Ultrasonic Sensor - Top */}
          <g transform="translate(340, 30)">
            <rect x="0" y="0" width="120" height="60" rx="6" fill="#7c3aed" stroke="#a78bfa" strokeWidth="2" />
            <text x="60" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">ULTRASONIC</text>
            <text x="60" y="35" textAnchor="middle" fill="#c4b5fd" fontSize="9">HC-SR04</text>
            
            {/* Ultrasonic "eyes" */}
            <circle cx="35" cy="48" r="10" fill="#18181b" stroke="#a78bfa" strokeWidth="2" />
            <circle cx="85" cy="48" r="10" fill="#18181b" stroke="#a78bfa" strokeWidth="2" />
          </g>

          {/* Connection: Ultrasonic to Arduino */}
          <path d="M 400 90 L 400 180" stroke="#a78bfa" strokeWidth="2" fill="none" />
          <text x="410" y="130" fill="#a78bfa" fontSize="8">TRIG/ECHO</text>

          {/* L298N Motor Driver - Right */}
          <g transform="translate(560, 140)">
            <rect x="0" y="0" width="140" height="100" rx="6" fill="#b91c1c" stroke="#f87171" strokeWidth="2" />
            <text x="70" y="22" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">L298N</text>
            <text x="70" y="37" textAnchor="middle" fill="#fca5a5" fontSize="9">Motor Driver</text>
            
            {/* Heat sink visual */}
            <rect x="45" y="45" width="50" height="20" rx="2" fill="#1e1e1e" />
            {[...Array(5)].map((_, i) => (
              <rect key={i} x={50 + i * 8} y="45" width="3" height="20" fill="#334155" />
            ))}
            
            {/* Motor outputs */}
            <circle cx="25" cy="85" r="6" fill="#fbbf24" />
            <text x="25" y="75" textAnchor="middle" fill="#fbbf24" fontSize="7">M1</text>
            <circle cx="115" cy="85" r="6" fill="#fbbf24" />
            <text x="115" y="75" textAnchor="middle" fill="#fbbf24" fontSize="7">M2</text>
          </g>

          {/* Connection: Arduino to L298N */}
          <path d="M 480 230 L 560 200" stroke="#f87171" strokeWidth="2" fill="none" />
          <path d="M 480 240 L 560 210" stroke="#f87171" strokeWidth="2" fill="none" />
          <text x="510" y="210" fill="#f87171" fontSize="8">IN1-IN4</text>

          {/* DC Motors - Far Right */}
          <g transform="translate(620, 280)">
            <rect x="0" y="0" width="80" height="50" rx="25" fill="#374151" stroke="#9ca3af" strokeWidth="2" />
            <text x="40" y="22" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">MOTOR</text>
            <text x="40" y="36" textAnchor="middle" fill="#9ca3af" fontSize="8">Left</text>
            <circle cx="10" cy="25" r="8" fill="#1e1e1e" stroke="#6b7280" strokeWidth="2" />
          </g>
          <g transform="translate(620, 350)">
            <rect x="0" y="0" width="80" height="50" rx="25" fill="#374151" stroke="#9ca3af" strokeWidth="2" />
            <text x="40" y="22" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">MOTOR</text>
            <text x="40" y="36" textAnchor="middle" fill="#9ca3af" fontSize="8">Right</text>
            <circle cx="10" cy="25" r="8" fill="#1e1e1e" stroke="#6b7280" strokeWidth="2" />
          </g>

          {/* Connection: L298N to Motors */}
          <path d="M 585 235 L 620 305" stroke="#fbbf24" strokeWidth="2" fill="none" />
          <path d="M 655 235 L 660 350" stroke="#fbbf24" strokeWidth="2" fill="none" />

          {/* HC-05 Bluetooth - Bottom Left */}
          <g transform="translate(40, 320)">
            <rect x="0" y="0" width="110" height="70" rx="6" fill="#0284c7" stroke="#38bdf8" strokeWidth="2" />
            <text x="55" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">HC-05</text>
            <text x="55" y="35" textAnchor="middle" fill="#bae6fd" fontSize="9">Bluetooth</text>
            
            {/* Bluetooth symbol */}
            <g transform="translate(40, 45)">
              <path d="M 7 0 L 7 20 L 14 13 L 0 3 L 7 10 L 14 3 L 0 13 L 7 20" stroke="#38bdf8" strokeWidth="2" fill="none" />
            </g>
            
            {/* Status LED */}
            <circle cx="90" cy="55" r="5" fill="#ef4444">
              <animate attributeName="opacity" values="1;0.3;1" dur="1s" repeatCount="indefinite" />
            </circle>
          </g>

          {/* Connection: Bluetooth to Arduino */}
          <path d="M 150 355 Q 250 355 320 280" stroke="#38bdf8" strokeWidth="2" fill="none" strokeDasharray="5,3" />
          <text x="230" y="330" fill="#38bdf8" fontSize="8">TX/RX</text>

          {/* Power Supply - Bottom Center */}
          <g transform="translate(280, 400)">
            <rect x="0" y="0" width="140" height="60" rx="6" fill="#854d0e" stroke="#fbbf24" strokeWidth="2" />
            <text x="70" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold">BATTERY</text>
            <text x="70" y="38" textAnchor="middle" fill="#fcd34d" fontSize="10">7.4V LiPo</text>
            
            {/* Battery indicator */}
            <rect x="95" y="45" width="30" height="12" rx="2" fill="#18181b" stroke="#22c55e" strokeWidth="1" />
            <rect x="97" y="47" width="20" height="8" rx="1" fill="#22c55e" />
            <rect x="125" y="48" width="3" height="6" fill="#22c55e" />
          </g>

          {/* Power connections */}
          <path d="M 350 400 L 350 300" stroke="#ef4444" strokeWidth="3" fill="none" />
          <path d="M 350 400 L 560 240" stroke="#ef4444" strokeWidth="2" fill="none" />
          <text x="360" y="350" fill="#ef4444" fontSize="8">+7.4V</text>

          {/* Ground connections */}
          <path d="M 390 400 L 390 300" stroke="#1e1e1e" strokeWidth="3" fill="none" strokeDasharray="8,4" />
          
          {/* Legend */}
          <g transform="translate(560, 420)">
            <rect x="0" y="0" width="200" height="70" rx="6" fill="rgba(30,41,59,0.8)" />
            <text x="100" y="18" textAnchor="middle" fill="#fff" fontSize="10" fontWeight="bold">CONNECTION LEGEND</text>
            
            <line x1="15" y1="35" x2="45" y2="35" stroke="#ef4444" strokeWidth="2" />
            <text x="55" y="38" fill="#94a3b8" fontSize="9">Power (+)</text>
            
            <line x1="110" y1="35" x2="140" y2="35" stroke="#1e1e1e" strokeWidth="2" strokeDasharray="4,2" />
            <text x="150" y="38" fill="#94a3b8" fontSize="9">Ground</text>
            
            <line x1="15" y1="55" x2="45" y2="55" stroke="#fbbf24" strokeWidth="2" />
            <text x="55" y="58" fill="#94a3b8" fontSize="9">Signal</text>
            
            <line x1="110" y1="55" x2="140" y2="55" stroke="#22c55e" strokeWidth="2" strokeDasharray="5,3" />
            <text x="150" y="58" fill="#94a3b8" fontSize="9">Data</text>
          </g>

          {/* Title */}
          <text x="400" y="485" textAnchor="middle" fill="#64748b" fontSize="10">
            Line Follower Robot - Complete Circuit Schematic
          </text>
        </svg>
      </div>

      {/* Component list */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-3 gap-3">
        {[
          { name: 'Arduino Uno', desc: 'Microcontroller', color: 'bg-blue-500' },
          { name: 'IR Sensors x2', desc: 'Line Detection', color: 'bg-emerald-500' },
          { name: 'HC-SR04', desc: 'Ultrasonic', color: 'bg-violet-500' },
          { name: 'L298N', desc: 'Motor Driver', color: 'bg-red-500' },
          { name: 'HC-05', desc: 'Bluetooth', color: 'bg-cyan-500' },
          { name: 'DC Motors x2', desc: 'Locomotion', color: 'bg-gray-500' },
        ].map((component, idx) => (
          <div key={idx} className="flex items-center gap-2 bg-slate-800/50 p-2 rounded-lg">
            <div className={`w-3 h-3 rounded-full ${component.color}`} />
            <div>
              <div className="text-xs font-bold text-white">{component.name}</div>
              <div className="text-[10px] text-slate-400">{component.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default LineFollowerCircuit;
