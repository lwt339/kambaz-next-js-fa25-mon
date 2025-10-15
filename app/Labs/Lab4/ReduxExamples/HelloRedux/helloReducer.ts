// File: app/Labs/Lab4/ReduxExamples/HelloRedux/helloReducer.ts
// Simplest Redux example

import { createSlice } from "@reduxjs/toolkit";

// Just a message to display
const initialState = {
    message: "Hello World",
};

const helloSlice = createSlice({
    name: "hello",
    initialState,
    reducers: {}
});

export default helloSlice.reducer;