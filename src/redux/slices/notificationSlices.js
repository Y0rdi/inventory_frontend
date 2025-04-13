import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// **Thunk to Fetch Notifications**
export const fetchNotifications = createAsyncThunk(
  'notifications/fetchNotifications',
  async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      const response = await axios.get('http://localhost:4000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from local storage
        },
      });
      return response.data; // Return notifications data
    } catch (error) {
      console.error('Error fetching notifications:', error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

// **Thunk to Check Empty Status Requests and Create Notifications**
export const checkEmptyStatusAndCreateNotifications = createAsyncThunk(
  'notifications/checkEmptyStatus',
  async () => {
    const token = localStorage.getItem('token'); // Get token from local storage

    try {
      const response = await axios.post('http://localhost:4000/api/notifications/check-empty-status', {}, {
        headers: {
          Authorization: `Bearer ${token}`, // Use token from local storage
        },
      });
      return response.data; // Return success message or other data
    } catch (error) {
      console.error('Error checking empty status and creating notifications:', error);
      throw new Error(error.response ? error.response.data : error.message);
    }
  }
);

// **Initial State for Notifications**
const initialState = {
  notifications: [],
  loading: false,
  error: null,
};

// **Redux Slice for Notifications**
const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.loading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(checkEmptyStatusAndCreateNotifications.fulfilled, (state, action) => {
        // Handle success, maybe update notifications or show a success message
        state.notifications = [...state.notifications, ...action.payload]; // You can adjust how to handle this
      })
      .addCase(checkEmptyStatusAndCreateNotifications.rejected, (state, action) => {
        state.error = action.error.message;
      });
  },
});

// **Exporting the Reducer**
export default notificationsSlice.reducer;
