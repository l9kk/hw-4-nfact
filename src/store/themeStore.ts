import { create } from 'zustand';
import { persist, devtools } from 'zustand/middleware';
import type { Theme } from '../types';

interface ThemeStore {
    theme: Theme;
    toggleTheme: () => void;
}

export const useThemeStore = create<ThemeStore>()(
    devtools(
        persist(
            (set) => ({
                theme: 'light',

                toggleTheme: () => {
                    set((state) => ({
                        theme: state.theme === 'light' ? 'dark' : 'light'
                    }), false, 'toggleTheme');
                }
            }),
            {
                name: 'theme-storage'
            }
        ),
        { name: 'theme-store' }
    )
);
