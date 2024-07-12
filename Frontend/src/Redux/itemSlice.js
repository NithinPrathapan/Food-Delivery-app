import { createSlice } from "@reduxjs/toolkit";
import { food_list } from ".././assets/assets.js";

export const itemSlice = createSlice({
  name: "item",
  initialState: [],

  reducers: {
    listAllItems: (state, action) => {
      return action.payload;
    },
  },
});

export const { listAllItems } = itemSlice.actions;

export default itemSlice.reducer;
