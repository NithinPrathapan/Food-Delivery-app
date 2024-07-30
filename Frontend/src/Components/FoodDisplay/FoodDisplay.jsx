import React, { useEffect, useState } from "react";
import FoodItem from "../FoodItem/FoodItem";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { listAllCarts } from "../../Redux/cartSlice";

const FoodDisplay = ({ category }) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const food_list = useSelector((state) => state.item);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    getCartData();
    checkItem();
  }, [cartData]);

  // fetch all foods present in the cart and find it with the id
  //  and then pass the cart quantity to the fooditem to display

  const getCartData = async () => {
    if (token) {
      try {
        const response = await axios.get("http://localhost:5000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const cartData = response.data.data;
        setCartData(cartData);
        dispatch(listAllCarts(cartData));
      } catch (error) {
        console.error("Error fetching cart data:", error);
      }
    }
    checkItem();
  };

  // match the item with the cartdata and return the cartQuantity and isAdded to the foodeItem component

  const checkItem = (id) => {
    const itemExist = cartData.find((item) => item.id === id);
    if (itemExist) {
      return itemExist.quantity;
    }
  };

  return (
    <div id="food-display " className="flex flex-col mx-0">
      <h2 className="text-2xl font-semibold flex my-3.5 ">
        Top Dishes near you
      </h2>

      <div className="flex flex-col w-full justify-center items-center mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4  sm:grid-cols-2 gap-6 mt-3.5  ">
          {food_list.map((item, index) => {
            if (category === "All" || category === item.category) {
              const cartQuantity = checkItem(item._id);
              return (
                <FoodItem key={index} item={item} cartQuantity={cartQuantity} />
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
