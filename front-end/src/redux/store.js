import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import cartReducer from './cartSlice';
import adminReducer from './adminSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        cart: cartReducer,
        admin: adminReducer
    }
})

export default store