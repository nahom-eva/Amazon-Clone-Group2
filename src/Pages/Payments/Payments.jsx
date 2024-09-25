import React, { useContext, useState } from "react";
import classes from "./payment.module.css";
import LayOut from "../../Components/LayOut/LayOut";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import ProductCard from "../../Components/Product/ProductCard";
import CurrencyFormat from "../../Components/CurrencyFormat/CurrencyFormat";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { axiosInstance } from "../../Api/axios";
import { db } from "../../Utils/firebase";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utils/action.type";

function Payments() {
  const [{ basket, user }, dispatch] = useContext(DataContext);

  const totalItem = basket?.reduce((amount, item) => {
    return amount + item.amount;
  }, 0);

  const total = basket?.reduce((amount, item) => {
    return amount + item.price * item.amount;
  }, 0);

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [cardError, setCardError] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleError = (e) => {
    // console.log(e?.error?.message)
    e?.error?.message ? setCardError(e?.error?.message) : setCardError(null);
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      // step 1. request to the server
      const response = await axiosInstance.post(
        `/payment/create?total=${total * 100}`
      );
      console.log(response.data);
      const clientSecret = response.data?.clientSecret;
      console.log(clientSecret);

      // step 2. confirmation
      const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      console.log(paymentIntent);
      // step 3
      await db
        .collection("users")
        .doc(user.uid)
        .collection("orders")
        .doc(paymentIntent.id)
        .set({
          basket: basket,
          amount: paymentIntent.amount,
          created: paymentIntent.created,
        });
      navigate("/orders");
      setProcessing(false);

      dispatch({
        type: Type.EMPTY_BASKET,
      });
      
    } catch (error) {
      console.log(error);
      setProcessing(false);
    }
  };

  return (
    <LayOut>
      {/* Header */}
      <div className={classes.payment__header}>
        Checkout ({totalItem}) items
      </div>
      {/* Payment method */}
      <section className={classes.payment}>
        {/* address */}

        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>123 react Lane</div>
            <div>Addis Ababa, Ethiopia</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} flex={true} product={item} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form*/}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__details}>
              <form onSubmit={handlePayment}>
                {/* error */}

                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}

                {/* card element */}
                <CardElement onChange={handleError} />
                {/* price */}
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />{" "}
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? <ClipLoader size={13} /> : "Pay Now"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payments;
