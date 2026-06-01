import type { RootState } from "../store";

export const selectCategories = (state: RootState) => state.categories.items;

export const selectCategoriesIsLoading = (state: RootState) =>
  state.categories.isLoading;

export const selectCategoriesError = (state: RootState) =>
  state.categories.error;
