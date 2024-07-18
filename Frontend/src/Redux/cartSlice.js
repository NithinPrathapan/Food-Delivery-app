import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  totalQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, quantity } = action.payload;
      const itemExist = state.cartItems.find((item) => item.id === id);
      if (itemExist) {
        itemExist.cartQuantity += quantity;
      } else {
        state.cartItems.push({ id, cartQuantity: quantity });
      }
      state.totalQuantity += quantity;
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    incrementQuantity: (state, action) => {
      const itemExist = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemExist) {
        itemExist.cartQuantity += 1;
        state.totalQuantity += 1;
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
    decrementQuantity: (state, action) => {
      const itemExist = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemExist) {
        if (itemExist.cartQuantity > 1) {
          itemExist.cartQuantity -= 1;
          state.totalQuantity -= 1;
        } else {
          state.cartItems = state.cartItems.filter(
            (item) => item.id !== action.payload
          );
          state.totalQuantity -= itemExist.cartQuantity;
        }
      }
    },
    removeItem: (state, action) => {
      const itemExist = state.cartItems.filter(
        (item) => item.id === action.payload
      );
      if (itemExist) {
        state.totalQuantity -= itemExist.cartQuantity;
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
      }
      localStorage.setItem("cart", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, incrementQuantity, decrementQuantity, removeItem } =
  cartSlice.actions;
export default cartSlice.reducer;
