import React, { useState, useEffect } from 'react';
import { useFeedbackStore } from '../store/feedbackStore';
import type { ExtendedFeedback } from '../types';

interface FeedbackModalProps {
  feedback: ExtendedFeedback;
  isOpen: boolean;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({ feedback, isOpen, onClose }) => {
  const [text, setText] = useState(feedback.text);
  const [category, setCategory] = useState<'UI' | 'Performance' | 'Feature' | ''>(feedback.category || '');
  
  const editFeedback = useFeedbackStore((state) => state.editFeedback);

  // Reset form when feedback changes
  useEffect(() => {
    setText(feedback.text);
    setCategory(feedback.category || '');
  }, [feedback]);

  const handleSave = () => {
    if (text.trim()) {
      editFeedback(feedback.id, text.trim(), category || undefined);
      onClose();
    }
  };

  const handleCancel = () => {
    setText(feedback.text);
    setCategory(feedback.category || '');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Edit Feedback</h3>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="form-group">
            <label htmlFor="edit-feedback-text">Feedback Text:</label>
            <textarea
              id="edit-feedback-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              rows={4}
              placeholder="Update your feedback..."
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="edit-category-select">Category:</label>
            <select
              id="edit-category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value as 'UI' | 'Performance' | 'Feature' | '')}
            >
              <option value="">No category</option>
              <option value="UI">UI/Design</option>
              <option value="Performance">Performance</option>
              <option value="Feature">New Feature</option>
            </select>
          </div>
        </div>
        
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={handleCancel}>
            Cancel
          </button>
          <button className="btn btn-primary" onClick={handleSave}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
