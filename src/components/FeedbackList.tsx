import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useFeedbackStore } from '../store/feedbackStore';
import { filterFeedbacks, sortFeedbacks } from '../utils/feedbackUtils';
import FeedbackItem from './FeedbackItem';

const FeedbackList: React.FC = () => {
  const { feedbacks, filter, sortBy } = useFeedbackStore();

  // Apply filters and sorting
  const filteredFeedbacks = filterFeedbacks(feedbacks, filter);
  const sortedFeedbacks = sortFeedbacks(filteredFeedbacks, sortBy);

  if (sortedFeedbacks.length === 0) {
    return (
      <motion.div 
        className="no-feedback"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p>
          {feedbacks.length === 0 
            ? "No feedback yet. Be the first to add some!" 
            : "No feedback matches the current filter."
          }
        </p>
      </motion.div>
    );
  }

  return (
    <div className="feedback-list">
      <AnimatePresence mode="popLayout">
        {sortedFeedbacks.map((feedback) => (
          <motion.div
            key={feedback.id}
            layout
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -20 }}
            transition={{ 
              duration: 0.3,
              layout: { duration: 0.3 }
            }}
          >
            <FeedbackItem feedback={feedback} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default FeedbackList;
