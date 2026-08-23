// should not be backend calls also be in reducers for now it is only updating state
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isSeller: false,
    seller: null,
    isLoading:true,
}

export const SellerReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("LoadSellerRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("LoadSellerSuccess", (state, action) => {
            state.isLoading = false;
            state.isSeller = true;
            state.seller = action.payload;
        })
        .addCase("LoadSellerFail", (state, action) => {
            state.isLoading = false;
            state.isSeller = false;
            state.error = action.payload;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        })
})