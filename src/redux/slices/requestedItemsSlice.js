// src/redux/slices/requestedItemsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchRequestedItems = createAsyncThunk('requestedItems/fetchRequestedItems', async () => {
    const response = await axios.get('https://192.168.185.199/procurement/api/requested-items');
    return response.data;
});

export const approveItem = createAsyncThunk('requestedItems/approveItem', async ({ id, supplier, supplierDetails }) => {
    const response = await axios.post(`https://192.168.185.199/procurement/api/requested-items/${id}/approve`, {
        supplier,
        supplierDetails,
    });
    return response.data;
});

export const declineItem = createAsyncThunk('requestedItems/declineItem', async (id) => {
    await axios.post(`https://192.168.185.199/procurement/api/requested-items/${id}/decline`);
    return id;
});

const requestedItemsSlice = createSlice({
    name: 'requestedItems',
    initialState: {
        items: [],
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchRequestedItems.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchRequestedItems.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload;
            })
            .addCase(fetchRequestedItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(approveItem.fulfilled, (state, action) => {
                const index = state.items.findIndex((item) => item.id === action.payload.id);
                if (index !== -1) {
                    state.items[index] = { ...state.items[index], ...action.payload };
                }
            })
            .addCase(declineItem.fulfilled, (state, action) => {
                state.items = state.items.filter((item) => item.id !== action.payload);
            });
    },
});

export default requestedItemsSlice.reducer;
