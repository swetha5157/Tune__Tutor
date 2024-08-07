import { createSlice } from "@reduxjs/toolkit";
const selectedItems=createSlice({
    name:"readytobuy",
    initialState:{
        items:[],
    },
    reducers:{
        toggledItems:(state,action)=>{
            const index=state.items.indexOf(action.payload);
            if(index==-1) state.items.push(action.payload);
            else state.items.splice(index,1);
        },

        clearSelectedItems:(state)=>{
            state.items=[]
        }
    }
})

export const {toggledItems,clearSelectedItems}=selectedItems.actions;
export default selectedItems.reducer;