import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch requested items
export const fetchRequestedItems = createAsyncThunk(
  'requestedItems/fetchRequestedItems',
  async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    if (!token) {
      throw new Error('No token found');
    }

    try {
      const response = await axios.put('http://localhost:4000/api/requests', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data; // Assuming the data is an array of requested items
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

// Approve a purchase request
export const approveRequest = createAsyncThunk(
  'requestedItems/approveRequest',
  async (requestId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    try {
      const response = await axios.post(
        `http://localhost:4000/api/requests/${requestId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // The response should contain the updated request status
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

// Decline a purchase request
export const declineRequest = createAsyncThunk(
  'requestedItems/declineRequest',
  async (requestId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No token found');
    }

    try {
      const response = await axios.put(
        `http://localhost:4000/api/requests/${requestId}/decline`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data; // The response should contain the updated request status
    } catch (error) {
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

const initialState = {
  items: [],
  selectedItem: null,
  actionType: null,
  supplier: '',
  supplierDetails: '',
  loading: false,
  error: null,
};

const requestedItemsSlice = createSlice({
  name: 'requestedItems',
  initialState,
  reducers: {
    setSelectedItem: (state, action) => {
      state.selectedItem = action.payload;
    },
    setActionType: (state, action) => {
      state.actionType = action.payload;
    },
    setSupplier: (state, action) => {
      state.supplier = action.payload;
    },
    setSupplierDetails: (state, action) => {
      state.supplierDetails = action.payload;
    },
    resetModal: (state) => {
      state.selectedItem = null;
      state.actionType = null;
      state.supplier = '';
      state.supplierDetails = '';
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRequestedItems.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchRequestedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRequestedItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(declineRequest.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      });
  },
});

export const {
  setSelectedItem,
  setActionType,
  setSupplier,
  setSupplierDetails,
  resetModal,
} = requestedItemsSlice.actions;

export default requestedItemsSlice.reducer;
