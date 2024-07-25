import React from "react";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { assets } from "../../assets/assets.js";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/order/list");
      if (response.data.success) {
        setOrders(response.data.data);
      } else {
        toast.error("Error");
      }
      console.log(orders);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchAllOrders();
  }, [0]);

  const statusHandler = async (e, orderId) => {
    const response = await axios.post(
      `http://localhost:5000/api/order/status`,
      {
        orderId,
        status: e.target.value,
      }
    );
    if (response.data.success) {
      await fetchAllOrders();
    }
  };
  return (
    <div className="">
      <h3 className="font-bold m-4 ">Orders</h3>
      <div className="mt-4 sm:ml-[5vw]  sm:mt-[50px] mx-auto  sm:text-[18px] text-[12px]">
        {orders.map((order, index) => (
          <div
            className=" flex gap-2   flex-wrap justify-between items-center border-4 my-4 mx-2 rounded-md p-2 "
            key={index}
          >
            <img src={assets.parcel_icon} alt="parcel" />
            <div className="flex justify-between gap-4  items-center">
              <div>
                {order.item.map((list, index) => {
                  return (
                    <p key={index} className="font-semibold">
                      {list.name + " " + "x" + " " + list.quantity}
                    </p>
                  );
                })}
              </div>
              <p className="">
                {order.address.firstName + " " + order.address.lastName}
              </p>
              <p className="">
                {order.address.street +
                  ", " +
                  order.address.city +
                  ", " +
                  order.address.country +
                  ", " +
                  order.address.zipcode +
                  "," +
                  order.address.phone}
              </p>
              <p>{}</p>
            </div>
            <div className="flex gap-3  font-bold">
              <p>Items : {order.item.length}</p>
              <p>Amount : {order.amount}.00</p>
            </div>
            <select
              onChange={(e) => {
                statusHandler(e, order._id);
              }}
              value={order.status}
              className="bg-red-200  px-4  py-2 rounded-md "
            >
              <option value="Food Processing">Food Processing</option>
              <option value="Out for delivery">Out For Delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
