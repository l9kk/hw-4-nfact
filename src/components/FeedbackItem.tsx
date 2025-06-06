import React, { useState } from 'react';
import type { ExtendedFeedback } from '../types';
import { useFeedbackStore } from '../store/feedbackStore';
import { formatDate } from '../utils/feedbackUtils';
import FeedbackModal from './FeedbackModal';

interface FeedbackItemProps {
  feedback: ExtendedFeedback;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback }) => {
  const { upvoteFeedback, downvoteFeedback, deleteFeedback } = useFeedbackStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUpvote = () => {
    upvoteFeedback(feedback.id);
  };

  const handleDownvote = () => {
    downvoteFeedback(feedback.id);
  };

  const handleDelete = () => {
    deleteFeedback(feedback.id);
  };

  const handleEdit = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="feedback-item">
        <div className="feedback-content">
          <p className="feedback-text">{feedback.text}</p>
          <div className="feedback-meta">
            {feedback.category && (
              <span className={`category-badge category-${feedback.category.toLowerCase()}`}>
                {feedback.category}
              </span>
            )}
            <span className="feedback-date">{formatDate(feedback.createdAt)}</span>
          </div>
        </div>
        <div className="feedback-actions">
          <div className="voting-buttons">
            <button 
              className="vote-btn upvote-btn"
              onClick={handleUpvote}
              title="Like this feedback"
            >
              👍 {feedback.likes}
            </button>
            <button 
              className="vote-btn downvote-btn"
              onClick={handleDownvote}
              title="Dislike this feedback"
            >
              👎 {feedback.dislikes}
            </button>
          </div>
          <div className="action-buttons">
            <button 
              className="edit-btn"
              onClick={handleEdit}
              title="Edit this feedback"
            >
              Edit
            </button>
            <button 
              className="delete-btn"
              onClick={handleDelete}
              title="Delete this feedback"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
      
      <FeedbackModal
        feedback={feedback}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default FeedbackItem;
