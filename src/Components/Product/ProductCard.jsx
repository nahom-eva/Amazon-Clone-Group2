import React, { useContext } from "react";
import classes from "./product.module.css";
import { Rating } from "@mui/material";
import CurrencyFormat from "../CurrencyFormat/CurrencyFormat";
import { Link } from "react-router-dom";
import { Type } from "../../Utils/action.type";
import { DataContext } from "../DataProvider/DataProvider";
function ProductCard({ product, flex, renderDes, renderAdd }) {
  const { id, title, price, description, image, rating, category } = product;
  const [state, dispatch] = useContext(DataContext);
  function addToCart() {
    dispatch({
      type: Type.ADD_TO_BASKET,
      item: { id, title, price, description, image, rating, category },
    });
  }
  return (
    <div
      className={`${classes.card__container} ${
        flex ? classes.product__flexed : ""
      }`}
    >
      <Link to={`/products/${id}`}>
        <img src={image} alt="" />
      </Link>
      <div>
        <h3>{title}</h3>
        {renderDes && <div style={{ maxWidth: "750px" }}>{description}</div>}
        <div>
          {/* rating */}
          <Rating readOnly value={rating?.rate} precision={0.1} />
          {/* count */}
          <small>{rating?.count}</small>
        </div>
        <div>
          <CurrencyFormat amount={price} />
        </div>
        {renderAdd && (
          <button className={classes.button} onClick={addToCart}>
            add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
