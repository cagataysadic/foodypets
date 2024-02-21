import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiInstance from "../../api/api";

export interface OrderItem {
    product_id: number;
    quantity:number;
    price: number;
}

interface OrderState {
    orders: OrderItem[];
    lastUpdated: number;
    loading: boolean;
    error: string | null;
}

interface OrderPayload {
    orders: OrderItem[];
    shippingCost: number;
}


const initialState: OrderState = {
    orders: [],
    lastUpdated: 0,
    loading: false,
    error: null
};

export const postOrderItems = createAsyncThunk<
    OrderItem[],
    OrderPayload,
    { rejectValue: string }
>(
    'order/postOrderItems',
    async (payload, { rejectWithValue }) => {
        const api = apiInstance;
        try {
            const response = await api.post<OrderItem[]>('/orders', payload);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);


const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(postOrderItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(postOrderItems.fulfilled, (state) => {
                state.loading = false;
                state.error = null;
            })
            .addCase(postOrderItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
})

export default orderSlice.reducer;