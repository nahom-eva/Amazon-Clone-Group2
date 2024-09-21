import React from "react";
import CategoryCard from "./CategoryCard";
import { categoryInfos } from "./categoryFullInfo";
import classes from "./category.module.css";
function Category() {
  return (
    <div className={classes.category__container}>
      {categoryInfos.map((infos) => {
        return <CategoryCard  data={infos} />;
      })}
    </div>
  );
}

export default Category;
