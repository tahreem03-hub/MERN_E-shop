import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    isLoading: true,
    success: false,
    products:[],
}

export const productReducer = createReducer(initialState, (builder) => {
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

        // get all products of a shop
        .addCase("getAllProductsShopRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("getAllProductsShopSuccess", (state, action) => {
            state.isLoading = false;
            state.products = action.payload;
        })
        .addCase("getAllProductsShopFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })


         .addCase("deleteProductRequest", (state) => {
            state.isLoading = true;
        })
        .addCase("deleteProductSuccess", (state, action) => {
            state.isLoading = false;
            state.message = action.payload;
        })
        .addCase("deleteProductFail", (state, action) => {
            state.isLoading = false;
            state.error = action.payload;
        })


        .addCase("ClearErrors", (state) => {
            state.error = null;
        })
})