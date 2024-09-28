import React, { useContext, useEffect, useState } from "react";
import LayOut from "../../Components/LayOut/LayOut";
import { db } from "../../Utils/firebase";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import classes from "./orders.module.css"
import ProductCard from "../../Components/Product/ProductCard"

function Orders() {
  const [{ user }] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    }else {
      setOrders([]);
    }
  }, []);
  return (
    <LayOut>
    <section className={classes.container}>
      <div className={classes.orders__container}>
        <h2>Your Orders</h2>
        {orders?.length === 0 && (
          <div style={{ padding: "20px" }}>You don't have orders yet</div>
        )}
        {/* ordered items */}

        <div>
          {orders?.map((eachOrder, i) => {
            return (
              <div key={i}>
                <hr />
                <p>Order ID: {eachOrder.id}</p>
                {eachOrder?.data?.basket?.map((order) => {
                  return (
                    <ProductCard product={order} key={order.id} flex={true} />
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  </LayOut>
  )
}

export default Orders;
