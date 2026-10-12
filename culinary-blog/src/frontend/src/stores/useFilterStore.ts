import { create } from 'zustand';
import { RecipeSearchParams } from '@/types/recipe.dto';

interface FilterState extends RecipeSearchParams {
  setKeyword: (keyword: string) => void;
  setCategoryId: (categoryId: string) => void;
  setDifficulty: (difficulty: string) => void;
  setSort: (sort: string) => void;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  resetFilters: () => void;
}

const initialFilterState: RecipeSearchParams = {
  keyword: '',
  categoryId: 'all',
  difficulty: 'all',
  sort: '-createdAt',
  page: 1,
  pageSize: 9,
};

export const useFilterStore = create<FilterState>((set) => ({
  ...initialFilterState,
  setKeyword: (keyword) => set({ keyword, page: 1 }),
  setCategoryId: (categoryId) => set({ categoryId, page: 1 }),
  setDifficulty: (difficulty) => set({ difficulty, page: 1 }),
  setSort: (sort) => set({ sort, page: 1 }),
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize, page: 1 }),
  resetFilters: () => set(initialFilterState),
}));
