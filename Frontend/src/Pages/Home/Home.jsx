import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import ExploreMenu from "../../Components/ExploreMenu/ExploreMenu";
import FoodDisplay from "../../Components/FoodDisplay/FoodDisplay";
import AppDownload from "../../Components/AppDownload/AppDownload";
import { useSelector } from "react-redux";

const Home = () => {
  const [category, setCategory] = useState("All");
  const [cartData, setCartData] = useState([]);
  const cartitems = useSelector((state) => state.cart.cartItems);
  console.log(cartitems);
  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  );
};

export default Home;
