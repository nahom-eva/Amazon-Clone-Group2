import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import { useParams } from "react-router-dom";
import classes from "./results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
function Results() {
  const [results, SetResults] = useState([]);
  const { categoryName } = useParams();
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        SetResults(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
        <hr />

        <div className={classes.products__container}>
          {results?.map((product) => {
            return <ProductCard key={product.id} product={product} />;
          })}
        </div>
      </section>
    </LayOut>
  );
}

export default Results;
