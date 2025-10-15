// File: app/(Kambaz)/Account/reducer.ts
// Keeps track of who's currently signed in throughout the whole app

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../Database/type";

// Start with nobody signed in
interface AccountState {
    currentUser: User | null;
}

const initialState: AccountState = {
    currentUser: null
};

// Create the account slice to handle sign in and sign out
const accountSlice = createSlice({
    name: "account",
    initialState,
    reducers: {
        // This gets called when someone signs in or signs out
        // Pass in the user object to sign in, or null to sign out
        setCurrentUser: (state, action: PayloadAction<User | null>) => {
            state.currentUser = action.payload;
        }
    }
});

// Export the action so components can use it
export const { setCurrentUser } = accountSlice.actions;

// Export the reducer to add to the store
export default accountSlice.reducer;