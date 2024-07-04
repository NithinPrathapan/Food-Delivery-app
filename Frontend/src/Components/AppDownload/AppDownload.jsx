import React from "react";
import { assets } from "../../assets/assets";

const AppDownload = () => {
  return (
    <div
      className="m-auto mt-[100px] text-[30px] text-center font-semibold"
      id="app-download"
    >
      <p>
        For Better Experiance <br /> Download doorDash app
      </p>
      <div className="flex justify-center gap-4 mt-[40px]">
        <img
          className="max-w-[120px] transition-all cursor-pointer duration-300 hover:scale-105"
          src={assets.play_store}
          alt="app"
        />
        <img
          className="max-w-[120px] transition-all cursor-pointer duration-300 hover:scale-105"
          src={assets.app_store}
          alt="app"
        />
      </div>
    </div>
  );
};

export default AppDownload;
