import axios from 'axios'

export const createProduct = (newForm) => async (dispatch) => {
    try {
        dispatch({ type: "CreateProductRequest" });

        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }

        const { data } = await axios.post(`${import.meta.env.VITE_URL}/product/create-product`,
            newForm,
            config,
        );

        dispatch({
            type: "CreateProductSuccess",
            payload: data.product,
        })
    } catch (error) {
        dispatch({
            type: "CreateProductFail",
            payload: error.response.data.message,
        })
    }
}