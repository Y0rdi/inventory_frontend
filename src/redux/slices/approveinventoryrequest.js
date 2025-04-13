import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Retrieve token from localStorage (or from Redux store if you prefer)
const getAuthToken = () => {
  return localStorage.getItem("token"); // Or use Redux store if the token is saved there
};

export const fetchInventoryRequests = createAsyncThunk(
  "inventoryRequests/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get("http://localhost:4000/api/getreq", {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      });
      console.log("API response:", response.data);  // Check the response
      return response.data;
    } catch (error) {
      console.log("API error:", error.response?.data); // Check the error response
      return rejectWithValue(error.response?.data);
    }
  }
);


// Approve an inventory request
export const approveInventoryRequest = createAsyncThunk(
  "inventoryRequests/approve",
  async (requestID, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `http://localhost:4000/api/approve/${requestID}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${getAuthToken()}`, // Add the token here
          },
        }
      );

      return { requestID, ...response.data };
    } catch (error) {
      // Log the full error object for debugging
      console.error("Error approving inventory request:", error);

      // You can also log the error response data, if available
      if (error.response) {
        console.error("Error response:", error.response);
      } else {
        console.error("Error message:", error.message);
      }

      // Return a custom error message to be handled by the reducer
      return rejectWithValue(error.response?.data || 'Error approving request');
    }
  }
);



const inventoryRequestsSlice = createSlice({
  name: "inventoryRequests",
  initialState: {
    requests: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryRequests.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventoryRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.requests = action.payload;
      })
      .addCase(fetchInventoryRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(approveInventoryRequest.fulfilled, (state, action) => {
        state.requests = state.requests.map((req) =>
          req.reqid === action.payload.requestID
            ? { ...req, status: "Approved" }
            : req
        );
      })
      .addCase(approveInventoryRequest.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default inventoryRequestsSlice.reducer;
