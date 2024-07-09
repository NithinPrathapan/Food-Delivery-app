import React from "react";
import { assets } from "../../assets/assets.js";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-[18%] min-h-screen border-[1.5px] border-[#a9a9a9] border-t-0  text-[10px]">
      <div className="pt-[50px] pl-[20%] flex flex-col gap-[20px]">
        <NavLink
          to="/add"
          className=" current:bg-slate-200 current:border-orange-500 flex items-center gap-[12px] border border-[#a9a9a9] border-r-0 py-2 px-4 rounded-md cursor-pointer rounded-tr-none rounded-br-none"
        >
          <img src={assets.add_icon} alt="" />
          <p className="hidden sm:flex">Add items</p>
        </NavLink>
        <NavLink
          to="/list"
          className="current:bg-slate-200 current:border-orange-500 flex items-center gap-[12px] border border-[#a9a9a9] border-r-0 py-2 px-4 rounded-md cursor-pointer rounded-tr-none rounded-br-none"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:flex">List Items</p>
        </NavLink>
        <NavLink
          to="/orders"
          className="current:bg-slate-200 current:border-orange-500 flex items-center gap-[12px] border border-[#a9a9a9] border-r-0 py-2 px-4 rounded-md cursor-pointer rounded-tr-none rounded-br-none"
        >
          <img src={assets.order_icon} alt="" />
          <p className="hidden sm:flex">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
