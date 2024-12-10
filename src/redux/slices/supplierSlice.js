import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async action to send a message to the backend API
export const sendMessage = createAsyncThunk(
  'supplier/sendMessage',
  async (message, { rejectWithValue }) => {
    try {
      const response = await axios.post('https://192.168.185.199/procurement/api/send-message', { message });
      return response.data; // Assuming the API responds with a confirmation message
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to send message');
    }
  }
);

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    messages: [], // List of messages sent
    status: 'idle', // Can be 'idle', 'loading', 'succeeded', 'failed'
    error: null,   // To store any error messages
  },
  reducers: {
    clearMessages: (state) => {
      state.messages = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.messages.push(action.payload); // Add the new message to the list
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export const { clearMessages } = supplierSlice.actions;
export default supplierSlice.reducer;
