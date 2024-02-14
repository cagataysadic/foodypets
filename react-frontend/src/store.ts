import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/auth/authSlice';
import registrationReducer from './slices/register/registrationSlice';
import productReducer from './slices/products/productSlice';
import cartReducer from './slices/cart/cartSlice';
import orderReducer from './slices/order/orderSlice';
import profileReducer from './slices/profile/profileSlice';
import contactReducer from './slices/contact/contactSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        registration: registrationReducer,
        products: productReducer,
        cart: cartReducer,
        order: orderReducer,
        user: profileReducer,
        contact: contactReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;