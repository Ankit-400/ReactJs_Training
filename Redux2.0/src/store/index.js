import { configureStore } from "@reduxjs/toolkit";
import uiReducer from "./ui-slice";
import cartReducer from "./cart-slice";
console.log(cartReducer);
const store = configureStore({
    reducer: {
        ui: uiReducer,
        cart: cartReducer
    }
})

console.log(store);

export default store;   