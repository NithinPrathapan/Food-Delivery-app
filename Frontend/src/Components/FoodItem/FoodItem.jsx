import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../../Redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ item, cartQuantity }) => {
  const navigate = useNavigate();
  const [isAdded, setisAdded] = useState(false);
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");

  useEffect(() => {
    // if (cartQuantity > 0) {
    //   setisAdded(true);
    // }
  }, []);
  const { name, description, _id, price, category, image } = item;

  const handleAddToCart = async () => {
    dispatch(addToCart({ id: _id, quantity: 1 }));
    if (token) {
      try {
        const response = await axios.post(
          `http://localhost:5000/api/cart/add`,
          { itemId: _id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setisAdded(false);
        console.log(response.data);
      } catch (error) {
        setisAdded(false);
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full h-full  m-auto rounded-[15px] shadow-md cursor-pointer ">
      <div className="relative">
        <img
          className=" w-[300px] mx-auto h-[200px] object-cover rounded-[15px] shadow-md drop-shadow-lg transition-all duration-300  hover:scale-[1.04] hover:-translate-y-3 ease-in-out "
          src={`http://localhost:5000/api/food/images/${image}`}
          alt="foodimg"
        />
        <button
          title={
            isAdded
              ? "Go to your cart to view added items"
              : "Click to add this item to your cart"
          }
          onClick={() => {
            if (isAdded) {
              navigate("/cart");
            } else {
              handleAddToCart();
            }
          }}
          className={` ${
            isAdded
              ? "absolute bg-orange-500 rounded-md w-[130px] px-2 py-2 bottom-4 right-6 text-sm text-black font-semibold opacity-70 hover:opacity-100 duration-300 transition-all"
              : "absolute bg-orange-500 rounded-md w-[130px] px-2 py-2 bottom-4 right-6 text-sm text-white font-semibold opacity-70 hover:opacity-100 duration-300 transition-all"
          }`}
        >
          {isAdded ? "View in cart" : "Add to Cart"}
        </button>
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
