import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../Redux/userSlice";

const LoginPopUp = ({ setShowLogin }) => {
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const url = "http://localhost:5000/api/user";
  const [currentState, setCurrentState] = useState("Login");
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onchangeHandler = async (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData((data) => ({ ...data, [name]: value }));
  };

  const onLogin = async (e) => {
    e.preventDefault();
    if (currentState === "Login") {
      try {
        const response = await axios.post(`${url}/login`, data);
        dispatch(loginSuccess(response.data));
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const response = await axios.post(`${url}/register`, data);
        console.log(response.data.token);
        localStorage.setItem("token", response.data.token);
        dispatch(loginSuccess(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  return (
    <div className="absolute z-50 w-[100%] h-[100%] bg-[#00000037] grid">
      <form
        onSubmit={onLogin}
        action=""
        className="place-self-center max-w-[23vw,330px] bg-[#fefefe] text-[#808080] flex flex-col gap-4 py-[25px] px-[30px] animate-fadeIn  duration-150 rounded-xl"
      >
        <div className="flex justify-between items-center text-black font-semibold">
          <h2 className="text-2xl text-center w-full uppercase tracking-wider text-orange-500">
            {currentState}
          </h2>
          <img
            className="cursor-pointer"
            onClick={() => setShowLogin(false)}
            src={assets.cross_icon}
            alt="cross"
          />
        </div>
        <div className="flex flex-col gap-[20px]">
          {currentState === "Login" ? (
            <></>
          ) : (
            <input
              className="p-1.5 rounded-md outline-none border-2 border-[#c9c9c9]"
              type="text"
              placeholder="Your Name"
              required
              name="name"
              onChange={onchangeHandler}
              value={data.name}
            />
          )}
          <input
            name="email"
            onChange={onchangeHandler}
            value={data.email}
            className="p-1.5 rounded-md outline-none border-2 border-[#c9c9c9]"
            type="email"
            placeholder="Your Email"
            required
          />
          <input
            name="password"
            onChange={onchangeHandler}
            value={data.password}
            className="p-1.5 rounded-md outline-none border-2 border-[#c9c9c9]"
            type="password"
            placeholder="Password"
            required
          />
        </div>
        <div>
          {currentState === "Sign Up" ? (
            <button
              type="submit"
              className="bg-orange-500 text-white  w-full text-center py-2 rounded-md"
            >
              Create Account
            </button>
          ) : (
            <button
              type="submit"
              className="bg-orange-500 text-white  w-full text-center py-2 rounded-md"
            >
              Login
            </button>
          )}
        </div>
        <div className="flex items-center gap-2 mt-[15px]">
          <input className="" type="checkbox" required />
          <p>By continuing, i agree to the terms of use & privacy policy</p>
        </div>
        {currentState === "Login" ? (
          <p className="">
            Create a new account ?{" "}
            <button
              className="font-semibold text-orange-500"
              onClick={() => {
                setCurrentState("Sign Up");
              }}
            >
              Click here
            </button>
          </p>
        ) : (
          <p className="">
            Already have an account{" "}
            <button
              className="font-semibold text-orange-500"
              onClick={() => {
                setCurrentState("Login");
              }}
            >
              Login here
            </button>
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPopUp;
