// src/store/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiLogin } from '../apis/user';

// --- HÀM ĐỌC TỪ LOCALSTORAGE (An toàn) ---
const getInitialState = () => {
    const storedToken = localStorage.getItem('accessToken');
    const storedUserJSON = localStorage.getItem('currentUser');
    let storedUser = null;

    if (storedUserJSON && storedUserJSON !== 'undefined') {
        try {
            storedUser = JSON.parse(storedUserJSON);
        } catch (e) {
            console.error("Corrupted user data in localStorage, removing it.", e);
            localStorage.removeItem('currentUser');
        }
    }
    
    return {
        isLoggedIn: !!storedToken && !!storedUser,
        currentUser: storedUser,
        token: storedToken,
        loading: false,
        error: null
    };
};


// --- ASYNC ACTION (THUNK) ---
export const login = createAsyncThunk(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const response = await apiLogin(data);
            return response.data; 
        } catch (error) {
            return rejectWithValue(error.response.data);
        }
    }
);

// --- SLICE ---
export const userSlice = createSlice({
    name: 'user',
    initialState: getInitialState(), // Gọi hàm để lấy state ban đầu
    reducers: {
        logout: (state) => {
            localStorage.removeItem('accessToken');
            localStorage.removeItem('currentUser');
            state.isLoggedIn = false;
            state.currentUser = null;
            state.token = null;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                // Log payload để chắc chắn về cấu trúc
                console.log("LOGIN PAYLOAD:", action.payload);

                // Lấy user và token từ payload (dựa trên console log gần nhất của bạn)
                const user = action.payload?.user;
                const token = action.payload?.token;

                // Cập nhật state
                state.loading = false;
                state.isLoggedIn = true;
                state.currentUser = user;
                state.token = token;

                // Chỉ lưu vào localStorage nếu có dữ liệu hợp lệ
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                if (token) {
                    localStorage.setItem('accessToken', token);
                }
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.isLoggedIn = false;
                state.error = action.payload?.message;
                state.token = null;
                state.currentUser = null;
                localStorage.removeItem('accessToken');
                localStorage.removeItem('currentUser');
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;