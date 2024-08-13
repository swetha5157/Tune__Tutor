import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import wishListSlice from './wishlistSlice'
import searchSlice from "./searchSlice"
import selectedItems from "./selectedSlice"
import orderSlice from "./orderSlice"
import newInstrumentSlice from "./newInstrumentSlice"
import userSlice from "./userSlice"
const store=configureStore({

    reducer:{
        cart:cartSlice,
        search: searchSlice,
        wishlist:wishListSlice,
        readytobuy:selectedItems,
        order:orderSlice,
        addins:newInstrumentSlice,
        users:userSlice,
    },
});
export default store;