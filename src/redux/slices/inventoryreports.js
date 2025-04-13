import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Function to retrieve the token from localStorage
const getAuthToken = () => {
  return localStorage.getItem("token"); // Assumes token is stored with the key 'token'
};

export const fetchDashboardStats = createAsyncThunk(
  "inventory/fetchDashboardStats",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Get the token from localStorage
      const response = await axios.get("http://localhost:4000/api/dashboard/stats", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInventoryStatusDistribution = createAsyncThunk(
  "inventory/fetchInventoryStatusDistribution",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Get the token from localStorage
      const response = await axios.get("http://localhost:4000/api/status-distribution", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchInventoryUsageReport = createAsyncThunk(
  "inventory/fetchInventoryUsageReport",
  async (_, { rejectWithValue }) => {
    try {
      const token = getAuthToken(); // Get the token from localStorage
      const response = await axios.get("http://localhost:4000/api/usage-report", {
        headers: {
          Authorization: `Bearer ${token}`, // Pass token in the Authorization header
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const inventoryreportSlice = createSlice({
  name: "inventoryreport",
  initialState: {
    dashboardStats: null,
    statusDistribution: { labels: [], data: [] },
    usageReport: { labels: [], data: [] },
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardStats.fulfilled, (state, action) => {
        state.dashboardStats = action.payload;
      })
      .addCase(fetchInventoryStatusDistribution.fulfilled, (state, action) => {
        state.statusDistribution = action.payload;
      })
      .addCase(fetchInventoryUsageReport.fulfilled, (state, action) => {
        state.usageReport = action.payload;
      });
  },
});

export default inventoryreportSlice.reducer;
