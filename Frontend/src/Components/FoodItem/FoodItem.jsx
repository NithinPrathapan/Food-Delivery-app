import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";

const FoodItem = ({ item }) => {
  const [itemCount, setItemCount] = useState(0);
  const { cartitems, addToCart, removeFromCart } = useContext(StoreContext);
  const { name, description, _id, price, category, image } = item;
  return (
    <div className="w-full m-auto rounded-[15px] shadow-md transition-all duration-200 animate-fadeIn ">
      <div className="relative">
        <img className="w-full rounded-[15px]" src={image} alt="foodimg" />
        {!itemCount ? (
          <img 
            className="cursor-pointer w-[35px] absolute bottom-4 right-1.5 rounded-full "
            onClick={() => setItemCount((prev) => prev + 1)}
            src={assets.add_icon_white}
            alt="ico"
          />
        ) : (
          <div className="absolute bottom-4 right-1.5 flex items-center gap-2 p-[6px] bg-[#ffffff] rounded-2xl   ">
            <img
              className="cursor-pointer w-[30px]"
              onClick={() => {
                setItemCount((prev) => prev - 1);
              }}
              src={assets.remove_icon_red}
              alt="ico"
            />
            <p>{itemCount}</p>
            <img
              className="cursor-pointer w-[30px]"
              onClick={() => {
                setItemCount((prev) => prev + 1);
              }}
              src={assets.add_icon_green}
              alt="ico"
            />
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col gap-1">
        <div className="flex justify-between mb-1">
          <p className="font-semibold text-lg ">{name}</p>
          <img
            className="object-contain w-[70px]"
            src={assets.rating_starts}
            alt="star"
          />
        </div>
        <p className="text-[12px] ">{description}</p>
        <p className="text-[22px] text-orange-500 font-bold my-[10px]">
          {" "}
          ${price}
        </p>
      </div>
    </div>
  );
};

export default FoodItem;
