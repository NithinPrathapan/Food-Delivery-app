import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../Redux/userSlice.js";

const Navbar = ({ setShowLogin }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [menu, setMenu] = useState("");
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const { userToken } = useSelector((state) => state.auth);
  console.log(userToken);

  const logout = (e) => {
    dispatch(logoutSuccess());
    navigate("/");
  };
  return (
    <div className="py-[20px] px-0 flex justify-between items-center ">
      <Link to="/">
        {" "}
        <h1 className="text-red-500 font-bold tracking-widest sm:text-3xl text-2xl">
          doorDash
        </h1>
      </Link>
      <ul className="md:flex font-outfit list-none hidden  text-[#49557e] lg:gap-[20px] gap-4   text-[14px] lg:text-[18px]">
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
        <img className="min-w-[24px]" src={assets.search_icon} alt="navbar" />
        <div className="relative ">
          <Link to="/cart">
            {" "}
            <img
              className="min-w-[24px] cursor-pointer"
              src={assets.basket_icon}
              alt=""
            />
          </Link>
          <div className="absolute min-w-[10px] min-h-[10px] bg-orange-500 rounded-[5px]  -top-2 right-0"></div>
        </div>
        {!isAuthenticated ? (
          <button
            onClick={() => {
              setShowLogin(true);
            }}
            className="ring-1 ring-orange-500 border-none rounded-full lg:px-4 lg:py-2 px-2 py-1  w-[100%] lg:text-[18px] text-[14px] "
          >
            Login
          </button>
        ) : (
          <div className="relative  group ">
            <img
              className="cursor-pointer"
              src={assets.profile_icon}
              alt="profile"
            />

            <ul className="absolute transition-all hidden duration-300 animate-fadeIn group-hover:flex flex-col bg-white     border-2 -right-6 w-[120px] p-2 justify-center items-center    shadow-md rounded-md z-20 ">
              <li className="cursor-pointer py-2 px-1 font-semibold hover:bg-slate-200 w-full flex justify-between items-center ">
                <img className="w-[30px] " src={assets.bag_icon} alt="" />
                <p className=" text-center text-emerald-800 text-sm">Orders</p>
              </li>
              <hr />
              <li
                onClick={() => {
                  logout();
                }}
                className="cursor-pointer py-2 px-1 font-semibold hover:bg-slate-200 w-full flex justify-between items-center "
              >
                <img className="w-[30px] " src={assets.logout_icon} alt="" />
                <p className=" text-center text-emerald-800 text-sm">Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
