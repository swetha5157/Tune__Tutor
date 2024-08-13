import {createSlice} from "@reduxjs/toolkit";

const userSlice=createSlice({
    name:'users',
    initialState:{
        userDetails:null,   
        role:'user',
    },
    reducers:{
        setUserDetails:(state,action)=>{
            state.userDetails=action.payload;
       },
       setUserRole:(state,action)=>{
        state.role=action.payload;
       }
    }
});
export const { setUserDetails, setUserRole } = userSlice.actions;
export default userSlice.reducer;