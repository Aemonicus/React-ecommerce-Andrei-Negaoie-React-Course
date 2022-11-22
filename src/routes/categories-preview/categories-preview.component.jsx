import { useContext, Fragment } from "react";
import CategoryPreview from "../../components/category-preview/category-preview.component";
import ProductCard from "../../components/product-card/product-card.component";

import { CategoryContext } from "../../context/category.context";

export default function CategoriesPreview() {
  const { categoriesMap } = useContext(CategoryContext);
  return (
    <>
      {Object.keys(categoriesMap).map((title) => {
        const products = categoriesMap[title];

        return (
          <CategoryPreview key={title} title={title} products={products} />
        );
      })}
    </>
  );
}
