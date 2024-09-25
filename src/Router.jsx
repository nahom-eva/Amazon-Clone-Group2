import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./Pages/Landing/Landing";
import Auth from "./Pages/Auth/Auth";
import Orders from "./Pages/Orders/Orders";
import Cart from "./Pages/Cart/Cart";
import Results from "./Pages/Results/Results";
import ProductDetail from "./Pages/ProductDetail/ProductDetail";
import Payments from "./Pages/Payments/Payments";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
function Routing() {
  const stripePromise = loadStripe(
    "pk_test_51Q1rMWFCBTMFZW3tzc5eFo5h6zMAqj76GP8kgZcOYTWF0EytK83jifRHceTnpKfINBPhKxlaAo4gSgWOV0deUFpB00HbFwsiNN"
  );
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/payments"
          element={
            <Elements stripe={stripePromise}>
              <Payments />
            </Elements>
          }
        />
        <Route path="/category/:categoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
      </Routes>
    </BrowserRouter>
  );
}

export default Routing;
