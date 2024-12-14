import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// API endpoint
const BASE_URL = 'http://localhost:4000/api';

// Async action to handle login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/login`, { username, password });
      const { token, user } = response.data;

      // Store token in local storage
      localStorage.setItem('token', token);

      // Check if the username and password are the same (as per your requirements)
      if (user.username === username && user.password === password) {
        // Return data with needsPasswordUpdate flag
        return { token, user, needsPasswordUpdate: true };
      }

      // Return data without the needsPasswordUpdate flag if login is normal
      return { token, user, needsPasswordUpdate: false };
    } catch (error) {
      console.error('Login error:', error.response);
      return rejectWithValue(error.response?.data?.message || 'Something went wrong');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
    needsPasswordUpdate: false, // New field to store if password update is needed
  },
  reducers: {
    setUser: (state, action) => {
      const { user } = action.payload;
      state.user = user;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.needsPasswordUpdate = false; // Reset this when logging out
      localStorage.removeItem('token'); // Remove token from local storage on logout
    },
    setNeedsPasswordUpdate: (state, action) => {
      state.needsPasswordUpdate = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action) => {
        const { user, needsPasswordUpdate } = action.payload;
        state.user = user;
        state.isAuthenticated = true;
        state.needsPasswordUpdate = needsPasswordUpdate; // Store the flag
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.error = action.payload;
        state.isAuthenticated = false;
      });
  }
});

export const { setUser, logoutUser, setNeedsPasswordUpdate } = authSlice.actions;

export default authSlice.reducer;
