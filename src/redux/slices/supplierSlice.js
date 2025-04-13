// src/redux/slices/supplierSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Fetch suppliers from the API
export const fetchSuppliers = createAsyncThunk('suppliers/fetchSuppliers', async () => {
  const response = await axios.get('http://localhost:4000/admin/suppliers'); // Update with your actual API endpoint
  return response.data;
});

const supplierSlice = createSlice({
  name: 'supplier',
  initialState: {
    suppliers: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSuppliers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.suppliers = action.payload;
      })
      .addCase(fetchSuppliers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default supplierSlice.reducer;
