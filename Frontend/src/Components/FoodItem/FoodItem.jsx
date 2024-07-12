import React, { useState } from "react";
import { assets } from "../../assets/assets";
import { useDispatch } from "react-redux";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../Redux/cartSlice";

const FoodItem = ({ item }) => {
  console.log(item);
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
    <div className="w-full h-full  m-auto rounded-[15px] shadow-md transition-all duration-300 cursor-pointer  hover:scale-105 ease-in-out ">
      <div className="relative">
        <img
          className=" w-[300px] mx-auto h-[200px] object-cover rounded-[15px] shadow-md drop-shadow-lg"
          src={`http://localhost:5000/api/food/images/${image}`}
          alt="foodimg"
        />
        {!itemCount ? (
          <img
            className=" cursor-pointer w-[35px] absolute bottom-4 right-1.5 rounded-full "
            onClick={handleAddToCart}
            src={assets.add_icon_white}
            alt="ico"
          />
        ) : (
          <div className="absolute bottom-4 right-1.5 flex items-center gap-2 p-[6px] bg-[#ffffff] rounded-2xl   ">
            <img
              className="cursor-pointer w-[30px] "
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
      <div className="p-2 flex flex-col h-[100px]">
        <div className="flex justify-between ">
          <p className="font-semibold text-md ">{name}</p>
          <img
            className="object-contain w-[60px]"
            src={assets.rating_starts}
            alt="star"
          />
        </div>
        <div className="flex justify-between items-center">
          <p className="text-[12px] ">{description}</p>
          <p className="text-[22px] ml-4 text-orange-500 font-bold my-[10px]">
            {" "}
            ${price}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FoodItem;
