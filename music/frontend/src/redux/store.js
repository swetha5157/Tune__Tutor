import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishlistSlice from './cartSlice'
import searchSlice from "./searchSlice"
import selectedItems from "./selectedSlice"
import orderSlice from "./orderSlice"
const store=configureStore({

    reducer:{
        cart:cartSlice,
        search: searchSlice,
        wishlist:wishlistSlice,
        readytobuy:selectedItems,
        order:orderSlice,
    },
});
export default store;