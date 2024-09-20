import React, { useContext } from "react";
import { SlLocationPin } from "react-icons/sl";
import { IoSearch } from "react-icons/io5";
import { IoMdCart } from "react-icons/io";
import classes from "./Header.module.css";
import LowerHeader from "./LowerHeader";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
function Header() {
  const [{basket}, dispatch] =useContext(DataContext)
  const totalItem = basket?.reduce((amount, item) => {
    return item.amount + amount;
  }, 0)
  return (
    <section className={classes.fixed}>
      <div className={classes.header__container}>
        {/* {logo} */}
        <div className={classes.logo__container}>
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon logo"
            />
          </Link>
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p>Deliver to</p>
              <span>Ethiopia</span>
            </div>
          </div>
        </div>
        {/* search section */}
        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" />
          <IoSearch />
        </div>
        {/* order section */}
        <div className={classes.order__container}>
          <Link href="" className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Flag_of_the_United_States.png/800px-Flag_of_the_United_States.png"
              alt=""
            />
            <select name="">
              <option value="">EN</option>
            </select>
          </Link>
          <Link to="/auth">
            <p>Sign In</p>
            <span>Account & Lists</span>
          </Link>
          <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
          </Link>
          <Link to="/cart" className={classes.cart}>
            <IoMdCart size={30} />
        <span>{basket?.length}</span>
          </Link>
        </div>
      </div>
      <LowerHeader />
    </section>
  );
}

export default Header;
