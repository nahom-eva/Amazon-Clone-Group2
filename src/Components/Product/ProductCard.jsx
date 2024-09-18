import React from "react";
import classes from "./product.module.css";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
function ProductCard({ product }) {
  const { id, title, price, description, image, rating, category } = product;
  return (
    <div className={classes.card__container}>
      <a to="">
        <img src={image} alt="" />
      </a>
      <div>
        <h3>{title}</h3>
        <div>
          {/* rating */}
          <Rating readOnly value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        <button className={classes.button}>add to cart</button>
      </div>
    </div>
  );
}

export default ProductCard;
