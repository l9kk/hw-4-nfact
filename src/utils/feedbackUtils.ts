import type { ExtendedFeedback, FilterType, SortType } from '../types';

export const filterFeedbacks = (feedbacks: ExtendedFeedback[], filter: FilterType): ExtendedFeedback[] => {
    switch (filter) {
        case 'most-liked':
            return feedbacks.filter(feedback => feedback.likes > feedback.dislikes);
        case 'least-liked':
            return feedbacks.filter(feedback => feedback.dislikes > feedback.likes);
        case 'all':
        default:
            return feedbacks;
    }
};

export const sortFeedbacks = (feedbacks: ExtendedFeedback[], sortBy: SortType): ExtendedFeedback[] => {
    const sorted = [...feedbacks];

    switch (sortBy) {
        case 'newest':
            return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        case 'oldest':
            return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        case 'most-popular':
            return sorted.sort((a, b) => (b.likes - b.dislikes) - (a.likes - a.dislikes));
        case 'least-popular':
            return sorted.sort((a, b) => (a.likes - a.dislikes) - (b.likes - b.dislikes));
        default:
            return sorted;
    }
};

export const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    }).format(new Date(date));
};
