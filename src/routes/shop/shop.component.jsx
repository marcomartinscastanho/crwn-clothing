import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
// you cannot use a Route component unless its immediate parent is a Route sub-component
import { CategoriesPreview } from "../categories-preview/categories-preview.component";
import { Category } from "../category/category.component";
import { fetchCategoriesAsync } from "../../store/categories/category.action";
import "./shop.styles.scss";

export const Shop = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // here we fetch the categories and set them into the reducer
    // this is the perferct oportunity to use a thunk
    dispatch(fetchCategoriesAsync());
  }, [dispatch]);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
