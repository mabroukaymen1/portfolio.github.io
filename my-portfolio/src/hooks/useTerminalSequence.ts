import { useState, useCallback } from 'react';
import { useTerminalSound } from './useTerminalSound';

interface UseTerminalSequenceProps {
  stepCount: number;
  onComplete?: () => void;
}

export const useTerminalSequence = ({ stepCount, onComplete }: UseTerminalSequenceProps) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const { playSuccess } = useTerminalSound();

  const handleNextStep = useCallback(() => {
    setActiveStepIndex(prev => {
      // If we are essentially "done" (at the last step), mark as done
      if (prev >= stepCount - 1) {
        setIsDone(true);
        playSuccess();
        onComplete?.();
        return prev;
      }
      return prev + 1;
    });
  }, [stepCount, playSuccess, onComplete]);

  // Reset if stepCount changes significantly (optional safety)
  // Track previous stepCount to reset state if it changes
  const [prevStepCount, setPrevStepCount] = useState(stepCount);
  if (stepCount !== prevStepCount) {
    setPrevStepCount(stepCount);
    setActiveStepIndex(0);
    setIsDone(false);
  }

  return {
    activeStepIndex,
    isDone,
    handleNextStep,
    // Helper to determine if a step should be visible (typed or completed)
    shouldShowStep: (idx: number) => idx <= activeStepIndex,
    // Helper to determine if a step is arguably "active" (currently typing)
    isStepActive: (idx: number) => idx === activeStepIndex && !isDone,
  };
};
