// app/Labs/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import helloReducer from "../Lab4/ReduxExamples/HelloRedux/helloReducer";
import counterReducer from "../Lab4/ReduxExamples/CounterRedux/counterReducer";
import addReducer from "../Lab4/ReduxExamples/AddRedux/addReducer";
import todosReducer from "../Lab4/ReduxExamples/todos/todosReducer";

// Configure the Redux store with all our reducers
const store = configureStore({
    reducer: {
        helloReducer,    // Manages hello message state
        counterReducer,  // Manages counter state
        addReducer,      // Manages addition calculation state
        todosReducer,    // Manages todo list state
    },
});

export default store;