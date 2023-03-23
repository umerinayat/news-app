import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import AuthService from "../api-services/authService";

// Important Note: this is just for demo. 
// User state is manage through rect state context provider

// initial state
const initialState = { 
    user: {
        name: '',
        token: null
    },
    isLoading: false,
    isSuccess: false,
    errorMessage: ''
};

// user login action
export const userLogin = createAsyncThunk(
    'user/login', async (data, { rejectWithValue }) => {
        try {
            const data = await AuthService.login(data);
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
});

// user Register action
export const userRegister = createAsyncThunk(
    'user/register', async (data, { rejectWithValue }) => {
        try {
            const data = await AuthService.register(data);
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
});

// user logout action
export const userLogout = createAsyncThunk(
    'user/logout', async (data, { rejectWithValue }) => {
        try {
            const data = await AuthService.logout(data);
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
});

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: (builder) => {}
});

export default userSlice;