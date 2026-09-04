import axios from 'axios'

export const loadUser = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadUserRequest" });

        const { data } = await axios.get(`${import.meta.env.VITE_URL}/user/getUser`, {
            withCredentials: true,
        });

        dispatch({ type: "LoadUserSuccess", payload: data.user })
    } catch (error) {
        dispatch({
            type: "LoadUserFail",
            payload: error.response?.data?.message || error.message,
        });
    }
}

export const loadSeller = () => async (dispatch) => {
    try {
        dispatch({ type: "LoadSellerRequest" });

        const { data } = await axios.get(`${import.meta.env.VITE_URL}/shop/getSeller`, {
            withCredentials: true,
        });

        dispatch({ type: "LoadSellerSuccess", payload: data.seller })
    } catch (error) {
        dispatch({
            type: "LoadSellerFail",
            payload: error.response?.data?.message || error.message,
        });
    }
}


export const updateUserInfo = (data) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserInfoRequest" });
    
    const config = { withCredentials: true };
    
    const { data: result } = await axios.put(
      `${import.meta.env.VITE_URL}/user/update-user-info`,
      data,
      config
    );
    
    dispatch({
      type: "updateUserInfoSuccess",
      payload: result.user,
    });
    
    return result; 
  } catch (error) {
    const errorMessage = error.response?.data?.message || error.message;
    
    dispatch({
      type: "updateUserInfoFailed",
      payload: errorMessage,
    });
    
    return { error: errorMessage };
  }
};

export const updateAvatar = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateAvatarRequest" });
    
    const config = {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    };
    
    const { data } = await axios.put(
      `${import.meta.env.VITE_URL}/user/update-avatar`,
      formData,
      config
    );
    
    dispatch({
      type: "updateAvatarSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "updateAvatarFailed",
      payload: error.response?.data?.message || error.message,
    });
  }
};


export const addUserAddress = (addressData) => async (dispatch) => {
  try {
    dispatch({ type: 'addUserAddressRequest' })
    const { data } = await axios.put(
      `${import.meta.env.VITE_URL}/user/update-address`,
      addressData,
      { withCredentials: true }
    )
    dispatch({ type: 'addUserAddressSuccess', payload: data.user })
    return { ok: true }
  } catch (error) {
    const message = error.response?.data?.message || error.message
    dispatch({ type: 'addUserAddressFailed', payload: message })
    return { ok: false, error: message }
  }
}

export const deleteUserAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: 'deleteUserAddressRequest' })
    const { data } = await axios.delete(
      `${import.meta.env.VITE_URL}/user/delete-address/${addressId}`,
      { withCredentials: true }
    )
    dispatch({ type: 'deleteUserAddressSuccess', payload: data.user })
    return { ok: true }
  } catch (error) {
    const message = error.response?.data?.message || error.message
    dispatch({ type: 'deleteUserAddressFailed', payload: message })
    return { ok: false, error: message }
  }
}

export const clearErrors = () => (dispatch) => {
    dispatch({ type: "ClearErrors" });
};
