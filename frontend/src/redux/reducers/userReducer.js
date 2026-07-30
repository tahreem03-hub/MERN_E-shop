
// should not be backend calls also be in reducers for now it is only updating state

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    user: null,
}

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadUserRequest", (state) => {
            state.loading = true;
        })
        .addCase("LoadUserSuccess", (state, action) => {
            state.loading = false;
            state.isAuthenticated = true;
            state.user = action.payload;
        })
        .addCase("LoadUserFail", (state, action) => {
            state.loading = false;
            state.isAuthenticated = false;
            state.error = action.payload;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        })
})