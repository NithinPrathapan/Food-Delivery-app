import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, decrementQuantity } from "../../Redux/cartSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FoodItem = ({ item, cartQuantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isAdded, setisAdded] = useState(false);
  const token = useSelector((state) => state.auth.userToken);

  useEffect(() => {
    if (cartQuantity > 0) {
      setisAdded(true);
    }
  }, []);
  const { name, description, _id, price, category, image } = item;

  const handleAddToCart = async () => {
    if (token) {
      dispatch(addToCart({ id: _id }));
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
        console.log(response.data);
        setisAdded(true);
      } catch (error) {
        setisAdded(false);
        console.log(error);
      }
    } else {
      alert("Please Login First");
    }
  };
  const handleIncrement = async (id) => {
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:5000/api/cart/add`,
          { itemId: id, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleDecrement = async () => {
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:5000/api/cart/remove`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      }
    } catch (error) {
      console.log(error);
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
        {cartQuantity ? (
          <div className="flex gap-2 border-none shadow-md bg-white rounded-md text-black w-[110px] justify-between items-center absolute   bottom-4 right-6 font-bold text-xl  ">
            <button
              onClick={() => handleDecrement(item._id)}
              className="bg-orange-500 border-none px-4 h-[30px] text-2xl w-[30px] flex items-center justify-center text-white rounded-l-md"
            >
              -
            </button>
            <span className="cursor-default">{cartQuantity}</span>
            <button
              onClick={() => handleIncrement(item._id)}
              className="bg-orange-500 border-none px-4 h-[30px] text-2xl w-[30px] flex items-center justify-center text-white rounded-r-md"
            >
              +
            </button>
          </div>
        ) : (
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
                ? "hidden"
                : "absolute bg-orange-500 rounded-md w-[130px] px-2 py-2 bottom-4 right-6 text-sm text-white font-semibold opacity-70 hover:opacity-100 duration-300 transition-all"
            }`}
          >
            Add to Cart
          </button>
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
