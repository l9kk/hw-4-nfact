// Base Feedback interface for Level 1
export interface Feedback {
    id: string;
    text: string;
}

// Extended Feedback interface for Level 2 and 3
export interface ExtendedFeedback extends Feedback {
    likes: number;
    dislikes: number;
    createdAt: Date;
    category?: 'UI' | 'Performance' | 'Feature';
}

// Filter and sort types
export type FilterType = 'all' | 'most-liked' | 'least-liked';
export type SortType = 'newest' | 'oldest' | 'most-popular' | 'least-popular';

// Theme types
export type Theme = 'light' | 'dark';
