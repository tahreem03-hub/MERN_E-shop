export const addToWishlist = (data) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'addToWishlistRequest' })
    
    const { wishlist } = getState().wishlist
    const existingItem = wishlist.find(item => item._id === data._id)
    
    if (existingItem) {
      dispatch({ 
        type: 'addToWishlistFailed', 
        payload: 'Item already in wishlist' 
      })
      return
    }
    
    const updatedWishlist = [...wishlist, data]
    
    dispatch({ 
      type: 'addToWishlistSuccess', 
      payload: updatedWishlist 
    })
    // localStorage saved in reducer
    
  } catch (error) {
    dispatch({ 
      type: 'addToWishlistFailed', 
      payload: error.message 
    })
  }
}

export const removeFromWishlist = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: 'removeFromWishlistRequest' })
    
    const updatedWishlist = getState().wishlist.wishlist.filter(item => item._id !== id)
    
    dispatch({ 
      type: 'removeFromWishlistSuccess', 
      payload: updatedWishlist 
    })
    // localStorage saved in reducer
    
  } catch (error) {
    dispatch({ 
      type: 'removeFromWishlistFailed', 
      payload: error.message 
    })
  }
}