// File: app/Labs/Lab4/ReduxExamples/AddRedux/addReducer.ts
// Reducer that takes parameters

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    sum: 0,
};

interface AddPayload {
    a: number;
    b: number;
}

const addSlice = createSlice({
    name: "add",
    initialState,
    reducers: {
        // Receives a and b through payload
        add: (state, action: PayloadAction<AddPayload>) => {
            state.sum = action.payload.a + action.payload.b;
        },
    },
});

export const { add } = addSlice.actions;
export default addSlice.reducer;