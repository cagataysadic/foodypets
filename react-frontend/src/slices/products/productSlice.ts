import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Product {
    id: number;
    name: string;
    species: string;
    type: string;
    flavor: string | null;
    dimensions: string | null;
    material: string | null;
    form: string | null;
    description: string;
    price: number;
    image_url: string;
}

export interface ProductsState {
    items: Product[];
    selectedProduct: Product | null,
    status: 'idle' | 'loading' | 'succeeded' | 'failed';
    productStatus: 'idle' | 'loading' | 'succeeded' | 'failed';
    error: string | null;
    productError: string | null;
}

export const fetchProducts = createAsyncThunk<Product[]>(
    'products/fetchProducts',
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const fetchProductById = createAsyncThunk<Product, number>(
    'products/fetchProductById',
    async (productId, { rejectWithValue }) => {
        try {
            const response = await axios.get(`http://localhost:8000/api/products/${productId}`);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

const initialState: ProductsState = {
    items: [],
    selectedProduct: null,
    status: 'idle',
    productStatus: 'idle',
    error: null,
    productError: null
};

const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.items = action.payload;
            })
            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message || null;
            })
            .addCase(fetchProductById.pending, (state) => {
                state.productStatus = 'loading';
            })
            .addCase(fetchProductById.fulfilled, (state, action) => {
                state.productStatus = 'succeeded';
                state.selectedProduct = action.payload;
            })
            .addCase(fetchProductById.rejected, (state, action) => {
                state.productStatus = 'failed';
                state.productError = action.error.message || null;
            });
    }
});

export default productSlice.reducer;