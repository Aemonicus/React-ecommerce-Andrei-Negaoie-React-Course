import { createContext, useEffect, useState } from "react";
import { SHOP_DATA } from "../shop-data.js";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils.js";

export const CategoryContext = createContext({
  categoriesMap: {},
});

export const CategoryProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({});

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments();
      setCategoriesMap(categoryMap);
    };
    getCategoriesMap();
  }, []);

  const value = { categoriesMap };

  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  );
};
