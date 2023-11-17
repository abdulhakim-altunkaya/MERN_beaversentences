import { createSlice } from "@reduxjs/toolkit";

const slicePair = createSlice({
    name: "pair",
    initialState: "",
    reducers: {
        setPair: (state, action) => {
            return action.payload;
        },
    },
});

export const { setPair } = slicePair.actions;
export default slicePair.reducer;