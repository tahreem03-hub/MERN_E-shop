import {configureStore} from '@reduxjs/toolkit'
import { userReducer } from './reducers/userReducer'

const Store = configureStore({
    reducer: {
        user: userReducer, // register reducer
    },
})

export default Store;