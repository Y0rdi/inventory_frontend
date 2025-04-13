import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async thunk to update the password
export const updatePassword = createAsyncThunk(
  "updatePassword/update",
  async ({ userID, newPassword }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/update-password", // API endpoint
        { userID, newPassword }
      );
      return response.data.message; // Return success message
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Error updating password"
      );
    }
  }
);

// Slice
const updatePasswordSlice = createSlice({
  name: "updatePassword",
  initialState: {
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
      .addCase(updatePassword.pending, (state) => {
        state.loading = true;
        state.successMessage = null;
        state.errorMessage = null;
        console.log("Password update request in progress..."); // Log for pending state
      })
      .addCase(updatePassword.fulfilled, (state, action) => {
        state.loading = false;
        state.successMessage = action.payload; // Success message
        state.errorMessage = null;
        console.log("Password updated successfully:", action.payload); // Log success
      })
      .addCase(updatePassword.rejected, (state, action) => {
        state.loading = false;
        state.successMessage = null;
        state.errorMessage = action.payload; // Error message
        console.error("Error updating password:", action.payload); // Log error
      });
  },
});

export const { resetMessages } = updatePasswordSlice.actions;

export default updatePasswordSlice.reducer;
