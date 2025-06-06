import React from 'react';
import { useFeedbackStore } from '../store/feedbackStore';

const WeeklyStats: React.FC = () => {
  const feedbacks = useFeedbackStore((state) => state.feedbacks);

  // Calculate one week ago
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

  // Filter feedbacks from the last week
  const weeklyFeedbacks = feedbacks.filter(feedback => 
    new Date(feedback.createdAt) >= oneWeekAgo
  );

  const weeklyCount = weeklyFeedbacks.length;
  const weeklyLikes = weeklyFeedbacks.reduce((sum, feedback) => sum + feedback.likes, 0);
  const weeklyDislikes = weeklyFeedbacks.reduce((sum, feedback) => sum + feedback.dislikes, 0);

  return (
    <div className="weekly-stats">
      <h3>This Week's Activity</h3>
      <div className="stats-grid">
        <div className="stat-item">
          <span className="stat-number">{weeklyCount}</span>
          <span className="stat-label">New Feedback</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{weeklyLikes}</span>
          <span className="stat-label">Likes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{weeklyDislikes}</span>
          <span className="stat-label">Dislikes</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{weeklyLikes + weeklyDislikes}</span>
          <span className="stat-label">Total Votes</span>
        </div>
      </div>
    </div>
  );
};

export default WeeklyStats;
