import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';  // Import the userSlice
import authReducer from '../redux/slices/authSlice';  // Import the authSlice

const store = configureStore({
  reducer: {
    user: userReducer, // Handle user data
    auth: authReducer, // Handle authentication state
  },
});

export default store;
