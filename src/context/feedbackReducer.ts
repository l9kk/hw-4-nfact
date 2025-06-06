import type { ExtendedFeedback, FilterType, SortType } from '../types';

// State interface
export interface FeedbackState {
    feedbacks: ExtendedFeedback[];
    filter: FilterType;
    sortBy: SortType;
}

// Action types
export type FeedbackAction =
    | { type: 'ADD_FEEDBACK'; payload: { text: string; category?: 'UI' | 'Performance' | 'Feature' } }
    | { type: 'DELETE_FEEDBACK'; payload: { id: string } }
    | { type: 'UPVOTE'; payload: { id: string } }
    | { type: 'DOWNVOTE'; payload: { id: string } }
    | { type: 'SET_FILTER'; payload: { filter: FilterType } }
    | { type: 'SET_SORT'; payload: { sortBy: SortType } };

// Initial state
export const initialState: FeedbackState = {
    feedbacks: [],
    filter: 'all',
    sortBy: 'newest'
};

// Reducer function
export const feedbackReducer = (state: FeedbackState, action: FeedbackAction): FeedbackState => {
    switch (action.type) {
        case 'ADD_FEEDBACK': {
            const newFeedback: ExtendedFeedback = {
                id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                text: action.payload.text,
                likes: 0,
                dislikes: 0,
                createdAt: new Date(),
                category: action.payload.category
            };
            return {
                ...state,
                feedbacks: [newFeedback, ...state.feedbacks]
            };
        }

        case 'DELETE_FEEDBACK':
            return {
                ...state,
                feedbacks: state.feedbacks.filter(feedback => feedback.id !== action.payload.id)
            };

        case 'UPVOTE':
            return {
                ...state,
                feedbacks: state.feedbacks.map(feedback =>
                    feedback.id === action.payload.id
                        ? { ...feedback, likes: feedback.likes + 1 }
                        : feedback
                )
            };

        case 'DOWNVOTE':
            return {
                ...state,
                feedbacks: state.feedbacks.map(feedback =>
                    feedback.id === action.payload.id
                        ? { ...feedback, dislikes: feedback.dislikes + 1 }
                        : feedback
                )
            };

        case 'SET_FILTER':
            return {
                ...state,
                filter: action.payload.filter
            };

        case 'SET_SORT':
            return {
                ...state,
                sortBy: action.payload.sortBy
            };

        default:
            return state;
    }
};
