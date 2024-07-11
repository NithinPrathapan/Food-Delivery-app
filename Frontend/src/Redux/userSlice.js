import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

const token = localStorage.getItem("token") || null;
const initialState = {
  userInfo: {},
  userToken: token,
  isAuthenticated: token ? true : false,
};
export const userSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      state.userInfo = action.payload.user;
      state.isAuthenticated = true;
      state.userToken = action.payload.token;
    },
    logoutSuccess: (state, action) => {
      localStorage.clear();
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
