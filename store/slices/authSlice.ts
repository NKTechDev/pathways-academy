import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// API Base URL
const API_URL = "https://api.cooeemobile.com";

// Initial State
const initialState = {
  user: null,
  loading: false,
  error: null,
};

// Async Thunk: Fetch User Data
export const fetchUser = createAsyncThunk("auth/fetchUser", async (_, { rejectWithValue }) => {
    try {
      const accessToken = localStorage.getItem("accessToken");
  
      if (!accessToken) {
        return rejectWithValue("No access token found. Please log in.");
      }
  
      const response = await axios.get(`${API_URL}/me`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
  
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Failed to fetch user");
    }
  });
  

// Async Thunk: Logout
export const logout = createAsyncThunk("auth/logout", async (_, { rejectWithValue }) => {
    try {
      await axios.post(`${API_URL}/logout`);
  
      // Remove token from localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("tokenExpiration");
    } catch (error) {
      return rejectWithValue("Logout failed");
    }
  });
  

// Auth Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch User
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })

      // Logout
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export default authSlice.reducer;
