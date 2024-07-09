import React from "react";
import { assets } from "../../assets/assets.js";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-4">
      <h1 className="text-red-500 flex flex-col font-bold tracking-widest justify-center sm:text-3xl text-2xl  ">
        doorDash{" "}
        <span className="text-black text-sm tracking-wide ">Admin Panel</span>
      </h1>
      <img className="w-[40px]" src={assets.profile_image} alt="" />
    </div>
  );
};

export default Navbar;
``;
