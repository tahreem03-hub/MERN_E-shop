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



export const clearErrors = () => (dispatch) => {
    dispatch({ type: "ClearErrors" });
};
