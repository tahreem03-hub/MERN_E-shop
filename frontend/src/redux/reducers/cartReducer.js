import { createReducer } from '@reduxjs/toolkit'

const initialState = {
    isLoading: false,
    cart: JSON.parse(localStorage.getItem('cartItems')) || [],
    error: null,
    success: false
}

export const cartReducer = createReducer(initialState, (builder) => {
    builder
        // Add to Cart
        .addCase("addToCartRequest", (state) => {
            state.isLoading = true
        })
        .addCase("addToCartSuccess", (state, action) => {
            state.isLoading = false
            state.cart = action.payload
            state.success = true
            localStorage.setItem('cartItems', JSON.stringify(state.cart))  // ← MUST HAVE THIS
        })
        .addCase("addToCartFailed", (state, action) => {
            state.isLoading = false
            state.error = action.payload
            state.success = false
        })

        // Remove from Cart
        .addCase("removeFromCartRequest", (state) => {
            state.isLoading = true
        })
        .addCase("removeFromCartSuccess", (state, action) => {
            state.isLoading = false
            state.cart = action.payload
            localStorage.setItem('cartItems', JSON.stringify(state.cart))
        })
        .addCase("removeFromCartFailed", (state, action) => {
            state.isLoading = false
            state.error = action.payload
        })

        // Clear Errors
        .addCase("clearErrors", (state) => {
            state.error = null
        })
})