import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const token = useSelector((state) => state.auth.userToken);
  const { cartItems, totalAmount } = useSelector((state) => state.cart);
  const food_list = useSelector((state) => state.item);

  console.log(cartItems);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const placeOrder = async (e) => {
    e.preventDefault();
    try {
      let orderItem = [];
      cartItems.forEach((cartItem) => {
        const item = food_list.find((food) => food._id === cartItem.id);
        if (item) {
          let itemInfo = { ...item, quantity: cartItem.cartQuantity };
          orderItem.push(itemInfo);
        }
      });
      const orderData = {
        address: data,
        items: orderItem,
        amount: totalAmount + 2,
      };
      const response = await axios.post(
        `http://localhost:5000/api/order/place`,
        { orderData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response) {
        const url = response.data.session_url;
        console.log(url, "session url");
        if (url) {
          window.location.href = url;
        } else {
          console.log("session url not found");
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  const onchangeHandler = (e) => {
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setData({ ...data, [name]: value });
  };

  return (
    <form
      onSubmit={placeOrder}
      className="md:flex justify-between items-center gap-12"
    >
      <div className="left">
        <p className="text-xl font-semibold my-2">Delivery information</p>
        <div className="flex gap-2">
          <input
            required
            name="firstName"
            onChange={onchangeHandler}
            value={data.firstName}
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="First Name"
          />
          <input
            required
            name="lastName"
            onChange={onchangeHandler}
            value={data.lastName}
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          required
          name="email"
          value={data.email}
          onChange={onchangeHandler}
          className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
          type="email"
          placeholder="Email Address"
        />
        <input
          required
          name="street"
          value={data.street}
          onChange={onchangeHandler}
          className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-2">
          <input
            required
            name="city"
            onChange={onchangeHandler}
            value={data.city}
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="City"
          />
          <input
            required
            name="state"
            onChange={onchangeHandler}
            value={data.state}
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-2">
          <input
            required
            name="zipcode"
            onChange={onchangeHandler}
            value={data.zipcode}
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="Zip code"
          />
          <input
            required
            name="country"
            onChange={onchangeHandler}
            value={data.country}
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
          required
          name="phone"
          value={data.phone}
          onChange={onchangeHandler}
          className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
          type="text"
          placeholder="Phone"
        />
      </div>

      <div className="mt-[80px] sm:flex flex flex-col-reverse sm:flex-col justify-between gap-20 w-[100%] max-w-[500px] ">
        <div className="flex-1 flex flex-col gap-[20px]">
          <h2 className="text-2xl  font-semibold">Cart Totals</h2>
          <div className="">
            <div className="flex justify-between text-[#555] my-3">
              <p>Sub Total</p>
              <p>$ {totalAmount}</p>
            </div>
            <hr className="my-[10px] mx-0" />
            <div className="flex justify-between text-[#555] my-3">
              <p>Delivery Chargers</p>
              <p>{2}</p>
            </div>
            <hr className="my-[10px] mx-0" />
            <div className="flex justify-between text-[#555] my-3">
              <b>Total</b>
              <b>$ {totalAmount + 2}</b>
            </div>
            <button
              type="submit"
              className="uppercase bg-orange-500  px-6 py-2 max-w-[300px] rounded-md text-white font-semibold my-[30px]"
            >
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
