import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';


const BASE_URL = 'https://192.168.185.199';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  // Use the specific API name for fetching users
  const response = await axios.get(`${BASE_URL}/admin`);
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  // Use the generic API endpoint for adding users
  const response = await axios.post(`${BASE_URL}/admin/create`, newUser);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  
  const response = await axios.put(`${BASE_URL}/admin//${updatedUser.id}`, updatedUser);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  
  await axios.delete(`${BASE_URL}/admin//${id}`);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.users.findIndex((user) => user.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      });
  },
});

export default usersSlice.reducer;
