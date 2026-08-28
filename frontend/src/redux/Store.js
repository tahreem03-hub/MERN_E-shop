import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { SellerReducer } from './reducers/shopReducer';
import { productReducer } from './reducers/productReducer';

const Store = configureStore({
    reducer: {
        user: userReducer, // register reducer
        seller: SellerReducer,
        product:productReducer,
        
    },
})

export default Store;