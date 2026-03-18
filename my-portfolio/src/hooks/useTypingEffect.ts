import { useState, useEffect, useRef } from 'react';

interface TypingOptions {
  typeSpeed?: number;
  pauseDuration?: number; 
  onCharType?: () => void;
  onComplete?: () => void;
}

export const useTypingEffect = (
  textLines: string[], 
  options: TypingOptions = {},
  isReducedMotion: boolean = false
) => {
  const [displayedContent, setDisplayedContent] = useState<string[]>([]);
  const [isDone, setIsDone] = useState(false);

  const { typeSpeed = 50, pauseDuration = 500, onCharType, onComplete } = options;

  const onCharTypeRef = useRef(onCharType);
  const onCompleteRef = useRef(onComplete);

  // Update refs
  useEffect(() => {
    onCharTypeRef.current = onCharType;
    onCompleteRef.current = onComplete;
  }, [onCharType, onComplete]);

  // Main Effect: Resets and runs the typing loop whenever textLines changes
  useEffect(() => {
    // 1. Immediate Reset / Reduced Motion Check
    if (textLines.length === 0) {
      setDisplayedContent([]);
      setIsDone(false);
      return;
    }

    if (isReducedMotion) {
      setDisplayedContent(textLines);
      setIsDone(true);
      // Defer callback to avoid render-cycle issues
      const timer = setTimeout(() => {
        onCompleteRef.current?.();
      }, 0);
      return () => clearTimeout(timer);
    }

    // 2. Initialize Typing State
    setDisplayedContent(['']);
    setIsDone(false);

    let lineIndex = 0;
    let charIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeLoop = () => {
      // Safety check
      if (lineIndex >= textLines.length) {
        setIsDone(true);
        onCompleteRef.current?.();
        return;
      }

      const currentLine = textLines[lineIndex];

      // Check if finished current line
      if (charIndex >= currentLine.length) {
        // Prepare for next line
        if (lineIndex < textLines.length - 1) {
          lineIndex++;
          charIndex = 0;
          setDisplayedContent(prev => [...prev, '']); 
          timeoutId = setTimeout(typeLoop, pauseDuration);
        } else {
          // All done
          setIsDone(true);
          onCompleteRef.current?.();
        }
        return;
      }

      // Type next char
      charIndex++;
      
      // Update state
      setDisplayedContent(prev => {
        const newContent = [...prev];
        if (newContent.length <= lineIndex) newContent.push('');
        newContent[lineIndex] = currentLine.slice(0, charIndex);
        return newContent;
      });

      onCharTypeRef.current?.();
      timeoutId = setTimeout(typeLoop, typeSpeed);
    };

    // Start loop
    timeoutId = setTimeout(typeLoop, 50);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [textLines, isReducedMotion, typeSpeed, pauseDuration]);

  return {
    displayedContent,
    isDone
  };
};
