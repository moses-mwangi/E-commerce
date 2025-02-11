import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";
import dotenv from "dotenv";
import { UserState } from "../../app/types/user";

dotenv.config();

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const res = await axios.get(`${API_URL}/user`);
    return res.data.users;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
});

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data: { email: string; name: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, data);

      const token = response.data.token;
      document.cookie = `token=${token}; path=/`;

      return token;
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);

      if (response.data.error) {
        toast.error("Wrong credential");
        return;
      }
      const token = response.data.token;
      console.log(response.data);
      document.cookie = `token=${token}; path=/`;
      toast.success("Login succefully");

      return token;
    } catch (err) {
      console.error("Error:", err);
      throw err;
      toast.error("Login failed");
      console.log(err);
    }
  }
);

export const loginUserAsaync = createAsyncThunk(
  "user/login",
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, data);
      const token = response.data.token;
      document.cookie = `token=${token}; path=/`;
      return token;
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async () => {
    const token = document.cookie.split("=")[1];

    try {
      if (token.length > 20 && token !== undefined) {
        const response = await axios.get(`${API_URL}/auth/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        return response.data.user;
      } else {
        throw new Error("No token found");
      }
    } catch (err) {
      console.error("Error:", err);
      throw err;
    }
  }
);

const initialState: UserState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      state.currentUser = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      })
      .addCase(registerUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(registerUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(loginUserAsync.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(loginUserAsync.rejected, (state, action) => {
        state.status = "failed";
        state.isAuthenticated = false;
      })
      .addCase(loginUserAsync.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
