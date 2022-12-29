import { createContext } from 'react';

export const isSmallResolution = () => window.innerWidth < 1000;

interface ResolutionContextState {
  useSmallSizes: boolean;
}

export const ResolutionContext = createContext<ResolutionContextState>({
  useSmallSizes: false,
});
