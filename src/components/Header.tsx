import React from 'react';
import { useFeedbackStore } from '../store/feedbackStore';
import { useThemeStore } from '../store/themeStore';

const Header: React.FC = () => {
  const feedbacks = useFeedbackStore((state) => state.feedbacks);
  const { theme, toggleTheme } = useThemeStore();

  return (
    <header className="app-header">
      <h1>Product Feedback Board</h1>
      <p>Share your ideas and help us improve our product!</p>
      <div className="header-controls">
        <div className="feedback-stats">
          <span className="feedback-count">
            {feedbacks.length} feedback{feedbacks.length !== 1 ? 's' : ''} total
          </span>
        </div>
        <button 
          className="theme-toggle"
          onClick={toggleTheme}
          title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
        >
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </header>
  );
};

export default Header;
