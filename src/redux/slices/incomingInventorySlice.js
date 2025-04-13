// src/redux/slices/incomingInventorySlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk to fetch incoming inventory orders
export const fetchIncomingInventory = createAsyncThunk(
  'incomingInventory/fetchOrders',
  async (_, { rejectWithValue, getState }) => {
    try {
      // Get the token from the state or localStorage (depending on where you're storing it)
      const token = getState().auth.token || localStorage.getItem('token'); // Assuming you store token in auth slice or localStorage

      // Make the API request with the token in the header
      const response = await axios.get("http://localhost:4000/api/inventory/items", {
        headers: {
          Authorization: `Bearer ${token}`, // Attach token to the Authorization header
        },
      });

      return response.data.orders; // Return the orders data if successful
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
    }
  }
);

// Async thunk to log item to inventory
export const logItemToInventory = createAsyncThunk(
  'incomingInventory/logItem',
  async ({ orderID, deliveredQuantity }, { rejectWithValue, getState }) => {
    try {
      // Get the token from the state or localStorage (depending on where you're storing it)
      const token = getState().auth.token || localStorage.getItem('token'); // Assuming you store token in auth slice or localStorage

      // Make the API request with the token in the header
      const response = await axios.post("http://localhost:4000/api/inventory/log", 
        { orderID, deliveredQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to the Authorization header
          },
        }
      );

      return response.data; // Return the response data if successful
    } catch (error) {
      return rejectWithValue(error.response ? error.response.data : { message: 'An error occurred' });
    }
  }
);

const incomingInventorySlice = createSlice({
  name: 'incomingInventory',
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    // Fetch incoming inventory orders
    builder
      .addCase(fetchIncomingInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchIncomingInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload; // Store the fetched orders in state
      })
      .addCase(fetchIncomingInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      })
      // Log item to inventory
      .addCase(logItemToInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(logItemToInventory.fulfilled, (state, action) => {
        state.loading = false;
          console.log("Inventory updated:", action.payload);
          // Display success message here
      })
      .addCase(logItemToInventory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.message;
      });
  },
});

export default incomingInventorySlice.reducer;
