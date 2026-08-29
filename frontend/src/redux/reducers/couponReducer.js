import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  couponCode:[],
};

export const couponReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("couponCreateRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("couponCreateSuccess", (state, action) => {
      state.isLoading = false;
      state.couponCode = action.payload;
      state.success = true;
    })
    .addCase("couponCreateFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })

    .addCase("getAllCouponsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllCouponsSuccess", (state, action) => {
      state.isLoading = false;
      state.coupons = action.payload;
    })
    .addCase("getAllCouponsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("deleteCouponRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteCouponSuccess", (state, action) => {
      state.isLoading = false;
      state.message = action.payload;
    })
    .addCase("deleteCouponFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })

    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});