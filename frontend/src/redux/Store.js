import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { SellerReducer } from './reducers/shopReducer';

const Store = configureStore({
    reducer: {
        user: userReducer, // register reducer
        seller: SellerReducer,
    },
})

export default Store;