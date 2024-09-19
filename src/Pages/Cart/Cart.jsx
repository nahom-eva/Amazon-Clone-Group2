import React, { useContext } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";

function Cart() {
  const [{ basket, user }, dispatch] = useContext(DataContext);
  return (
    <LayOut>
      <div>
        <h2>Hello</h2>
        <h3>Your Shoping basket</h3>
        <hr />
        {basket?.length == 0 ? (
          <p>Opps ! No item in your cart</p>
        ) : (
          basket?.map((item, index) => {
            return (
              <ProductCard
              product={item}
                renderDes={true}
                flex={true}
                renderAdd={false}
                key={index}
              />
            );
          })
        )}
      </div>
      <div></div>
    </LayOut>
  );
}

export default Cart;
