import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  decrementQuantity,
  incrementQuantity,
  getTotalAmount,
} from "../../Redux/cartSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Cart = () => {
  const token = useSelector((state) => state.auth.userToken);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [cartData, setCartData] = useState([]);
  const [products, setProducts] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  console.log(totalAmount);

  useEffect(() => {
    getCartData();
  }, [0]);

  useEffect(() => {
    if (cartData) {
      fetchProducts();
    }
  }, [cartData]);

  useEffect(() => {
    calclateTotalAmount();
  }, [products]);

  const fetchProducts = async () => {
    console.log("fetch products");
    try {
      const productIds = Object.keys(cartData);
      const productPromises = productIds.map((id) =>
        axios
          .get(`http://localhost:5000/api/food/${id}`)
          .then((response) => response.data.data)
      );
      const fetchedProducts = await Promise.all(productPromises);
      setProducts(fetchedProducts);
      console.log(products, "products stores second");
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
    }
  };

  const getCartData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/cart", {
        headers: { token },
      });
      const { cartData } = response.data;
      setCartData(cartData);
      console.log("cartdta loads first time", cartData);
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // fetch product details for each id

  const handleRemoveItem = async (id) => {
    dispatch(removeItem(id));
    const quantity = cartData[id];
    console.log(quantity);
    if (token) {
      const response = await axios.post(
        `http://localhost:5000/api/cart/remove/${id}`,
        { quantity },
        {
          headers: { token },
        }
      );
      getCartData();
    }
  };
  const handleDecrement = async (id) => {
    const itemId = id;
    dispatch(decrementQuantity(id));
    if (token) {
      const response = await axios.post(
        `http://localhost:5000/api/cart/remove/${itemId}`,
        { quantity: 1 },
        {
          headers: { token },
        }
      );
      getCartData();
    }
  };
  const handleIncrement = async (id) => {
    dispatch(incrementQuantity(id));
    try {
      if (token) {
        const response = await axios.post(
          `http://localhost:5000/api/cart/add`,
          { itemId: id, quantity: 1 },
          {
            headers: { token },
          }
        );
        getCartData();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const calclateTotalAmount = () => {
    const total = products.reduce((acc, product) => {
      return acc + product.price * cartData[product._id];
    }, 0);
    setTotalAmount(total);
    dispatch(getTotalAmount(total));
    console.log(total);
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
        {products.map((item) => {
          return (
            <div key={item._id}>
              <div
                className=" sm:grid  sm:grid-cols-6 items-center justify-center text-center text-gray-500 my-[10px] mx-0 "
                key={item._id}
              >
                <img
                  className="w-[50px] mx-auto"
                  src={`http://localhost:5000/api/food/images/${item.image}`}
                  alt=""
                />
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
                  <p>{cartData[item._id]}</p>
                  <button
                    onClick={() => {
                      handleIncrement(item._id);
                    }}
                    className="bg-[#fff] shadow-sm text-2xl  rounded-full w-[30px] h-[30px] text-black drop-shadow-lg font-extrabold items-center flex justify-center border-none outline-none"
                  >
                    +
                  </button>
                </div>

                <p>$ {item.price * cartData[item._id]}</p>
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
      {products.length > 0 ? (
        <div className="mt-[80px] sm:flex flex flex-col-reverse sm:flex-col justify-between gap-20 ">
          <div className="flex-1 flex flex-col gap-[20px]">
            <h2 className="text-2xl  font-semibold">Cart Totals</h2>
            <div className="">
              <div className="flex justify-between text-[#555] my-3">
                <p>Sub Total</p>
                <p>${totalAmount ? totalAmount : 0}</p>
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
