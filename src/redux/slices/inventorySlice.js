import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch inventory
export const fetchInventory = createAsyncThunk(
  "inventory/fetchInventory",
  async (newItem, { rejectWithValue }) => {
    try {
        // Get the token from localStorage
        const token = localStorage.getItem("token");
        if (!token) {
          throw new Error("Token is missing");
        }
  
      const response = await axios.get("http://localhost:4000/api/", {
        headers: {
          Authorization: `Bearer ${token}`,  // Pass the token as Bearer token
        },
      });
      return response.data; // Assumes response contains an array of inventory items
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Add inventory item
export const addInventory = createAsyncThunk(
  "inventory/addInventory",
  async (newItem, { rejectWithValue }) => {
    try {
      // Get the token from localStorage
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await axios.post(
        "http://localhost:4000/inventory/add",
        newItem,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in header
          },
        }
      );
      return response.data; // Assumes response contains a success message and ID
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Update inventory threshold
export const updateThreshold = createAsyncThunk(
  "inventory/updateThreshold",
  async ({ threshold }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      // Set the inventoryID to 1 in the URL to update the threshold
      const id = 1; // Static ID for the item you want to update

      const response = await axios.put(
        `http://localhost:4000/inventory/threshold/${id}`,
        { threshold },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return { id, threshold }; // Return the ID and updated threshold
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Log incoming inventory item
export const logIncomingItem = createAsyncThunk(
  "inventory/logIncomingItem",
  async ({ orderID, deliveredQuantity }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("Token is missing");
      }

      const response = await axios.post(
        "http://localhost:4000/api/inventory/log",
        { orderID, deliveredQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data; // Expecting success message
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);

// Inventory slice
const inventorySlice = createSlice({
  name: "inventory",
  initialState: {
    items: [],
    loading: false,
    logging: false, // Added for logging incoming items
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch inventory items
      .addCase(fetchInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.map((item, index) => ({
          ...item,
          inventoryID: index, // Add a unique identifier for rendering
        }));
      })
      .addCase(fetchInventory.rejected, (state) => {
        state.loading = false;
      })
      // Add inventory item
      .addCase(addInventory.pending, (state) => {
        state.loading = true;
      })
      .addCase(addInventory.fulfilled, (state, action) => {
        state.loading = false;
        state.items.push(action.payload);
      })
      .addCase(addInventory.rejected, (state) => {
        state.loading = false;
      })
      // Update inventory threshold
      .addCase(updateThreshold.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateThreshold.fulfilled, (state, action) => {
        state.loading = false;
        const { id, threshold } = action.payload;
        const itemIndex = state.items.findIndex((item) => item.inventoryID === id);
        if (itemIndex !== -1) {
          state.items[itemIndex].threshold = threshold;
        }
      })
      .addCase(updateThreshold.rejected, (state) => {
        state.loading = false;
      })
      // Log incoming item
      .addCase(logIncomingItem.pending, (state) => {
        state.logging = true;
      })
      .addCase(logIncomingItem.fulfilled, (state) => {
        state.logging = false;
      })
      .addCase(logIncomingItem.rejected, (state) => {
        state.logging = false;
      });
  },
});

export default inventorySlice.reducer;
