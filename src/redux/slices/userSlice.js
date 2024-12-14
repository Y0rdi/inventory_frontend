import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = 'http://localhost:4000';

// Utility function to get token from local storage
const getToken = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found in local storage');
  }
  return token;
};

// Fetch all users
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const token = getToken(); // Get token from local storage

  try {
    const response = await axios.get(`${BASE_URL}/admin`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use token from local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
});

// Add new user
export const addUser = createAsyncThunk('users/addUser', async (newUser) => {
  const token = getToken(); // Get token from local storage

  try {
    const response = await axios.post(`${BASE_URL}/admin/create`, newUser, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token in Authorization header
      },
    });
    console.log('Add User Response:', response.data); // Log to verify
    return response.data;
  } catch (error) {
    console.error('Error adding user:', error);
    throw error;
  }
});

// Update user
export const updateUser = createAsyncThunk('users/updateUser', async (updatedUser) => {
  const token = getToken(); // Get token from local storage

  console.log('Updating User:', updatedUser); // Debug log

  try {
    const response = await axios.put(
      `${BASE_URL}/admin/30`, // Adjust to correct ID dynamically
      updatedUser,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log('Update User Response:', response.data); // Debug log
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error.response ? error.response.data : error.message);
    throw error;
  }
});

// Delete user
export const deleteUser = createAsyncThunk('users/deleteUser', async (id) => {
  const token = getToken(); // Get token from local storage

  try {
    await axios.delete(`${BASE_URL}/admin/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return id; // Return the ID to remove it from the Redux state
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
});
export const Account = createAsyncThunk('users/fetchUserData', async (userID) => {
  const token = localStorage.getItem('authToken'); // Get token from local storage

  if (!token) {
    throw new Error('No token found in local storage');
  }

  try {
    const response = await axios.get(`${BASE_URL}/admin/${userID}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Use token from local storage
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
});


const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    selectedUser: null, // To store the data of the selected user
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
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.id === updatedUser.id);
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter((user) => user.id !== action.payload);
      })
      .addCase(Account.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(Account.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedUser = action.payload; // Store the selected user's data
      })
      .addCase(Account.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default usersSlice.reducer;
