import React, { useContext, useState } from "react";
import classes from "./signIn.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utils/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utils/action.type";
import { ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
  const [error, setError] = useState("");

  const [{ user }, dispatch] = useContext(DataContext);

  const navigate = useNavigate();
  const navStateData = useLocation();

  console.log(user);

  const authHandler = async (e) => {
    e.preventDefault();
    // console.log(e.target.name)
    if (e.target.name === "signUp") {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo.user);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          setError("");
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          console.log(error.message);
          setError(error.message);
          setLoading({ ...loading, signUp: false });
        });
    } else {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          // console.log(userInfo.user);
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          setError("");
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((error) => {
          // console.log(error.message);
          setError(error.message);
          setLoading({ ...loading, signIn: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/905px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login__container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small
            style={{
              color: "red",
              textAlign: "center",
              padding: "5px",
              fontWeight: "bold",
            }}
          >
            {navStateData?.state?.msg}
          </small>
        )}
        <form action="">
          <div>
            <label htmlFor="">Email</label>
            <input
              value={email}
              type="email"
              id="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div>
            <label htmlFor="">Password</label>
            <input
              value={password}
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <button
            name="singIn"
            onClick={authHandler}
            className={classes.login__signInButton}
          >
            {loading.signIn ? <ClipLoader size={12} /> : "Sign In"}
          </button>
        </form>
        {/* agreement  */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest_Based Ads Notice.
        </p>
        {/* create account  btn */}
        <button
          name="signUp"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader size={12} />
          ) : (
            " Create your amazon account"
          )}
        </button>
        {error && (
          <small style={{ color: "red", marginTop: "5px" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
