import React, { useState } from "react";
import { assets } from "../../assets/assets";

const Navbar = () => {
  const [menu, setMenu] = useState("home");
  return (
    <div className="py-[20px] px-0 flex justify-between items-center">
      <h1 className="text-red-500 font-bold tracking-widest sm:text-3xl text-2xl">
        doorDash
      </h1>
      <ul className="flex font-outfit list-none text-[#49557e] gap-[20px] text-[18px]">
        <li onMouseEnter={ ()=>setMenu("home")}
          className={
            menu === "home" ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]" : ""
          }
        >
          home
        </li>
        <li onMouseEnter={ ()=>setMenu("menu")}
          className={
            menu === "menu" ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]" : ""
          }
        >
          menu
        </li>
        <li onMouseEnter={ ()=>setMenu("mobile")}
          className={
            menu === "mobile" ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]" : ""
          }
        >
          mobile_app
        </li>
        <li onMouseEnter={ ()=>setMenu("contact")}
          className={
            menu === "contact" ? "pb-[2px] border-b-2 cursor-pointer  border-[#49557e]" : ""
          }
        >
          contact us
        </li>
      </ul>
      <div className="flex items-center gap-[40px]">
        <img src={assets.search_icon} alt="navbar" />
        <div className="relative ">
          <img src={assets.basket_icon} alt="" />
          <div className="absolute min-w-[10px] min-h-[10px] bg-orange-500 rounded-[5px]  -top-2 right-0"></div>
        </div>
        <button
          className="bg-transparent text-[16px] text-[#49557e] border border-orange-500
        py-1 px-3 cursor-pointer rounded-full hover:bg-[#fff4f2] transition-all duration-300 ease-out"
        >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Navbar;
