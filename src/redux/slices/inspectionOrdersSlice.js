import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch inspection orders from the backend
export const fetchInspectionOrders = createAsyncThunk(
  'inspectionOrders/fetchInspectionOrders',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('http://localhost:4000/api/inspection/orders', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,  // Using the token
        },
      });
      return response.data.orders;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch inspection orders');
    }
  }
);

// Inspect an order (approve or reject) with a note
export const inspectOrder = createAsyncThunk(
  'inspectionOrders/inspectOrder',
  async ({ orderID, status, note }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        'http://localhost:4000/api/inspection/inspect', //io Ensure the endpoint is correct
        { orderID, status, note },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,  // Using the token
          },
        }
      );
      return response.data; // Returning success response from API
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to inspect the order');
    }
  }
);

const inspectionOrdersSlice = createSlice({
  name: 'inspectionOrders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    inspectionResult: null, // Will store the result of inspection (success or error)
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Handling fetchInspectionOrders
      .addCase(fetchInspectionOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInspectionOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchInspectionOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handling inspectOrder
      .addCase(inspectOrder.pending, (state) => {
        state.loading = true;
        state.inspectionResult = null; // Reset inspection result
      })
      .addCase(inspectOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.inspectionResult = { success: true, message: `Order ${action.payload.status} successfully!` };
        // Update the inspected order status in state
        const updatedOrder = action.payload.order;
        state.orders = state.orders.map((order) =>
          order.orderID === updatedOrder.orderID ? updatedOrder : order
        );
      })
      .addCase(inspectOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.inspectionResult = { success: false, message: action.payload };
      });
  },
});

export default inspectionOrdersSlice.reducer;
