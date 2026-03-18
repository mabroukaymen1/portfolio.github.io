import { useCallback, useRef, useEffect } from 'react';

/**
 * Hook to play synthesized terminal sound effects.
 * Uses Web Audio API to generate beeps/clicks without external files.
 */
export const useTerminalSound = () => {
  const audioCtxRef = useRef<AudioContext | null>(null);

  const initAudio = useCallback(() => {
    if (!audioCtxRef.current) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      audioCtxRef.current = new AudioContextClass();
    }
    // Attempt to resume if suspended (browser autoplay policy)
    if (audioCtxRef.current.state === 'suspended') {
      audioCtxRef.current.resume().catch(e => console.warn("Audio resume failed:", e));
    }
  }, []);

  // Try to wake up audio context on first user interaction
  useEffect(() => {
      const wakeUp = () => {
          if (audioCtxRef.current?.state === 'suspended') {
              audioCtxRef.current.resume().catch(() => {});
          }
      };
      window.addEventListener('click', wakeUp);
      window.addEventListener('keydown', wakeUp);
      return () => {
          window.removeEventListener('click', wakeUp);
          window.removeEventListener('keydown', wakeUp);
      };
  }, []);

  const playClick = useCallback(() => {
    try {
        initAudio();
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        // Type of sound: square or sine with high pitch for a "mechanical" feel
        osc.type = 'square';
        osc.frequency.setValueAtTime(800 + Math.random() * 200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.05);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.05);
    } catch {
        // Ignore audio errors to prevent crashing the UI
    }
  }, [initAudio]);

  const playSuccess = useCallback(() => {
    try {
        initAudio();
        if (!audioCtxRef.current || audioCtxRef.current.state === 'suspended') return;

        const ctx = audioCtxRef.current;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(880, ctx.currentTime + 0.2);

        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.2);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 0.2);
    } catch {
        // Ignore errors
    }
  }, [initAudio]);

  return { playClick, playSuccess };
};
