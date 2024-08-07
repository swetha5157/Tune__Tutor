import { createSlice } from "@reduxjs/toolkit";

const orderSlice=createSlice({
    name:"order",
    initialState:{
        items:[],
    },
    reducers:{
        addToOrder:(state,action)=>{
            state.items.push(...action.payload);
        },
    },
})

export const{addToOrder} =orderSlice.actions;
export default orderSlice.reducer;