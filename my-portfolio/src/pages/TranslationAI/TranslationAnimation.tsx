import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getFadeInUp } from '../../design/motion';
import { useViewMode } from '../../context/viewModeHooks';

interface TranslationState {
  status: 'idle' | 'tokenizing' | 'encoding' | 'attention' | 'decoding' | 'completed';
  inputText: string;
  outputText: string;
  tokens: string[];
  progress: number;
  activeLayer: number; // 0-11
}

const EXAMPLES = [
  { original: "شكون يضرب الجرس؟", translated: "Who is ringing the bell?", tokens: ["شكون", "يضرب", "الجرس", "؟"] },
  { original: "الطقس سخون برشا اليوم", translated: "The weather is very hot today", tokens: ["الطقس", "سخون", "برشا", "اليوم"] },
  { original: "نحب ناكل كسكسي", translated: "I want to eat Couscous", tokens: ["نحب", "ناكل", "كسكسي"] }
];

const TranslationAnimation: React.FC = () => {
  const { mode } = useViewMode();
  const fadeInUp = getFadeInUp(mode);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const animateFnRef = useRef<() => void>(() => {});
  
  const [state, setState] = useState<TranslationState>({
    status: 'idle',
    inputText: EXAMPLES[0].original,
    outputText: '',
    tokens: [],
    progress: 0,
    activeLayer: -1,
  });

  const timeRef = useRef(0);
  const particlesRef = useRef<Array<{x: number, y: number, vx: number, vy: number, life: number, color: string}>>([]);

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
    ctx.fillStyle = mode === 'terminal' ? '#0a0a0a' : '#0f172a';
    ctx.fillRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // --- Neural Network Visuals ---
    
    // Encoder (Left) & Decoder (Right) columns
    const layerCount = 6; // Simplified from 12 for visual clarity
    const nodeSpacing = 30;
    const colSpacing = 120;
    const encoderX = centerX - colSpacing;
    const decoderX = centerX + colSpacing;
    const layerStartY = centerY - (layerCount * nodeSpacing) / 2;

    // Draw connecting lines between encoder layers
    ctx.lineWidth = 2;
    for (let i = 0; i < layerCount - 1; i++) {
        ctx.strokeStyle = '#334155';
        ctx.beginPath();
        ctx.moveTo(encoderX, layerStartY + i * nodeSpacing);
        ctx.lineTo(encoderX, layerStartY + (i + 1) * nodeSpacing);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(decoderX, layerStartY + i * nodeSpacing);
        ctx.lineTo(decoderX, layerStartY + (i + 1) * nodeSpacing);
        ctx.stroke();
    }

    // Encoder Nodes
    for (let i = 0; i < layerCount; i++) {
        const y = layerStartY + i * nodeSpacing;
        
        // Active visual
        let isActive = false;
        if (state.status === 'encoding') {
             // Sweep animation up
             const sweepY = layerStartY + layerCount * nodeSpacing - (state.progress * layerCount * nodeSpacing);
             if (Math.abs(y - sweepY) < 40) isActive = true;
        }

        ctx.fillStyle = isActive ? '#3b82f6' : '#1e3a8a';
        ctx.shadowBlur = isActive ? 15 : 0;
        ctx.shadowColor = '#3b82f6';
        
        ctx.beginPath();
        ctx.arc(encoderX, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // Decoder Nodes
    for (let i = 0; i < layerCount; i++) {
        const y = layerStartY + i * nodeSpacing;
        
        let isActive = false;
        if (state.status === 'decoding') {
             // Sweep animation down
             const sweepY = layerStartY + (state.progress * layerCount * nodeSpacing);
             if (Math.abs(y - sweepY) < 40) isActive = true;
        }

        ctx.fillStyle = isActive ? '#10b981' : '#064e3b';
        ctx.shadowBlur = isActive ? 15 : 0;
        ctx.shadowColor = '#10b981';
        
        ctx.beginPath();
        ctx.arc(decoderX, y, 8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
    }

    // Attention Mechanism (Lines between Encoder and Decoder)
    if (state.status === 'attention' || state.status === 'decoding') {
        const alpha = state.status === 'attention' ? (Math.sin(timeRef.current * 5) * 0.5 + 0.5) : 0.2;
        
        for (let i = 0; i < layerCount; i++) {
            for (let j = 0; j < layerCount; j++) {
                // Randomly highlight some connections
                if ((i + j + Math.floor(timeRef.current)) % 5 === 0) {
                     ctx.strokeStyle = `rgba(245, 158, 11, ${alpha})`; // Amber
                     ctx.lineWidth = 1;
                     ctx.beginPath();
                     ctx.moveTo(encoderX, layerStartY + i * nodeSpacing);
                     ctx.lineTo(decoderX, layerStartY + j * nodeSpacing);
                     ctx.stroke();
                }
            }
        }
    }


    // --- Data FLow Animation ---

    // Input Tokens (Left side)
    const inputX = 60;
    if (state.status !== 'idle') {
        state.tokens.forEach((token, idx) => {
            const tokenY = centerY - (state.tokens.length * 40)/2 + idx * 40;
            
            // Draw token box
            ctx.fillStyle = '#1e293b';
            ctx.strokeStyle = '#3b82f6';
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.roundRect(inputX, tokenY, 80, 30, 5);
            ctx.fill();
            ctx.stroke();

            // Text
            ctx.fillStyle = '#fff';
            ctx.font = '12px "Traditional Arabic", sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(token, inputX + 40, tokenY + 20);

            // Particles moving to Encoder
            if (state.status === 'tokenizing' || state.status === 'encoding') {
                if (Math.random() < 0.1) {
                    particlesRef.current.push({
                        x: inputX + 80,
                        y: tokenY + 15,
                        vx: 2 + Math.random(),
                        vy: (centerY - (tokenY + 15)) * 0.01 + (Math.random()-0.5),
                        life: 1,
                        color: '#60a5fa'
                    });
                }
            }
        });
    }

    // Output Tokens (Right side)
    const outputX = width - 140;
    if (state.status === 'decoding' || state.status === 'completed') {
        // Just show a representation of building output

        
        // Draw Output Box
        ctx.fillStyle = '#1e293b';
        ctx.strokeStyle = '#10b981';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.roundRect(outputX, centerY - 20, 120, 40, 5);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = '#10b981';
        ctx.font = 'bold 12px Inter, sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText('Translation', outputX + 60, centerY - 25);
        
        ctx.fillStyle = '#fff';
        ctx.font = '14px Inter, sans-serif';
        // Simple truncating for animation effect
        const textToShow = state.status === 'decoding' 
             ? state.outputText.substring(0, Math.floor(state.progress * state.outputText.length))
             : state.outputText;
        
        ctx.fillText(textToShow, outputX + 60, centerY + 5);

        // Particles from Decoder
        if (state.status === 'decoding') {
             if (Math.random() < 0.2) {
                particlesRef.current.push({
                    x: decoderX + 10,
                    y: layerStartY + Math.random() * (layerCount * nodeSpacing),
                    vx: 2 + Math.random(),
                    vy: (centerY - (layerStartY + Math.random() * (layerCount * nodeSpacing))) * 0.01,
                    life: 1,
                    color: '#10b981'
                });
            }
        }
    }

    // --- Labels ---
    ctx.fillStyle = '#94a3b8';
    ctx.font = 'bold 10px Inter, sans-serif';
    ctx.textAlign = 'center';
    
    ctx.fillText('ENCODER (mBART-50)', encoderX, layerStartY - 20);
    ctx.fillText('DECODER', decoderX, layerStartY - 20);
    
    if (state.status === 'attention') {
        ctx.fillStyle = '#f59e0b';
        ctx.fillText('CROSS-ATTENTION', centerX, centerY - 80);
    }

    // --- Particles Update ---
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
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
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
      canvas.height = 300;
    }

    animationRef.current = requestAnimationFrame(() => animateFnRef.current());

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  const runTranslation = (exampleIndex: number) => {
    const example = EXAMPLES[exampleIndex];
    setState(s => ({
        ...s, 
        status: 'tokenizing', 
        inputText: example.original,
        outputText: example.translated,
        tokens: example.tokens,
        progress: 0
    }));

    // Animation Sequence
    // 1. Tokenizing
    setTimeout(() => {
        setState(s => ({ ...s, status: 'encoding' }));
        
        let p = 0;
        const encInterval = setInterval(() => {
            p += 0.02;
            setState(s => ({ ...s, progress: p }));
            if (p >= 1) {
                clearInterval(encInterval);
                // 2. Attention
                setState(s => ({ ...s, status: 'attention' }));
                setTimeout(() => {
                    // 3. Decoding
                    setState(s => ({ ...s, status: 'decoding', progress: 0 }));
                    let d = 0;
                    const decInterval = setInterval(() => {
                        d += 0.01;
                        setState(s => ({ ...s, progress: d }));
                        if (d >= 1) {
                            clearInterval(decInterval);
                            setState(s => ({ ...s, status: 'completed' }));
                        }
                    }, 20);
                }, 1000);
            }
        }, 16);
    }, 1000);
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
        <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
          Interactive Demo
        </span>
        <h3 className="text-xl font-bold text-white mt-2">Neural Machine Translation Process</h3>
      </div>

      <div className="relative">
        <canvas
          ref={canvasRef}
          className="w-full rounded-xl border border-slate-700"
          style={{ maxWidth: '800px', margin: '0 auto', display: 'block' }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-800 p-4 rounded-xl">
              <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Input (Tunisian Arabic)</label>
              <div className="text-right text-lg text-white font-arabic" dir="rtl">
                  {state.inputText}
              </div>
          </div>
          <div className="bg-slate-800 p-4 rounded-xl">
              <label className="text-xs text-slate-400 uppercase font-bold mb-2 block">Output (English)</label>
              <div className="text-left text-lg text-emerald-400 h-7">
                  {state.status === 'completed' || state.status === 'decoding' ? 
                     (state.status === 'decoding' 
                       ? state.outputText.substring(0, Math.floor(state.progress * state.outputText.length)) 
                       : state.outputText) 
                     : <span className="text-slate-600 italic">Translation pending...</span>}
              </div>
          </div>
      </div>

      <div className="flex flex-wrap justify-center gap-3 mt-6">
        {EXAMPLES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => runTranslation(idx)}
              disabled={state.status !== 'idle' && state.status !== 'completed'}
              className="px-4 py-2 rounded-xl font-bold text-sm border border-slate-700
                bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white
                transition-all duration-300 hover:border-blue-500
                disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Example {idx + 1}
            </button>
        ))}
      </div>

      <div className="mt-4 text-center text-sm text-slate-500">
        Visualizing the mBART-50 Transformer Architecture: Encoder &rarr; Cross-Attention &rarr; Decoder
      </div>
    </motion.div>
  );
};

export default TranslationAnimation;
