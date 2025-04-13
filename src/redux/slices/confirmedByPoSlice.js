// redux/slices/confirmedByPoSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to mark the order as delivered
export const markOrderAsDelivered = createAsyncThunk(
  'confirmedByPo/markOrderAsDelivered',
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/deliver', // Update the API URL
        { orderID: orderId },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`, // Fetch token from localStorage
          },
        }
      );
      return response.data.order;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to mark the order as delivered');
    }
  }
);

const confirmedByPoSlice = createSlice({
  name: 'confirmedByPo',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(markOrderAsDelivered.pending, (state) => {
        state.loading = true;
      })
      .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.map(order =>
          order.id === action.payload.id ? { ...order, status: 'delivered' } : order
        );
        state.error = null;
      })
      .addCase(markOrderAsDelivered.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default confirmedByPoSlice.reducer;
