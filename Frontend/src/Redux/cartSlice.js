import { createSlice } from "@reduxjs/toolkit";
import { food_list } from ".././assets/assets.js";

export const cartSlice = createSlice({
  name: "cart",
  initialState: food_list,
  reducers: {
    addToCart: (state, action) => {},
  },
});

export const { addToCart } = cartSlice.actions;
export default cartSlice.reducer;
