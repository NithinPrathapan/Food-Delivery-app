import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./userSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
  },
});
