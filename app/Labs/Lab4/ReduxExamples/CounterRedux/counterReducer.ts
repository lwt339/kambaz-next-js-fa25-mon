// File: app/Labs/Lab4/ReduxExamples/CounterRedux/counterReducer.ts
// Counter reducer with increment/decrement

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 0,
};

const counterSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        // Increase count by 1
        increment: (state) => {
            state.count = state.count + 1;
        },

        // Decrease count by 1
        decrement: (state) => {
            state.count = state.count - 1;
        },
    },
});

export const { increment, decrement } = counterSlice.actions;
export default counterSlice.reducer;