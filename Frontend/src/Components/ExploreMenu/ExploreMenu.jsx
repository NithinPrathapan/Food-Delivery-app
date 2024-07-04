import React from "react";
import { menu_list } from "./../../assets/assets.js";

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className="flex flex-col  " id="explore-menu ">
      <h1 className="text-[#262626] font-semibold text-2xl ">
        Explore our menu
      </h1>
      <p className="max-w-[60%] text-[#808080] text-lg">
        Discover a world of flavors with our carefully curated menu! From
        mouthwatering appetizers and savory main courses to delectable desserts
        and refreshing beverages
      </p>
      <div className="flex justify-between items-center gap-[30px] text-center my-[20px]">
        {menu_list.map((item, index) => {
          return (
            <div
              onClick={(e) =>
                setCategory((prev) => (prev === "All" ? item.menu_name : "All"))
              }
              key={index}
            >
              <img
                className={
                  category === item.menu_name
                    ? "scale-125 w-[7.5vw] min-w-[80px] border-4 border-orange-500 cursor-pointer rounded-full transition-all duration-600 ease-in-out"
                    : "w-[7.5vw] min-w-[80px] cursor-pointer rounded-full"
                }
                src={item.menu_image}
                alt="menuimg"
              />
              <p className="mt-[10px] text-[#747474] text-xl py-2 font-semibold cursor-pointer">
                {item.menu_name}
              </p>
            </div>
          );
        })}
      </div>
      <hr className="my-1 bg-[#2e2e2e] border-none h-[2px]" />
    </div>
  );
};

export default ExploreMenu;
