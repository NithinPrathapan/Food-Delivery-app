import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const PlaceOrder = () => {
  const [totalAmount, setTotalAmount] = useState(0);
  const cartitems = useSelector((state) => state.cart);

  useEffect(() => {
    getTotalCartAmount();
  }, [cartitems]);

  const getTotalCartAmount = () => {
    let amount = 0;
    cartitems.forEach((item) => {
      amount += item.quantity * item.price;
    });
    setTotalAmount(amount);
  };

  return (
    <form className="flex justify-between items-center">
      <div className="left">
        <p className="text-xl font-semibold my-2">Delivery information</p>
        <div className="flex gap-2">
          <input
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="First Name"
          />
          <input
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
          type="email"
          placeholder="Email Address"
        />
        <input
          className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
          type="text"
          placeholder="Street"
        />
        <div className="flex gap-2">
          <input
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="City"
          />
          <input
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-2">
          <input
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="Zip code"
          />
          <input
            className="mb-[15px] w-[100%]  p-2 border border-[#c5c5c5] rounded-md outline-orange-500"
            type="text"
            placeholder="Country"
          />
        </div>
        <input
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
            <button className="uppercase bg-orange-500  px-6 py-2 max-w-[300px] rounded-md text-white font-semibold my-[30px]">
              Proceed to payment
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
