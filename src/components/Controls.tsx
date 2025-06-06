import React from 'react';
import { useFeedbackStore } from '../store/feedbackStore';
import type { FilterType, SortType } from '../types';

const Controls: React.FC = () => {
  const { filter, sortBy, setFilter, setSort } = useFeedbackStore();

  const handleFilterChange = (newFilter: FilterType) => {
    setFilter(newFilter);
  };

  const handleSortChange = (newSortBy: SortType) => {
    setSort(newSortBy);
  };

  return (
    <div className="controls">
      <div className="control-group">
        <label htmlFor="filter-select">Filter:</label>
        <select
          id="filter-select"
          value={filter}
          onChange={(e) => handleFilterChange(e.target.value as FilterType)}
        >
          <option value="all">All Feedback</option>
          <option value="most-liked">Most Liked</option>
          <option value="least-liked">Least Liked</option>
        </select>
      </div>

      <div className="control-group">
        <label htmlFor="sort-select">Sort by:</label>
        <select
          id="sort-select"
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value as SortType)}
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="most-popular">Most Popular</option>
          <option value="least-popular">Least Popular</option>
        </select>
      </div>
    </div>
  );
};

export default Controls;
