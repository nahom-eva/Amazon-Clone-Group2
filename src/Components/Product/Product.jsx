import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";
function Product() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProducts(res.data);
        setIsLoading(false);
        console.log(res.data);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <div className={classes.products__container}>
          {products.map((data, i) => {
            return <ProductCard  key ={i} renderAdd={true} product={data} />;
          })}
        </div>
      )}
    </>
  );
}

export default Product;
