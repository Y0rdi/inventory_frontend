// src/redux/slices/purchaseRequestsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to fetch department requests
export const fetchDepartmentRequests = createAsyncThunk(
  "purchaseRequests/fetchDepartmentRequests",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      console.log("Token:", token); // Debug log to ensure token is retrieved

      const response = await axios.get(
        "http://localhost:4000/api/department",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.departmentRequests;
    } catch (error) {
      return rejectWithValue(
        error.response ? error.response.data : error.message
      );
    }
  }
);

// Async thunk to create a purchase request
export const createPurchaseRequest = createAsyncThunk(
  "purchaseRequests/create",
  async (requestData, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      console.log("Token:", token); // Debug log to ensure token is retrieved

      const response = await axios.post(
        "http://localhost:4000/api/purchase-request",
        requestData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.message;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error creating purchase request"
      );
    }
  }
);

const purchaseRequestSlice = createSlice({
  name: "purchaseRequests",
  initialState: {
    requests: [], // For fetched requests
    loading: false,
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
      // Handle fetchDepartmentRequests
      .addCase(fetchDepartmentRequests.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(fetchDepartmentRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
        console.log("Fetched department requests:", JSON.stringify(action.payload, null, 2));
      })
      .addCase(fetchDepartmentRequests.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      })
      // Handle createPurchaseRequest
      .addCase(createPurchaseRequest.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
      })
      .addCase(createPurchaseRequest.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Success message for creation
        state.errorMessage = null;
      })
      .addCase(createPurchaseRequest.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload; // Error message for creation
      });
  },
});

export const { resetMessages } = purchaseRequestSlice.actions;

// Selectors
export const selectRequests = (state) => state.purchaseRequest.requests;
export const selectLoading = (state) => state.purchaseRequest.loading;
export const selectError = (state) => state.purchaseRequest.error;

export default purchaseRequestSlice.reducer;
