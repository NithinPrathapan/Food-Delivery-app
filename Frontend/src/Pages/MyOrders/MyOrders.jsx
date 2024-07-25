import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { assets } from "../../../src/assets/assets.js";

const MyOrders = () => {
  const [data, setData] = useState([]);
  const token = useSelector((state) => state.auth.userToken);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/order/userorders",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setData(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
  return (
    <div>
      <h2>My Orders</h2>
      <div className="border-4 border-gray-300 p-4  ">
        {data.map((order, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center lg:gap-4 gap-2 text-xs lg:text-sm flex-wrap"
            >
              <img src={assets.parcel_icon} alt="" />
              <p>
                {order.item.map((list, index) => {
                  {
                    return list.name + " " + "x" + " " + list.quantity;
                  }
                })}
              </p>
              <p>{order.amount}.00</p>
              <p>Items: {order.item.length}</p>
              <p>
                <b>▢</b> <b>{order.status}</b>
              </p>
              <button
                onClick={fetchOrders}
                className="bg-red-500 bg-opacity-25 text-black text-opacity-60 px-4 py-2 border-none  rounded-md font-semibold"
              >
                Track Order
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MyOrders;
