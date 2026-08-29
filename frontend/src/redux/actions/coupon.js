import axios from "axios";

export const createCoupon = (couponData) => async (dispatch) => {
  try {
    dispatch({ type: "couponCreateRequest" });

    const { data } = await axios.post(
      `${import.meta.env.VITE_URL}/coupon/create-coupon-code`,
      couponData,
      { withCredentials: true } // needed — route uses isSeller
    );

    dispatch({
      type: "couponCreateSuccess",
      payload: data.couponCode,
    });
  } catch (error) {
    dispatch({
      type: "couponCreateFailed",
      payload: error.response.data.message,
    });
  }
};

export const getAllCoupons = (id) => async (dispatch) => {
  try {
    dispatch({ type: "getAllCouponsRequest" });

    const { data } = await axios.get(`${import.meta.env.VITE_URL}/coupon/get-coupon/${id}`);

    dispatch({
      type: "getAllCouponsSuccess",
      payload: data.couponCodes,
    });
  } catch (error) {
    dispatch({
      type: "getAllCouponsFailed",
      payload: error.response.data.message,
    });
  }
};

export const deleteCoupon = (id) => async (dispatch) => {
  try {
    dispatch({ type: "deleteCouponRequest" });

    const { data } = await axios.delete(
      `${import.meta.env.VITE_URL}/coupon/delete-coupon-code/${id}`,
      { withCredentials: true }
    );

    dispatch({
      type: "deleteCouponSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteCouponFailed",
      payload: error.response.data.message,
    });
  }
};