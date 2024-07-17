import React from "react";
import FoodItem from "../FoodItem/FoodItem";
import { useSelector } from "react-redux";

const FoodDisplay = ({ category }) => {
  const food_list = useSelector((state) => state.item);
  const cartItems = useSelector((state) => state.cart.cartItems);
  console.log("cart items", cartItems);
  const getCartQuantity = (id) => {
    const cartItem = cartItems.find((item) => item.id === id);
    return cartItem ? cartItem.cartQuantity : 0;
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
              const cartQuantity = getCartQuantity(item._id);
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
