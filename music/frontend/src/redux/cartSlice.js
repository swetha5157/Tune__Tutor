/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit"
const cartSlice=createSlice({
    name:"cart",
    initialState:{
        items:[]
    },
    reducers:{
        addToCart:(state,action)=>{
            console.log('')
            const existingItem=state.items.find(item=>item.id===action.payload.id);
            if(existingItem) existingItem.quantity+=1;
            else state.items.push({...action.payload,quantity:1});
        },
        incrementItem:(state,action)=>{
            //using find
            const selectedItem=state.items.find(
                (item)=>item.id===action.payload.id
            );
            selectedItem.quantity+=1;

            /* using map
          state.items=  state.items.map((item)=>{
                if(item.id===action.payload.id){
                    return({...item,quantity:item.quantity+1});
                }else{
                    return item;
                }
            })
                */
        },
        decrementItem:(state,action)=>{
            const selectedItem=state.items.find(
                (item)=>item.id===action.payload.id
            );
            if(selectedItem.quantity===1)  selectedItem.quantity=1;
            else selectedItem.quantity-=1;
        },
        removeFromCart:(state,action)=>{
            state.items = state.items.filter(
                (item) => item.id !== action.payload.id
              );

        }
    },
})
export const { addToCart ,incrementItem, decrementItem, removeFromCart} = cartSlice.actions;
export default cartSlice.reducer;