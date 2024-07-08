import { createSlice } from "@reduxjs/toolkit";
import { food_list } from ".././assets/assets.js";

export const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  totalQuantity: 0,
  reducers: {
    addToCart: (state, action) => {
      const itemInCart = state.find((item) => item._id === action.payload._id);
      if (itemInCart) {
        itemInCart.quantity++;
      } else {
        state.push({ ...action.payload, quantity: 1 });
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.find((item) => item._id === action.payload);
      item.quantity++;
    },
    decrementQuantity: (state, action) => {
      const item = state.find((item) => item._id === action.payload);
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        return state.filter((item) => item._id !== action.payload);
      }
    },
    removeItem: (state, action) => {
      return state.filter((item) => item._id !== action.payload);
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
