import React, { useEffect } from 'react';
import { ViewModeContext } from './viewModeHooks';
import type { ViewMode } from './viewModeHooks';

export const ViewModeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const mode: ViewMode = 'arcade';

  useEffect(() => {
    // Ensure arcade styling is applied (light/arcade theme)
    document.documentElement.classList.remove('dark');
  }, []);

  const setMode = () => {}; // No-op as mode is fixed

  const isArcade = true;
  const isTerminal = false;

  return (
    <ViewModeContext.Provider value={{ mode, setMode, isArcade, isTerminal }}>
      {children}
    </ViewModeContext.Provider>
  );
};
