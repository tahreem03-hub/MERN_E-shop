import { createReducer } from '@reduxjs/toolkit'

const initialState = {
  isLoading: false,
  wishlist: JSON.parse(localStorage.getItem('wishlistItems')) || [],
  error: null,
  success: false
}

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    // Add to Wishlist
    .addCase("addToWishlistRequest", (state) => {
      state.isLoading = true
    })
    .addCase("addToWishlistSuccess", (state, action) => {
      state.isLoading = false
      state.wishlist = action.payload
      state.success = true
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist))
    })
    .addCase("addToWishlistFailed", (state, action) => {
      state.isLoading = false
      state.error = action.payload
      state.success = false
    })

    // Remove from Wishlist
    .addCase("removeFromWishlistRequest", (state) => {
      state.isLoading = true
    })
    .addCase("removeFromWishlistSuccess", (state, action) => {
      state.isLoading = false
      state.wishlist = action.payload
      localStorage.setItem('wishlistItems', JSON.stringify(state.wishlist))
    })
    .addCase("removeFromWishlistFailed", (state, action) => {
      state.isLoading = false
      state.error = action.payload
    })

    // Clear Errors
    .addCase("clearErrors", (state) => {
      state.error = null
    })
})