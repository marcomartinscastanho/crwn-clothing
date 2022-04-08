import { Routes, Route } from "react-router-dom";
// you cannot use a Route component unless its immediate parent is a Route sub-component
import { CategoriesPreview } from "../categories-preview/categories-preview.component";
import { Category } from "../category/category.component";

import "./shop.styles.scss";

export const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
