import { createReducer } from "@reduxjs/toolkit";

const initialState ={
    isLoading:true,
    success:false,
}

export const productReducer=createReducer(initialState, (builder) => {
    builder
        .addCase("CreateProductRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("CreateProductSuccess", (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.product = action.payload;
        })
        .addCase("CreateProductFail", (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.error = action.payload;
        })
        .addCase("ClearErrors", (state) => {
            state.error = null;
        })
})