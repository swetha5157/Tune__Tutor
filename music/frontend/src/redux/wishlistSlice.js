import { createSlice } from "@reduxjs/toolkit";

const wishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    items: []
  },
  reducers: {
    setWishlist: (state, action) => {
      state.items = action.payload;
    },
    addtoWishList: (state, action) => {
      console.log("===> payload", action.payload, state);
      state.items.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addtoWishList, removeFromWishList ,setWishlist} = wishListSlice.actions;
export default wishListSlice.reducer;
