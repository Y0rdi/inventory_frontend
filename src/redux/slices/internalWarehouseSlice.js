import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Helper function to get the token from localStorage
const getAuthToken = () => {
    return localStorage.getItem("token");
  };
export const fetchOrders = createAsyncThunk('internalWarehouse/fetchOrders', async (_, { getState }) => {
    try {
      const token = getAuthToken();
      console.log('Token:', token);
  
      if (!token) {
        throw new Error('No token found');
      }
  
      const response = await axios.get("http://localhost:4000/api/warehouse_internalreq", {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      console.log('Orders response:', response.data);
      return response.data.orders;
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      throw new Error(error.response?.data?.message || error.message || 'Error fetching orders');
    }
  });
  
  
  
const internalWarehouseSlice = createSlice({
  name: 'internalWarehouse',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default internalWarehouseSlice.reducer;
