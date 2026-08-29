import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { SellerReducer } from './reducers/shopReducer';
import { productReducer } from './reducers/productReducer';
import { eventReducer } from './reducers/eventReducer';

const Store = configureStore({
    reducer: {
        user: userReducer, // register reducer
        seller: SellerReducer,
        product: productReducer,
        event: eventReducer,
    },
})

export default Store;