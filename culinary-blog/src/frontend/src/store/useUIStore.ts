import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type RecipeViewMode = 'grid' | 'list';

interface UIState {
  recipesViewMode: RecipeViewMode;
  isFilterDrawerOpen: boolean;
  isSidebarOpen: boolean;
  setRecipesViewMode: (mode: RecipeViewMode) => void;
  toggleRecipesViewMode: () => void;
  setFilterDrawerOpen: (isOpen: boolean) => void;
  toggleFilterDrawer: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
  toggleSidebar: () => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      recipesViewMode: 'grid',
      isFilterDrawerOpen: false,
      isSidebarOpen: false,
      setRecipesViewMode: (mode) => set({ recipesViewMode: mode }),
      toggleRecipesViewMode: () =>
        set((state) => ({
          recipesViewMode: state.recipesViewMode === 'grid' ? 'list' : 'grid',
        })),
      setFilterDrawerOpen: (isOpen) => set({ isFilterDrawerOpen: isOpen }),
      toggleFilterDrawer: () =>
        set((state) => ({ isFilterDrawerOpen: !state.isFilterDrawerOpen })),
      setSidebarOpen: (isOpen) => set({ isSidebarOpen: isOpen }),
      toggleSidebar: () =>
        set((state) => ({ isSidebarOpen: !state.isSidebarOpen })),
    }),
    {
      name: 'culinary-ui-store',
      partialize: (state) => ({ recipesViewMode: state.recipesViewMode }),
    }
  )
);
