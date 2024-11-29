// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Thunk for handling login action
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', { username, password });
      return response.data; // Assumes API returns user data including token
    } catch (error) {
      return rejectWithValue(error.response.data.message);
    }
  }
);

// Create slice for auth state
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    // Load user and token from localStorage if available
    user: JSON.parse(localStorage.getItem('user')) || null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('user'); // Remove user data from localStorage on logout
      localStorage.removeItem('token'); // Remove token from localStorage on logout
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user data to localStorage
      localStorage.setItem('token', action.payload.token); // Save token to localStorage
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        localStorage.setItem('user', JSON.stringify(action.payload.user)); // Save user data to localStorage
        localStorage.setItem('token', action.payload.token); // Save token to localStorage
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, setUser } = authSlice.actions;
export default authSlice.reducer;
