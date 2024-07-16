import React, { useEffect, useState } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Cart from "./Pages/Cart/Cart";
import PlaceOrder from "./Pages/PlaceOrder/PlaceOrder";
import Footer from "./Components/Footer/Footer";
import LoginPopUp from "./Components/loginPopup/LoginPopUp";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { listAllItems } from "./Redux/itemSlice";
const App = () => {
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);
  useEffect(() => {
    getAllFoods();
  }, []);

  const getAllFoods = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/food");
      const data = response.data.data;

      dispatch(listAllItems(data));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {showLogin ? <LoginPopUp setShowLogin={setShowLogin} /> : <></>}
      <div className="w-[80%] m-auto">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
          <Route path="/order" element={<PlaceOrder />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;
