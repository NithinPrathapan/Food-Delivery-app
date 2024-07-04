import React from "react";
import FoodItem from "../FoodItem/FoodItem";
import { useSelector } from "react-redux";

const FoodDisplay = ({ category }) => {
  const food_list = useSelector((state) => state.cart);
  return (
    <div id="food-display " className="flex flex-col mx-0">
      <h2 className="text-2xl font-semibold flex my-3.5 ">
        Top Dishes near you
      </h2>

      <div className="flex flex-col w-full justify-center items-center mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 sm:grid-cols-3 gap-4 mt-3.5 ">
          {food_list.map((item) => {
            if (category === "All" || category === item.category) {
              return <FoodItem key={item._id} item={item} />;
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default FoodDisplay;
