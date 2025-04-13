import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Initial state for inventory request
const initialState = {
  loading: false,
  successMessage: "",
  errorMessage: "",
};

// Redux slice for inventory requests
const inventoryRequestSlice = createSlice({
  name: "inventoryRequest",
  initialState,
  reducers: {
    requestInventory: (state) => {
      state.loading = true;
      state.successMessage = "";
      state.errorMessage = "";
    },
    requestInventorySuccess: (state, action) => {
      state.loading = false;
      state.successMessage = action.payload;
    },
    requestInventoryFailure: (state, action) => {
      state.loading = false;
      state.errorMessage = action.payload;
    },
    resetMessages: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
});

export const {
  requestInventory,
  requestInventorySuccess,
  requestInventoryFailure,
  resetMessages,
} = inventoryRequestSlice.actions;

// Redux thunk for sending inventory request with token from localStorage
export const sendInventoryRequest = (formData) => async (dispatch) => {
  try {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    if (!token) {
      dispatch(requestInventoryFailure("Token not found. Please log in."));
      return;
    }

    // Optionally, decode the token to check for expiry
    const decoded = JSON.parse(atob(token.split(".")[1]));
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      dispatch(requestInventoryFailure("Token expired. Please log in again."));
      localStorage.removeItem("token");
      return;
    }

    dispatch(requestInventory()); // Dispatch loading action

    // Make the API request to create an inventory request
    const response = await axios.post(
      "http://localhost:4000/api/request",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      }
    );

    // If successful, dispatch the success action with the response message
    dispatch(requestInventorySuccess(response.data.message || "Request successfully sent."));
  } catch (error) {
    // If there's an error, dispatch failure action with the error message
    dispatch(requestInventoryFailure(error.response?.data?.message || "An error occurred"));
  }
};

// Reducer export
export default inventoryRequestSlice.reducer;
