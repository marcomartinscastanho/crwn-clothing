import { createSelector } from "reselect";
import { RootState } from "../store";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";

// Memorization
// Memorization is the process in which you cache the previous value of something
// so that if the input has not changed, then you just return back the same output

// in order to use this with selectors, we have to create inputSelectors and outputSelectors

const selectCategoryReducer = (state: RootState): CategoriesState => state.categories;

// the output selector runs only if the return of the input selector changes
export const selectCategories = createSelector(
  // the returned values of the input selectors will be the aurguments of the output selectors
  [selectCategoryReducer], // array of input selectors
  (categoriesSlice) => categoriesSlice.categories // output selector
);
// selectCategories caches the categories array

export const selectCategoriesMap = createSelector(
  [selectCategories],
  // this method is only ran when the categories array changes
  (categories): CategoryMap =>
    categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

export const selectCategoriesIsLoading = createSelector(
  [selectCategoryReducer],
  (categoriesSlice) => categoriesSlice.isLoading
);
