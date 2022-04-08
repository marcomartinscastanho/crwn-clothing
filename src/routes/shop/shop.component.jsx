import { Routes, Route } from "react-router-dom";
// you cannot use a Route component unless its immediate parent is a Route sub-component
import { CategoriesPreview } from "../categories-preview/categories-preview.component";

import "./shop.styles.scss";

export const Shop = () => {
  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
    </Routes>
  );
};

export default Shop;
