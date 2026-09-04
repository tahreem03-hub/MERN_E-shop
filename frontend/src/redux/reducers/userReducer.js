
// should not be backend calls also be in reducers for now it is only updating state

import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  success: false,
  message: null,
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


    // Update User Info
    .addCase("updateUserInfoRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserInfoSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    })
    .addCase("updateUserInfoFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })

    // Update Avatar
    .addCase("updateAvatarRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateAvatarSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
      state.success = true;
    })
    .addCase("updateAvatarFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    })


.addCase('addUserAddressRequest', (state) => { state.error = null })
.addCase('addUserAddressSuccess', (state, action) => { state.user = action.payload })
.addCase('addUserAddressFailed', (state, action) => { state.error = action.payload })

.addCase('deleteUserAddressRequest', (state) => { state.error = null })
.addCase('deleteUserAddressSuccess', (state, action) => { state.user = action.payload })
.addCase('deleteUserAddressFailed', (state, action) => { state.error = action.payload })

    // Clear Errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    })
    .addCase("clearMessages", (state) => {
      state.success = false;
      state.message = null;
    });
})