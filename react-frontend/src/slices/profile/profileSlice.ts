import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import apiInstance from '../../api/api';

interface ProfileState {
    name: string;
    email: string;
    address: string;
    password: string;
    newPassword:string;
    confirmPassword: string;
    error: string | null;
    errorMessage: string | null;
    status: 'idle' | 'loading' | 'succeeded' |'failed';
}

const initialState: ProfileState = {
    name: '',
    email: '',
    address: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
    error: null,
    errorMessage: null,
    status: 'idle',
};

export const fetchUser = createAsyncThunk<ProfileState>(
    'user/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const response = await apiInstance.get<ProfileState>('/profile');
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.message);
        }
    }
);

export const updateUser = createAsyncThunk(
    'user/updateUser',
    async (userData: {name: string; email: string; address: string}, {rejectWithValue}) => {
        try {
            const response = await apiInstance.put<ProfileState>('/profile', userData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);

export const updatePassword = createAsyncThunk(
    'user/updatePassword',
    async (passwordData: {password: string; newPassword: string}, {rejectWithValue}) => {
        try {
            const response = await apiInstance.put('/profile/password', passwordData);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response.data.message);
        }
    }
);


const profileSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setName: (state, action: PayloadAction<string>) => {
            state.name = action.payload;
        },
        setEmail: (state, action: PayloadAction<string>) => {
            state.email = action.payload;
        },
        setAddress: (state, action: PayloadAction<string>) => {
            state.address = action.payload;
        },
        setPassword: (state, action: PayloadAction<string>) => {
            state.password = action.payload;
        },
        setNewPassword: (state, action: PayloadAction<string>) => {
            state.newPassword = action.payload;
        },
        setConfirmPassword: (state, action: PayloadAction<string>) => {
            state.confirmPassword = action.payload;
        },
        setErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMessage = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<ProfileState>) => {
                state.status = 'succeeded';
                state.name = action.payload.name;
                state.email = action.payload.email;
                state.address = action.payload.address;
                state.error = null;
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updateUser.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updateUser.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(updateUser.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
            .addCase(updatePassword.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(updatePassword.fulfilled, (state) => {
                state.status = 'succeeded';
                state.error = null;
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as string;
            })
    },
});

export const { setName, setEmail, setAddress, setPassword, setNewPassword, setConfirmPassword, setErrorMessage } = profileSlice.actions;
export default profileSlice.reducer;