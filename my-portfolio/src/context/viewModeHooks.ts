import { createContext, useContext } from 'react';

export type ViewMode = 'arcade' | 'terminal';

export interface ViewModeContextType {
  mode: ViewMode;
  setMode: (mode: ViewMode) => void;
  isArcade: boolean;
  isTerminal: boolean;
}

export const ViewModeContext = createContext<ViewModeContextType | undefined>(undefined);

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === undefined) {
    throw new Error('useViewMode must be used within a ViewModeProvider');
  }
  return context;
};
