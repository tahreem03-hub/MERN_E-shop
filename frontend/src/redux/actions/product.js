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

export const getAllShopProducts = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "getAllProductsShopRequest"
        })

        const { data } = await axios.get(
            `${import.meta.env.VITE_URL}/product/get-all-products-shop/${id}`
        );

        dispatch({
            type: "getAllProductsShopSuccess",
            payload: data.products,
        });

    } catch (error) {
        dispatch({
            type: "getAllProductsShopFail",
            payload: error.response?.data?.message || error.message,
        });
    }
}

//delete product of a shop
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({
            type: "deleteProductRequest"
        })

        const { data } = await axios.delete(`${import.meta.env.VITE_URL}/product/delete-product/${id}`,
            { withCredentials: true }
        )
        dispatch({
            type: "deleteProductSuccess",
            payload: data.message
        })

    } catch (error) {
        dispatch({
            type: "deleteProductFailed",
            payload: error.response.data.message,
        });
    }
}