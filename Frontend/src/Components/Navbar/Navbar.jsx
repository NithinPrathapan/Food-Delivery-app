import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = ({ setShowLogin }) => {
  const token = useSelector((state) => state.cart.token);
  const [menu, setMenu] = useState("");
  return (
    <div className="py-[20px] px-0 flex justify-between items-center">
      <Link to="/">
        {" "}
        <h1 className="text-red-500 font-bold tracking-widest sm:text-3xl text-2xl">
          doorDash
        </h1>
      </Link>
      <ul className="md:flex font-outfit list-none hidden  text-[#49557e] gap-[20px] text-[18px]">
        <Link
          to="/"
          onMouseEnter={() => setMenu("home")}
          className={
            menu === "home"
              ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]"
              : ""
          }
        >
          home
        </Link>
        <a
          href="#explore-menu"
          onMouseEnter={() => setMenu("menu")}
          className={
            menu === "menu"
              ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]"
              : ""
          }
        >
          menu
        </a>
        <a
          href="#app-download"
          onMouseEnter={() => setMenu("mobile")}
          className={
            menu === "mobile"
              ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]"
              : ""
          }
        >
          mobile_app
        </a>
        <a
          href="#footer"
          onMouseEnter={() => setMenu("contact")}
          className={
            menu === "contact"
              ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]"
              : ""
          }
        >
          contact us
        </a>
      </ul>
      <div className="flex items-center md:gap-[40px] gap-2">
        <img
          className="w-[20px] sm:w-[30px]"
          src={assets.search_icon}
          alt="navbar"
        />
        <div className="relative ">
          <Link to="/cart">
            {" "}
            <img
              className="w-[20px] sm:w-[30px] cursor-pointer"
              src={assets.basket_icon}
              alt=""
            />
          </Link>
          <div className="absolute min-w-[10px] min-h-[10px] bg-orange-500 rounded-[5px]  -top-2 right-0"></div>
        </div>
        <button
          onClick={() => {
            setShowLogin(true);
          }}
          className="bg-transparent sm:text-[16px] text-[12px] text-[#49557e] border border-orange-500
        py-1 px-3 cursor-pointer rounded-full hover:bg-[#fff4f2] transition-all duration-300 ease-out"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
