import React, { useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import axios from "axios";
import { productUrl } from "../../Api/endPoint";
import { useParams } from "react-router-dom";
import classes from "./results.module.css";
import ProductCard from "../../Components/Product/ProductCard";
import Loader from "../../Components/Loader/Loader";
function Results() {
  const [results, SetResults] = useState([]);
  const { categoryName } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${productUrl}/products/category/${categoryName}`)
      .then((res) => {
        SetResults(res.data);
        console.log(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: "30px" }}>Results</h1>
        <p style={{ padding: "30px" }}>Category/ {categoryName}</p>
        <hr />
        {isLoading ? (
          <Loader />
        ) : (
          <div className={classes.products__container}>
            {results?.map((product) => {
              return <ProductCard key={product.id} flex={false} renderAdd={true} renderDes={false} product={product} />;
            })}
          </div>
        )}
      </section>
    </LayOut>
  );
}

export default Results;
