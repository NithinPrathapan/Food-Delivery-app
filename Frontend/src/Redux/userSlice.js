import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: {},
  userToken: null,
  isAuthenticated: false,
};
initialState.userToken = localStorage.getItem("token");
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
      state.userInfo = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginSuccess, logoutSuccess } = userSlice.actions;
export default userSlice.reducer;
