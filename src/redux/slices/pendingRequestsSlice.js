// src/redux/slices/pendingRequestsSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getPendingRequests = createAsyncThunk(
  "pendingRequests/getPending",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get("http://localhost:4000/api/pendingRequests", config);
      return {
        pendingRequests: response.data.pendingRequests,
        pendingCount: response.data.pendingCount,
      };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error fetching pending requests"
      );
    }
  }
);

// Slice
const pendingRequestsSlice = createSlice({
  name: "pendingRequests",
  initialState: {
    loading: false,
    pendingRequests: [],
    pendingCount: 0,
    errorMessage: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPendingRequests.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getPendingRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.pendingRequests = action.payload.pendingRequests;
        state.pendingCount = action.payload.pendingCount;
        state.errorMessage = null;
      })
      .addCase(getPendingRequests.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
      });
  },
});

export default pendingRequestsSlice.reducer;
