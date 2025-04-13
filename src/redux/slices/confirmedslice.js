import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch confirmed orders
export const fetchConfirmedOrders = createAsyncThunk(
  'confirmed/fetchConfirmedOrders',
  async (_, { rejectWithValue }) => {
    try {
      // Fetch token from localStorage
      const token = localStorage.getItem('token');  // Adjust the key if necessary

      // Make sure token exists before adding to the header
      const headers = token ? { Authorization: `Bearer ${token}` } : {};

      const response = await axios.get("http://localhost:4000/api/confirmedorders", {
        headers: headers,  // Add the token to the request headers
      });

      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Failed to fetch orders');
    }
  }
);

const confirmedSlice = createSlice({
  name: 'confirmed',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchConfirmedOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchConfirmedOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.error = null;
      })
      .addCase(fetchConfirmedOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default confirmedSlice.reducer;
