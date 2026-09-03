import { configureStore } from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'
import { SellerReducer } from './reducers/shopReducer';
import { productReducer } from './reducers/productReducer';
import { eventReducer } from './reducers/eventReducer';
import { couponReducer } from './reducers/couponReducer';
import { cartReducer } from './reducers/cartReducer';
import { wishlistReducer } from './reducers/wishlistReducer';

const Store = configureStore({
    reducer: {
        user: userReducer, // register reducer
        seller: SellerReducer,
        product: productReducer,
        event: eventReducer,
        coupon: couponReducer,
        cart: cartReducer,
        wishlist: wishlistReducer,


    },
})

export default Store;