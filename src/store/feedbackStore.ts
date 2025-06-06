import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { ExtendedFeedback, FilterType, SortType } from '../types';

interface FeedbackStore {
    // State
    feedbacks: ExtendedFeedback[];
    filter: FilterType;
    sortBy: SortType;

    // Actions
    addFeedback: (text: string, category?: 'UI' | 'Performance' | 'Feature') => void;
    deleteFeedback: (id: string) => void;
    upvoteFeedback: (id: string) => void;
    downvoteFeedback: (id: string) => void;
    setFilter: (filter: FilterType) => void;
    setSort: (sortBy: SortType) => void;
    editFeedback: (id: string, newText: string, newCategory?: 'UI' | 'Performance' | 'Feature') => void;
}

export const useFeedbackStore = create<FeedbackStore>()(
    devtools(
        persist(
            (set) => ({
                // Initial state
                feedbacks: [],
                filter: 'all',
                sortBy: 'newest',

                // Actions
                addFeedback: (text, category) => {
                    const newFeedback: ExtendedFeedback = {
                        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
                        text,
                        likes: 0,
                        dislikes: 0,
                        createdAt: new Date(),
                        category
                    };

                    set((state) => ({
                        feedbacks: [newFeedback, ...state.feedbacks]
                    }), false, 'addFeedback');
                },

                deleteFeedback: (id) => {
                    set((state) => ({
                        feedbacks: state.feedbacks.filter(feedback => feedback.id !== id)
                    }), false, 'deleteFeedback');
                },

                upvoteFeedback: (id) => {
                    set((state) => ({
                        feedbacks: state.feedbacks.map(feedback =>
                            feedback.id === id
                                ? { ...feedback, likes: feedback.likes + 1 }
                                : feedback
                        )
                    }), false, 'upvoteFeedback');
                },

                downvoteFeedback: (id) => {
                    set((state) => ({
                        feedbacks: state.feedbacks.map(feedback =>
                            feedback.id === id
                                ? { ...feedback, dislikes: feedback.dislikes + 1 }
                                : feedback
                        )
                    }), false, 'downvoteFeedback');
                },

                setFilter: (filter) => {
                    set({ filter }, false, 'setFilter');
                },

                setSort: (sortBy) => {
                    set({ sortBy }, false, 'setSort');
                },

                editFeedback: (id, newText, newCategory) => {
                    set((state) => ({
                        feedbacks: state.feedbacks.map(feedback =>
                            feedback.id === id
                                ? { ...feedback, text: newText, category: newCategory }
                                : feedback
                        )
                    }), false, 'editFeedback');
                }
            }), {
            name: 'feedback-storage',
            // Custom serializer to handle Date objects
            storage: {
                getItem: (name) => {
                    const str = localStorage.getItem(name);
                    if (!str) return null;
                    const parsed = JSON.parse(str);
                    return {
                        ...parsed,
                        state: {
                            ...parsed.state,
                            feedbacks: parsed.state.feedbacks.map((feedback: any) => ({
                                ...feedback,
                                createdAt: new Date(feedback.createdAt)
                            }))
                        }
                    };
                },
                setItem: (name, value) => {
                    const serialized = JSON.stringify({
                        ...value,
                        state: {
                            ...value.state,
                            feedbacks: value.state.feedbacks.map((feedback: any) => ({
                                ...feedback,
                                createdAt: feedback.createdAt.toISOString()
                            }))
                        }
                    });
                    localStorage.setItem(name, serialized);
                },
                removeItem: (name) => localStorage.removeItem(name),
            }
        }
        ),
        { name: 'feedback-store' }
    )
);
