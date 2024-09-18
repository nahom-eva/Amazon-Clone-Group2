import React from "react";
import classes from "./product.module.css";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import {Link} from "react-router-dom"
function ProductCard({ product }) {
  const { id, title, price, description, image, rating, category } = product;
  return (
    <div className={classes.card__container}>
      <Link to="">
        <img src={image} alt="" />
      </Link>
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
