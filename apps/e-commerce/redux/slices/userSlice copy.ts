import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const res = await axios.get("http://127.0.0.1:8000/api/user");
    return res.data.users;
  } catch (err) {
    console.error("Error:", err);
    throw err;
  }
});

const initialState = {
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
    setAllUser: (state, action) => {
      state.users = action.payload;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    registerUser: (state, action) => {
      state.currentUser = action.payload;
    },
    loginUser: (state, action) => {},
    logoutUser: (state, action) => {},
    updateUser: (state, action) => {},
    updateCurrentUser: (state, action) => {},
    deleteUser: (state, action) => {},
  },
});

export const {
  setAllUser,
  setCurrentUser,
  loginUser,
  logoutUser,
  updateCurrentUser,
  updateUser,
  deleteUser,
} = userSlice.actions;
export default userSlice.reducer;
