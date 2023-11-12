import { createSlice } from '@reduxjs/toolkit';

const numberSlice = createSlice({
  name: 'number',
  initialState: 0,
  reducers: {
    setNumber: (state, action) => {
      return action.payload;
    },
  },
});

export const { setNumber } = numberSlice.actions;
export default numberSlice.reducer;
