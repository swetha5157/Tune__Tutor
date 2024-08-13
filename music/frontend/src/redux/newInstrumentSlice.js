// redux/newInstrumentSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { instruments } from "../data";

const newInstrumentSlice = createSlice({
  name: 'addins',
  initialState: {
    instruments: instruments,
  },
  reducers: {
    addInstrument: (state, action) => {
      state.instruments = [...state.instruments, action.payload];
    },
    deleteInstrument:(state,action)=>{
        state.instruments = state.instruments.filter(
            instrument => instrument.id !== action.payload
          );
    },
    modifyInstrument: (state, action) => {
        const { id, updates } = action.payload;
        state.instruments = state.instruments.map(instrument =>
          instrument.id === id ? { ...instrument, ...updates } : instrument
        );
  },
}
});

export default newInstrumentSlice.reducer;
export const { addInstrument,deleteInstrument,modifyInstrument } = newInstrumentSlice.actions;
