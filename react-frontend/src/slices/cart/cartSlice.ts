import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import apiInstance from "../../api/api";

interface CartItem {
    id: number;
    product_id: number;
    quantity: number;
    image: string;
    name: string;
    price: number;
}

interface CartState {
    items: CartItem[];
    lastUpdated: number;
    loading: boolean;
    error: string | null;
}

const initialState: CartState = {
    items: [],
    lastUpdated: 0,
    loading: false,
    error: null
};

export const fetchCartItems = createAsyncThunk<CartItem[], void, {rejectValue: string} >(
    'cart/fetchCartItems',
    async (_, { rejectWithValue }) => {
        const api = apiInstance;
        try {
            const response = await api.get<CartItem[]>('/cart-items');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const addCartItem = createAsyncThunk<CartItem, {product_id: number; quantity: number; }, { rejectValue: string }>(
    'cart/addCartItem',
    async (cartItem, { rejectWithValue }) => {
        const api = apiInstance;
        try {
            const response = await api.post<CartItem>('/cart-items', cartItem);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const deleteCartItem = createAsyncThunk<number, number, { rejectValue: string }>(
    'cart/deleteCartItem',
    async (cartItemId, { rejectWithValue }) => {
        const api = apiInstance;
        try {
            await api.delete(`/cart-items/${cartItemId}`);
            return cartItemId;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const clearCart = createAsyncThunk<void, void, { rejectValue: string }>(
    'cart/clearCart',
    async (_, { rejectWithValue }) => {
        const api = apiInstance;
        try {
            await api.post('/clear-cart');
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCartItems.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
                state.items = action.payload;
                state.loading = false;
            })
            .addCase(fetchCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(addCartItem.fulfilled, (state, action: PayloadAction<CartItem>) => {
                state.lastUpdated = Date.now();
                state.items.push(action.payload);
            })
            .addCase(addCartItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(deleteCartItem.fulfilled, (state, action: PayloadAction<number>) => {
                state.lastUpdated = Date.now();
                state.items = state.items.filter(item => item.id !== action.payload);
            })
            .addCase(deleteCartItem.rejected, (state, action) => {
                state.error = action.payload as string;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.lastUpdated = Date.now();
                state.items = [];
            })
            .addCase(clearCart.rejected, (state, action) => {
                state.error = action.payload as string;
            });
    }
});

export default cartSlice.reducer;