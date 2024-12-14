import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';  // Correct import

// Async thunk for updating password
export const updatePassword = createAsyncThunk(
  'password/updatePassword',
  async ({ newPassword }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Get token from localStorage

      if (!token) {
        return rejectWithValue('No token found. Please log in again.');
      }

      // Decode the token to get the userId
      const decoded = jwtDecode(token);  // Correct function call
      const userId = decoded.userId; // Get the userId from decoded token

      const response = await fetch('http://localhost:4000/api/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, // Attach token to Authorization header
        },
        body: JSON.stringify({ userId, newPassword }), // Send the userId and newPassword
      });

      if (!response.ok) {
        const errorData = await response.json();
        return rejectWithValue(errorData.message || 'Failed to update password');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue('An error occurred while updating the password.');
    }
  }
);

const passwordSlice = createSlice({
  name: 'password',
  initialState: {
    loading: false,
    success: false,
    error: null,
  },
  reducers: {
    resetPasswordState: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.success = false;
        state.error = null;
      })
      .addCase(updatePassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.success = false;
        state.error = action.payload || 'Failed to update password.';
      });
  },
});

export const { resetPasswordState } = passwordSlice.actions;
export default passwordSlice.reducer;
