const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_KEY);

const app = express();

app.use(cors({ origin: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.status(201).json({
    message: "success",
  });
});


//localhost:7777/payment.create?total=400
app.post("/payment/create", async (req, res) => {
  const total = req.query.total
//   res.send(total);


  if (total > 0) {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    console.log(paymentIntent)
    res.status(201).json({
      clientSecret: paymentIntent.client_secret,
    });
    // console.log("payment received ", total);
    // res.send(total);
  } else {
    res.status(403).json({
      message: "total must be greater than 0",
    });
  }
});




http: app.listen(7777, (err) => {
  if (err) throw err;
  console.log("Server is running on http://localhost:7777");
});




