import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <div
      className="text-[#d9d9d9] bg-[#323232] flex flex-col items-center gap-[20px] mt-20"
      id="footer"
    >
      <div className="grid grid-cols-3 gap-20 py-[80px] px-[8vw] mx-auto ">
        <div className="w-full flex flex-col gap-2 mx-auto items-start">
          <h1 className="text-red-500 font-bold tracking-widest sm:text-3xl text-2xl ">
            doorDash
          </h1>{" "}
          <p className="mt-4">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Rerum,
            quaerat eos. Voluptatibus similique officia dicta? Dolores, labore!
            Et, eos. Ab doloremque ea reprehenderit vitae quasi asperiores illum
            deserunt exercitationem. Eos.
          </p>
          <div className="flex gap-2">
            <img src={assets.facebook_icon} alt="icon" />
            <img src={assets.twitter_icon} alt="icon" />
            <img src={assets.linkedin_icon} alt="icon" />
          </div>
        </div>
        <div className="flex flex-col gap-4 mx-auto">
          <h2 className="text-white font-semibold  text-2xl">COMPANY</h2>
          <ul>
            <li>Home</li>
            <li>About-us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>
        <div className="flex flex-col gap-4 mx-auto">
          <h2 className="text-white font-semibold  text-2xl">Get in Touch</h2>
          <ul>
            <li>+91-884-894-6278</li>
            <li>contact@doordash.com</li>
          </ul>
        </div>
      </div>
      <div className="w-full px-[80px] flex mx-auto">
        <hr className="h-[1px] bg-gray-400 w-full border-none" />
      </div>
      <p className="text-sm py-1">
        Copyright 2024 @ doorDash.com -All right Reserved
      </p>
    </div>
  );
};

export default Footer;
