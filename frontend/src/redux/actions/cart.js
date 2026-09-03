export const addToCart = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'addToCartRequest' })
    
    // Check if exists
    const exists = getState().cart.cart.find(item => item._id === data._id)
    let updatedCart
    
    if (exists) {
      // Update existing
      updatedCart = getState().cart.cart.map(item => 
        item._id === data._id ? data : item
      )
    } else {
      // Add new
      updatedCart = [...getState().cart.cart, data]
    }
    
    dispatch({ type: 'addToCartSuccess', payload: updatedCart })
    // localStorage is saved in reducer success case
    
  } catch (error) {
    dispatch({ type: 'addToCartFailed', payload: error.message })
  }
}

export const removeFromCart = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'removeFromCartRequest' })
    
    const updatedCart = getState().cart.cart.filter(item => item._id !== id)
    
    dispatch({ 
      type: 'removeFromCartSuccess', 
      payload: updatedCart 
    })
    // localStorage saved in reducer
    
  } catch (error) {
    dispatch({ 
      type: 'removeFromCartFailed', 
      payload: error.message 
    })
  }
}