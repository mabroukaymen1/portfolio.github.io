import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

type DemoMode = 'line' | 'obstacle' | 'combined';

interface RobotState {
  x: number;
  y: number;
  angle: number;
  leftSensor: boolean;
  rightSensor: boolean;
  obstacleDetected: boolean;
  avoidingObstacle: boolean;
}

const LineFollowerRobotAnimation: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animateFnRef = useRef<() => void>(() => {});
  const [demoMode, setDemoMode] = useState<DemoMode>('combined');
  
  const robotRef = useRef<RobotState>({
    x: 100,
    y: 200,
    angle: 0,
    leftSensor: false,
    rightSensor: false,
    obstacleDetected: false,
    avoidingObstacle: false,
  });

  const pathRef = useRef<{ x: number; y: number }[]>([]);
  const obstacleRef = useRef<{ x: number; y: number; radius: number } | null>(null);
  const timeRef = useRef(0);


  // Generate the line path
  const generatePath = useCallback((width: number, height: number) => {
    const points: { x: number; y: number }[] = [];
    const centerY = height / 2;
    const amplitude = 80;
    
    for (let x = 50; x < width - 50; x += 5) {
      const y = centerY + Math.sin((x / width) * Math.PI * 3) * amplitude;
      points.push({ x, y });
    }
    return points;
  }, []);

  // Check if a point is on the black line
  const isOnLine = useCallback((x: number, y: number, path: { x: number; y: number }[]) => {
    const lineWidth = 20;
    for (const point of path) {
      const dist = Math.sqrt((x - point.x) ** 2 + (y - point.y) ** 2);
      if (dist < lineWidth / 2) return true;
    }
    return false;
  }, []);

  // Main animation loop
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const robot = robotRef.current;
    const path = pathRef.current;
    const obstacle = obstacleRef.current;

    timeRef.current += 0.016; // ~60fps

    // Clear canvas
    ctx.fillStyle = mode === 'terminal' ? '#0a0a0a' : '#1e293b';
    ctx.fillRect(0, 0, width, height);

    // Draw grid pattern
    ctx.strokeStyle = mode === 'terminal' ? '#1a1a1a' : '#334155';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // Draw the black line path
    if (demoMode === 'line' || demoMode === 'combined') {
      ctx.beginPath();
      ctx.strokeStyle = '#18181b';
      ctx.lineWidth = 20;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      
      if (path.length > 0) {
        ctx.moveTo(path[0].x, path[0].y);
        for (let i = 1; i < path.length; i++) {
          ctx.lineTo(path[i].x, path[i].y);
        }
      }
      ctx.stroke();
    }

    // Draw obstacle
    if ((demoMode === 'obstacle' || demoMode === 'combined') && obstacle) {
      // Obstacle box
      ctx.fillStyle = '#dc2626';
      ctx.beginPath();
      ctx.arc(obstacle.x, obstacle.y, obstacle.radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Warning stripes
      ctx.strokeStyle = '#fbbf24';
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.arc(obstacle.x, obstacle.y, obstacle.radius + 5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      
      // Obstacle label
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 12px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('OBSTACLE', obstacle.x, obstacle.y + 4);
    }

    // Calculate sensor positions
    const sensorDistance = 25;
    const leftSensorX = robot.x + Math.cos(robot.angle - 0.3) * sensorDistance;
    const leftSensorY = robot.y + Math.sin(robot.angle - 0.3) * sensorDistance;
    const rightSensorX = robot.x + Math.cos(robot.angle + 0.3) * sensorDistance;
    const rightSensorY = robot.y + Math.sin(robot.angle + 0.3) * sensorDistance;

    // Check sensors
    robot.leftSensor = isOnLine(leftSensorX, leftSensorY, path);
    robot.rightSensor = isOnLine(rightSensorX, rightSensorY, path);

    // Check for obstacle
    if (obstacle && (demoMode === 'obstacle' || demoMode === 'combined')) {
      const distToObstacle = Math.sqrt((robot.x - obstacle.x) ** 2 + (robot.y - obstacle.y) ** 2);
      const ultrasonicRange = 80;
      
      // Check if obstacle is in front of robot
      const toObstacleAngle = Math.atan2(obstacle.y - robot.y, obstacle.x - robot.x);
      const angleDiff = Math.abs(toObstacleAngle - robot.angle);
      robot.obstacleDetected = distToObstacle < ultrasonicRange && angleDiff < Math.PI / 3;
    } else {
      robot.obstacleDetected = false;
    }

    // Robot movement logic
    const speed = 2;
    const turnSpeed = 0.03;

    if (robot.obstacleDetected && !robot.avoidingObstacle) {
      robot.avoidingObstacle = true;
    }

    if (robot.avoidingObstacle) {
      // Obstacle avoidance: turn right and go around
      robot.angle += 0.05;
      robot.x += Math.cos(robot.angle) * speed * 0.5;
      robot.y += Math.sin(robot.angle) * speed * 0.5;
      
      // Check if we've passed the obstacle
      if (obstacle) {
        const distToObstacle = Math.sqrt((robot.x - obstacle.x) ** 2 + (robot.y - obstacle.y) ** 2);
        if (distToObstacle > 100) {
          robot.avoidingObstacle = false;
        }
      }
    } else if (demoMode === 'line' || demoMode === 'combined') {
      // Line following logic
      if (robot.leftSensor && robot.rightSensor) {
        // Both sensors on line - go straight
        robot.x += Math.cos(robot.angle) * speed;
        robot.y += Math.sin(robot.angle) * speed;
      } else if (robot.leftSensor && !robot.rightSensor) {
        // Left sensor on line - turn left
        robot.angle -= turnSpeed;
        robot.x += Math.cos(robot.angle) * speed * 0.8;
        robot.y += Math.sin(robot.angle) * speed * 0.8;
      } else if (!robot.leftSensor && robot.rightSensor) {
        // Right sensor on line - turn right
        robot.angle += turnSpeed;
        robot.x += Math.cos(robot.angle) * speed * 0.8;
        robot.y += Math.sin(robot.angle) * speed * 0.8;
      } else {
        // No sensors on line - search for line
        robot.angle += Math.sin(timeRef.current * 2) * 0.02;
        robot.x += Math.cos(robot.angle) * speed * 0.5;
        robot.y += Math.sin(robot.angle) * speed * 0.5;
      }
    } else {
      // Free roaming for obstacle-only mode
      robot.x += Math.cos(robot.angle) * speed;
      robot.y += Math.sin(robot.angle) * speed;
      robot.angle += Math.sin(timeRef.current) * 0.01;
    }

    // Wrap around screen
    if (robot.x > width + 30) {
      robot.x = -20;
      robot.y = height / 2 + (Math.random() - 0.5) * 100;
    }
    if (robot.x < -30) robot.x = width + 20;
    if (robot.y > height + 30) robot.y = -20;
    if (robot.y < -30) robot.y = height + 20;

    // Draw ultrasonic sensor cone
    if (demoMode === 'obstacle' || demoMode === 'combined') {
      const coneLength = 80;
      const coneAngle = Math.PI / 6;
      
      ctx.beginPath();
      ctx.moveTo(robot.x, robot.y);
      ctx.lineTo(
        robot.x + Math.cos(robot.angle - coneAngle) * coneLength,
        robot.y + Math.sin(robot.angle - coneAngle) * coneLength
      );
      ctx.lineTo(
        robot.x + Math.cos(robot.angle + coneAngle) * coneLength,
        robot.y + Math.sin(robot.angle + coneAngle) * coneLength
      );
      ctx.closePath();
      ctx.fillStyle = robot.obstacleDetected 
        ? 'rgba(239, 68, 68, 0.3)' 
        : 'rgba(34, 197, 94, 0.15)';
      ctx.fill();
    }

    // Draw robot body
    ctx.save();
    ctx.translate(robot.x, robot.y);
    ctx.rotate(robot.angle);

    // Robot chassis
    ctx.fillStyle = robot.avoidingObstacle ? '#f59e0b' : '#8b5cf6';
    ctx.beginPath();
    ctx.roundRect(-20, -15, 40, 30, 5);
    ctx.fill();

    // Robot front indicator
    ctx.fillStyle = '#22c55e';
    ctx.beginPath();
    ctx.arc(15, 0, 5, 0, Math.PI * 2);
    ctx.fill();

    // Wheels
    ctx.fillStyle = '#1e1e1e';
    ctx.fillRect(-18, -18, 8, 6);
    ctx.fillRect(-18, 12, 8, 6);
    ctx.fillRect(10, -18, 8, 6);
    ctx.fillRect(10, 12, 8, 6);

    ctx.restore();

    // Draw IR sensors
    const drawSensor = (x: number, y: number, active: boolean) => {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = active ? '#22c55e' : '#ef4444';
      ctx.fill();
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = 2;
      ctx.stroke();
      
      // Sensor glow when active
      if (active) {
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(34, 197, 94, 0.3)';
        ctx.fill();
      }
    };

    if (demoMode === 'line' || demoMode === 'combined') {
      drawSensor(leftSensorX, leftSensorY, robot.leftSensor);
      drawSensor(rightSensorX, rightSensorY, robot.rightSensor);
    }

    // Draw status panel
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.beginPath();
    ctx.roundRect(10, 10, 180, 90, 8);
    ctx.fill();

    ctx.fillStyle = '#fff';
    ctx.font = 'bold 12px Inter, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(`Mode: ${demoMode.toUpperCase()}`, 20, 30);
    
    ctx.font = '11px Inter, sans-serif';
    ctx.fillStyle = '#94a3b8';
    ctx.fillText(`Left IR: ${robot.leftSensor ? '● DETECTED' : '○ Clear'}`, 20, 50);
    ctx.fillStyle = robot.leftSensor ? '#22c55e' : '#64748b';
    ctx.fillText(`Left IR: ${robot.leftSensor ? '● DETECTED' : '○ Clear'}`, 20, 50);
    
    ctx.fillStyle = robot.rightSensor ? '#22c55e' : '#64748b';
    ctx.fillText(`Right IR: ${robot.rightSensor ? '● DETECTED' : '○ Clear'}`, 20, 65);
    
    ctx.fillStyle = robot.obstacleDetected ? '#ef4444' : '#64748b';
    ctx.fillText(`Ultrasonic: ${robot.obstacleDetected ? '⚠ OBSTACLE' : '✓ Clear'}`, 20, 80);

    if (robot.avoidingObstacle) {
      ctx.fillStyle = '#f59e0b';
      ctx.fillText('→ Avoiding...', 20, 95);
    }

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());
  }, [mode, demoMode, isOnLine]);

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

    // Generate path
    pathRef.current = generatePath(canvas.width, canvas.height);

    // Place obstacle
    if (demoMode === 'obstacle' || demoMode === 'combined') {
      obstacleRef.current = {
        x: canvas.width * 0.6,
        y: canvas.height / 2 + 30,
        radius: 25,
      };
    } else {
      obstacleRef.current = null;
    }

    // Reset robot position
    robotRef.current = {
      x: 80,
      y: canvas.height / 2,
      angle: 0,
      leftSensor: false,
      rightSensor: false,
      obstacleDetected: false,
      avoidingObstacle: false,
    };

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [demoMode, generatePath]);

  const modes: { id: DemoMode; label: string; icon: string }[] = [
    { id: 'line', label: 'Line Following', icon: 'fa-route' },
    { id: 'obstacle', label: 'Obstacle Avoidance', icon: 'fa-shield-alt' },
    { id: 'combined', label: 'Combined Mode', icon: 'fa-random' },
  ];

  return (
    <motion.div
      variants={fadeInUp}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="rounded-3xl overflow-hidden border-4 border-slate-800 bg-slate-900 p-6"
    >
      <div className="text-center mb-4">
        <span className="text-[10px] font-black uppercase tracking-widest text-violet-500">
          Interactive Demo
        </span>
        <h3 className="text-xl font-bold text-white mt-2">See How It Works</h3>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full rounded-xl border border-slate-700"
          style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
        />
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setDemoMode(m.id)}
            className={`
              px-4 py-2 rounded-xl font-bold text-sm uppercase tracking-wider
              transition-all duration-300 flex items-center gap-2
              ${demoMode === m.id
                ? 'bg-violet-500 text-white shadow-lg shadow-violet-500/30'
                : 'bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white'
              }
            `}
          >
            <i className={`fas ${m.icon}`} />
            {m.label}
          </button>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Watch the robot autonomously navigate using IR sensors and ultrasonic detection
      </div>
    </motion.div>
  );
};

export default LineFollowerRobotAnimation;
