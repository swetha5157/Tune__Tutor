import { createSlice } from "@reduxjs/toolkit";

const wishList = createSlice({
  name: "wishlist",
  initialState: {
    items: []
  },
  reducers: {
    addtoWishList: (state, action) => {
      console.log("===> payload", action.payload, state);
      state.items.push(action.payload);
    },
    removeFromWishList: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },
  },
});

export const { addtoWishList, removeFromWishList } = wishList.actions;
export default wishList.reducer;
