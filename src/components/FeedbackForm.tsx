import React, { useState } from 'react';
import { useFeedbackStore } from '../store/feedbackStore';

const FeedbackForm: React.FC = () => {
  const addFeedback = useFeedbackStore((state) => state.addFeedback);
  const [text, setText] = useState('');
  const [category, setCategory] = useState<'UI' | 'Performance' | 'Feature' | ''>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addFeedback(text.trim(), category || undefined);
      setText('');
      setCategory('');
    }
  };

  return (
    <form className="feedback-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="feedback-input">Share your feedback:</label>
        <textarea
          id="feedback-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What would you like to see improved?"
          rows={4}
          required
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="category-select">Category (optional):</label>
        <select
          id="category-select"
          value={category}
          onChange={(e) => setCategory(e.target.value as 'UI' | 'Performance' | 'Feature' | '')}
        >
          <option value="">Select a category...</option>
          <option value="UI">UI/Design</option>
          <option value="Performance">Performance</option>
          <option value="Feature">New Feature</option>
        </select>
      </div>
      
      <button type="submit" className="submit-btn">
        Add Feedback
      </button>
    </form>
  );
};

export default FeedbackForm;
