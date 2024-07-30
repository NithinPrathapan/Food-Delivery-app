import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cart")) || [],
  totalQuantity: 0,
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    listAllCarts: (state, action) => {
      state.cartItems = action.payload;
    },
    addToCart: (state, action) => {
      const { id } = action.payload;
      const itemExist = state.cartItems.find((item) => item.id === id);
      if (itemExist) {
        itemExist.cartQuantity += 1;
      } else {
        state.cartItems.push({ id, cartQuantity: 1 });
      }
      state.totalQuantity += 1;
    },
    incrementQuantity: (state, action) => {
      const itemExist = state.cartItems.find(
        (item) => item.id === action.payload
      );
      if (itemExist) {
        itemExist.cartQuantity += 1;
        state.totalQuantity += 1;
      }
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
    },
    getTotalAmount: (state, action) => {
      state.totalAmount = action.payload;
    },
  },
});

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeItem,
  getTotalAmount,
  listAllCarts,
} = cartSlice.actions;
export default cartSlice.reducer;
