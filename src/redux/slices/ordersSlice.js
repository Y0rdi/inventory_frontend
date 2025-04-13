import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Utility function to retrieve the authorization token
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Fetch orders for the supplier
export const fetchOrdersForSupplier = createAsyncThunk(
  'orders/fetchOrdersForSupplier',
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const response = await axios.get(
        'http://localhost:4000/api/orders', // Replace with your backend fetch orders endpoint
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.orders; // Return the fetched orders
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to fetch orders');
    }
  }
);

// Confirm order action
export const confirmOrder = createAsyncThunk(
  'orders/confirmOrder',
  async ({ orderID , deliveryInfo, deliveryDate  }, { rejectWithValue }) => {
    try {
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authorization token not found');
      }

      const response = await axios.post(
        'http://localhost:4000/api/confirm', // Replace with your backend confirm order endpoint
        { orderID, deliveryInfo, deliveryDate },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.order; // Return updated order data
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to confirm order');
    }
  }
);

// Mark order as delivered action
// Mark order as delivered action
export const markOrderAsDelivered = createAsyncThunk(
  'orders/markOrderAsDelivered',
  async ({ orderID, supplierID }, { rejectWithValue }) => {
    console.log("supplier",supplierID)
    try {
      // Get the authentication token
      const token = getAuthToken();
      if (!token) {
        throw new Error('Authorization token not found');
      }

      // Check if supplierID is provided
      if (!supplierID) {
        throw new Error('Supplier ID is required');
      }

      const response = await axios.post(
        'http://localhost:4000/api/deliver', // Replace with your backend mark delivered endpoint
        { orderID, supplierID }, // Pass orderID and supplierID
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.order; // Return the updated order data
    } catch (error) {
      // Return a descriptive error message in case of failure
      return rejectWithValue(error.response?.data?.message || error.message || 'Failed to mark order as delivered');
    }
  }
);



const ordersSlice = createSlice({
  name: 'orders',
  initialState: {
    orders: [],
    loading: false,
    error: null,
    confirmLoading: false,
    confirmError: null,
    deliveredLoading: false,
    deliveredError: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch orders for the supplier
    builder
      .addCase(fetchOrdersForSupplier.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrdersForSupplier.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Set orders to the fetched data
      })
      .addCase(fetchOrdersForSupplier.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      
      // Confirm order
      .addCase(confirmOrder.pending, (state) => {
        state.confirmLoading = true;
        state.confirmError = null;
      })
      .addCase(confirmOrder.fulfilled, (state, action) => {
        state.confirmLoading = false;

        // Update the order in the state with the confirmed status
        const updatedOrderIndex = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (updatedOrderIndex !== -1) {
          state.orders[updatedOrderIndex] = action.payload; // Replace with the updated order
        }
      })
      .addCase(confirmOrder.rejected, (state, action) => {
        state.confirmLoading = false;
        state.confirmError = action.payload;
      })

      // Mark order as delivered
      .addCase(markOrderAsDelivered.pending, (state) => {
        state.deliveredLoading = true;
        state.deliveredError = null;
      })
      .addCase(markOrderAsDelivered.fulfilled, (state, action) => {
        state.deliveredLoading = false;

        // Update the order in the state with the delivered status
        const updatedOrderIndex = state.orders.findIndex(
          (order) => order.id === action.payload.id
        );
        if (updatedOrderIndex !== -1) {
          state.orders[updatedOrderIndex] = action.payload; // Replace with the updated order
        }
      })
      .addCase(markOrderAsDelivered.rejected, (state, action) => {
        state.deliveredLoading = false;
        state.deliveredError = action.payload;
      });
  },
});

export default ordersSlice.reducer;
