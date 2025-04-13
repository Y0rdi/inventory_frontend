import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "http://localhost:4000";

// Utility function to get token from local storage
const getToken = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found in local storage");
  }
  return token;
};

// Fetch all users
export const fetchUsers = createAsyncThunk("users/fetchUsers", async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/admin/users`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch users");
  }
});

// Add new user
export const addUser = createAsyncThunk("users/addUser", async (newUser, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.post(`${BASE_URL}/admin/create`, newUser, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error adding user:", error);
    return rejectWithValue(error.response?.data || "Failed to add user");
  }
});

// Update system admin
export const updateSystemAdmin = createAsyncThunk(
  "users/updateSystemAdmin",
  async (updatedUser, { rejectWithValue }) => {
    try {
      const token = getToken();
      const userId = updatedUser.userID; // Extract userID from updatedUser

      if (!userId) {
        return rejectWithValue("User ID is missing");
      }

      const response = await axios.put(
        `${BASE_URL}/admin/${userId}`,
        updatedUser, // Pass the updatedUser data to the backend
        { headers: { Authorization: `Bearer ${token}` } }
      );

      return response.data;
    } catch (error) {
      console.error("Error updating user:", error);
      return rejectWithValue(error.response?.data || "Failed to update user");
    }
  }
);

// Delete user
export const deleteUser = createAsyncThunk("users/deleteUser", async (userID, { rejectWithValue }) => {
  try {
    const token = getToken();
    await axios.delete(`${BASE_URL}/admin/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return userID; // Return userID to filter it from the users list
  } catch (error) {
    console.error("Error deleting user:", error);
    return rejectWithValue(error.response?.data || "Failed to delete user");
  }
});

// Fetch single user data
export const fetchUserById = createAsyncThunk("users/fetchUserById", async (userID, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/admin/${userID}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch user data");
  }
});
// Fetch total user count for dashboard stats
export const fetchTotalUsers = createAsyncThunk("users/fetchTotalUsers", async (_, { rejectWithValue }) => {
  try {
    const token = getToken();
    const response = await axios.get(`${BASE_URL}/admin/stats`, {  // Replace with the correct endpoint
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.totalUsers;  // Assuming the response contains the totalUsers field
  } catch (error) {
    console.error("Error fetching total users:", error);
    return rejectWithValue(error.response?.data || "Failed to fetch total users");
  }
});


// Redux Slice
const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    selectedUser: null, // Stores currently selected user
    status: "idle",
    loading: false,
    error: null,
  },
  reducers: {
    setSelectedUser: (state, action) => {
      state.selectedUser = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch all users
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
        state.loading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.users = action.payload.map(user => ({
          ...user,
          id: user.userID,  // Rename userID to id if needed in Redux state
        }));
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.payload;
      })

      // Add user
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })

      // Update system admin
      .addCase(updateSystemAdmin.fulfilled, (state, action) => {
        const updatedUser = action.payload;
        const index = state.users.findIndex(user => user.userID === updatedUser.userID); // Use userID for comparison
        if (index !== -1) {
          state.users[index] = updatedUser;
        }
      })

      // Delete user
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.userID !== action.payload); // Use userID for filtering
      })

      // Fetch single user
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedUser = action.payload;
      })
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedUser } = usersSlice.actions;
export default usersSlice.reducer;
