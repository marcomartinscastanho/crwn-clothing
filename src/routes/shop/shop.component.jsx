import { Fragment, useContext } from "react";
import { CategoriesContext } from "../../contexts/categories.context";
import { CategoryPreview } from "../../components/category-preview/category-preview.component";

import "./shop.styles.scss";

export const Shop = () => {
  const { categoriesMap } = useContext(CategoriesContext);
  return (
    <div className="shop-container">
      {/* <> </> this is the same as Fragment */}

      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];
        return <CategoryPreview key={title} title={title} products={products}></CategoryPreview>;
      })}
    </div>
  );
};

export default Shop;
