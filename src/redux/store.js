import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../redux/slices/userSlice';  // Import the userSlice
import authReducer from '../redux/slices/authSlice';  // Import the authSlice
import supplierReducer from '../redux/slices/supplierSlice';  // Import the supplierSlice
import requestedItemsReducer from '../redux/slices/requestedItemsSlice';  // Import the requestedItemsSlice
import passwordReducer from './slices/passwordSlice';
  

const store = configureStore({
  reducer: {
    user: userReducer, // Handles user data
    auth: authReducer, // Handles authentication state
    supplier: supplierReducer, // Handles supplier communication state
    requestedItems: requestedItemsReducer, // Handles requested items state
    password: passwordReducer,
    requestedItems: requestedItemsReducer,
  },
});

export default store;
