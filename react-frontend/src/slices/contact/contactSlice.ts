import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface RegistrationState {
    name: string;
    email: string;
    message: string;
    errorMessage: string | null;
    status: 'idle' | 'loading' | 'succeeded' |'failed';
}

const initialState: RegistrationState = {
    name: '',
    email: '',
    message: '',
    errorMessage: '',
    status: 'idle',
};

export const contactUser = createAsyncThunk(
    'contact/contactUser',
    async (contactData: { name: string; email: string; message: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/contact', contactData);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(contactUser.pending, (state) => {
                state.status = 'loading';
                state.errorMessage = null;
            })
            .addCase(contactUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.errorMessage = null;
            })
            .addCase(contactUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload as string;
            })
    },
});

export const { setName, setEmail, setMessage, setErrorMessage } = contactSlice.actions;
export default contactSlice.reducer;