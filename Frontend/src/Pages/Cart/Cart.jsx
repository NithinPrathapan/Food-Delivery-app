import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  decrementQuantity,
  incrementQuantity,
} from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartitems = useSelector((state) => state.cart.items);
  console.log(cartitems);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    getCartItems();
    getTotalCartAmount();
  }, [cartitems]);
  const getTotalCartAmount = () => {
    let amount = 0;
    cartitems.forEach((item) => {
      amount += item.quantity * item.price;
    });
    setTotalAmount(amount);
  };
  const getCartItems = async () => {
    const response = await axios.get("http://localhost:5000/api/cart", {
      headers: { token },
    });
    console.log(response.data.message);
  };

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };
  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  return (
    <div className="mt-[100px]">
      <div>
        <div className=" hidden sm:grid grid-cols-6 items-center text-center justify-center text-gray-500 fin">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {cartitems.map((item) => {
          return (
            <div key={item._id}>
              <div
                className=" sm:grid  sm:grid-cols-6 items-center justify-center text-center text-gray-500 my-[10px] mx-0 "
                key={item._id}
              >
                <img className="w-[50px] mx-auto" src={item.image} alt="" />
                <p>{item.name}</p>
                <p>$ {item.price}</p>
                <div className="flex gap-2 items-center justify-center  ">
                  <button
                    onClick={() => {
                      handleDecrement(item._id);
                    }}
                    className="bg-[#fff] shadow-sm text-2xl  rounded-full w-[30px] h-[30px] text-black drop-shadow-lg font-extrabold items-center flex justify-center border-none outline-none"
                  >
                    -
                  </button>
                  <p>{item.quantity}</p>
                  <button
                    onClick={() => {
                      handleIncrement(item._id);
                    }}
                    className="bg-[#fff] shadow-sm text-2xl  rounded-full w-[30px] h-[30px] text-black drop-shadow-lg font-extrabold items-center flex justify-center border-none outline-none"
                  >
                    +
                  </button>
                </div>
                <p>$ {item.price * item.quantity}</p>
                <p
                  onClick={() => handleRemoveItem(item._id)}
                  className=" cursor-pointer font-semibold text-red-500 text-xl"
                >
                  x
                </p>
              </div>
              <hr className="h-[1px] bg-[#e2e2e2] border-none" />
            </div>
          );
        })}
      </div>
      {cartitems.length > 0 ? (
        <div className="mt-[80px] sm:flex flex flex-col-reverse sm:flex-col justify-between gap-20 ">
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
            </div>
            <button
              onClick={() => {
                navigate("/order");
              }}
              className="border-none text-white bg-orange-500  px-[12px] py-2 max-w-[300px] rounded-md font-semibold uppercase"
            >
              Proceed to checkout
            </button>
          </div>
          <div className="flex-1">
            <div>
              <p>If you have a promo code enter it here</p>
              <div className="flex mt-[10px] items-center  justify-between text-[#555]  bg-[#eaeaea]  ">
                <input
                  className="bg-transparent border-none outline-none px-3"
                  type="text"
                  name=""
                  placeholder="ENTER CODE HERE"
                  id=""
                />
                <button className="bg-black text-white w-[200px] px-6 py-3 rounded-md">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center gap-3">
          <h1 className="text-orange-500 text-2xl text-center flex justify-center my-[40px] font-bold tracking-widest">
            Your Cart is empty
          </h1>
          <button className="bg-orange-500 text-white  px-6 py-2 rounded-md font-bold tracking-wider text-xl">
            See Items
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
