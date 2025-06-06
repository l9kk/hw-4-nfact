import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import { feedbackReducer, initialState } from './feedbackReducer';
import type { FeedbackState, FeedbackAction } from './feedbackReducer';

// Context interface
interface FeedbackContextType {
  state: FeedbackState;
  dispatch: React.Dispatch<FeedbackAction>;
}

// Create context
const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);

// Provider component
interface FeedbackProviderProps {
  children: ReactNode;
}

export const FeedbackProvider: React.FC<FeedbackProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(feedbackReducer, initialState);

  return (
    <FeedbackContext.Provider value={{ state, dispatch }}>
      {children}
    </FeedbackContext.Provider>
  );
};

// Custom hook
export const useFeedbackContext = () => {
  const context = useContext(FeedbackContext);
  if (context === undefined) {
    throw new Error('useFeedbackContext must be used within a FeedbackProvider');
  }
  return context;
};
