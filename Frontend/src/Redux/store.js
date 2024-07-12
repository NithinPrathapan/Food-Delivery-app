import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";
import authReducer from "./userSlice";
import itemReducer from "./itemSlice";
export default configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    item: itemReducer,
  },
});
