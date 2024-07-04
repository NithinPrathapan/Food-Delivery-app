import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../Redux/cartSlice";

const FoodItem = ({ item }) => {
  const dispatch = useDispatch();
  const [itemCount, setItemCount] = useState(0);
  const { name, description, _id, price, category, image } = item;

  const handleAddToCart = () => {
    setItemCount((prev) => prev + 1);
    dispatch(addToCart(item));
  };

  const handleIncrement = () => {
    setItemCount((prev) => prev + 1);
    dispatch(incrementQuantity(_id));
  };

  const handleDecrement = () => {
    setItemCount((prev) => prev - 1);
    dispatch(decrementQuantity(_id));
  };

  return (
    <div className="w-full m-auto rounded-[15px] shadow-md transition-all duration-200 animate-fadeIn ">
      <div className="relative">
        <img className="w-full rounded-[15px]" src={image} alt="foodimg" />
        {!itemCount ? (
          <img
            className="cursor-pointer w-[35px] absolute bottom-4 right-1.5 rounded-full "
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="ico"
          />
        ) : (
          <div className="absolute bottom-4 right-1.5 flex items-center gap-2 p-[6px] bg-[#ffffff] rounded-2xl   ">
            <img
              className="cursor-pointer w-[30px]"
              onClick={handleDecrement}
              src={assets.remove_icon_red}
              alt="ico"
            />
            <p>{itemCount}</p>
            <img
              className="cursor-pointer w-[30px]"
              onClick={handleIncrement}
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
