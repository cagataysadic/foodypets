import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface RegistrationState {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    address: string;
    errorMessage: string | null;
    status: 'idle' | 'loading' | 'succeeded' |'failed';
}

const initialState: RegistrationState = {
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    errorMessage: null,
    status: 'idle',
};

export const registerUser = createAsyncThunk(
    'registration/registerUser',
    async (userData: { name: string; email: string; password: string; address: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/register', userData);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data);
        }
    }
);

export const loginUser = createAsyncThunk(
    'registration/loginUser',
    async (userData: { email: string; password: string; }, { rejectWithValue }) => {
        try {
            const response = await axios.post('http://localhost:8000/api/login', userData);
            return response.data
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

const registrationSlice = createSlice({
    name: 'registration',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string | null>) => {
            state.errorMessage = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerUser.pending, (state) => {
                state.status = 'loading';
                state.errorMessage = null;
            })
            .addCase(registerUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.errorMessage = null;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload as string;
            })
            .addCase(loginUser.pending, (state) => {
                state.status = 'loading';
                state.errorMessage = null;
            })
            .addCase(loginUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.errorMessage = null;
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.status = 'failed';
                state.errorMessage = action.payload as string;
            })
    },
});

export const { setName, setEmail, setPassword, setConfirmPassword, setAddress, setErrorMessage } = registrationSlice.actions;
export default registrationSlice.reducer;