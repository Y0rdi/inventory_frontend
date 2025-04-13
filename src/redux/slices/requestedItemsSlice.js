import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Helper function to get the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token");
};

// Async thunk to fetch all requested items
export const getAllRequestedItems = createAsyncThunk(
  "requestedItems/getAll",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Fetch token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("http://localhost:4000/api/requests", config);
      return response.data.purchaseRequests; // Return the list of requested items
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching requested items"
      );
    }
  }
);

// Async thunk to approve a request
export const approveRequest = createAsyncThunk(
  "requestedItems/approve",
  async ({ requestID, supplierID, note,itemDetails,quantity }, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Fetch token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://localhost:4000/api/approve",
        { requestID, supplierID, note,itemDetails,quantity },
        config // Include the headers in the request
      );

      return { requestID, message: response.data.message };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error approving request"
      );
    }
  }
);

// Async thunk to decline a request
export const declineRequest = createAsyncThunk(
  "requestedItems/decline",
  async (requestID, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Fetch token from localStorage
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.put(
        "http://localhost:4000/api/decline",
        { requestID },
        config // Include the headers in the request
      );

      return { requestID, message: response.data.message }; // Return success message and requestID
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error declining request"
      );
    }
  }
);

// Slice definition
const requestedItemsSlice = createSlice({
  name: "requestedItems",
  initialState: {
    loading: false,
    requestedItems: [],
    successMessage: null,
    errorMessage: null,
  },
  reducers: {
    resetMessages(state) {
      state.successMessage = null;
      state.errorMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all requested items
      .addCase(getAllRequestedItems.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(getAllRequestedItems.fulfilled, (state, action) => {
        state.loading = false;
        state.requestedItems = action.payload; // Store the fetched requested items
        state.errorMessage = null;
      })
      .addCase(getAllRequestedItems.rejected, (state, action) => {
        state.loading = false;
        state.requestedItems = [];
        state.errorMessage = action.payload; // Error message
      })
      // Approve request
      .addCase(approveRequest.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(approveRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.requestedItems = state.requestedItems.filter(
          (item) => item.id !== action.payload.requestID
        ); // Remove approved request
      })
      .addCase(approveRequest.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Decline request
      .addCase(declineRequest.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(declineRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload.message;
        state.requestedItems = state.requestedItems.filter(
          (item) => item.id !== action.payload.requestID
        ); // Remove declined request
      })
      .addCase(declineRequest.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export const { resetMessages } = requestedItemsSlice.actions;

export default requestedItemsSlice.reducer;
