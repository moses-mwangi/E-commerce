import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import dotenv from "dotenv";
import { UserState } from "../../app/types/user";
import Error, { ErrorProps } from "next/error";

dotenv.config();

function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
  return match ? match[2] : null;
}

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async () => {
  try {
    const res = await axios.get(`${API_URL}/user`);
    return res.data.users;
  } catch (err) {
    // console.error("Error:", err);
    toast.error("Error in fetching user");
    throw err;
  }
});

export const registerUserAsync = createAsyncThunk(
  "user/register",
  async (data: { email: string; name: string; password: string }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/signup`, data);

      const token = response.data.token;
      // document.cookie = `token=${token}; path=/`;

      toast.success("Email sent Succefully");
      window.location.href = "/registration/email-verified-msg";

      return token;
    } catch (err) {
      toast.error("Account creation Failed");
      throw err;
    }
  }
);

export const verifyEmail = createAsyncThunk(
  "user/verify-email",
  async (token: string) => {
    try {
      await axios.post(`${API_URL}/auth/verify-email/${token}`);

      // const token = response.data.token;
      document.cookie = `token=${token}; path=/`;
      document.cookie = `tokens=${token}; path=/`;
      toast.success("Account created succefully");

      return "";
    } catch (err) {
      toast.error("Email Verification failed");

      // window.location.href = "/registration/email-verified-msg";

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

      document.cookie = `token=${token}; path=/`;
      document.cookie = `tokens=${token}; path=/`;
      toast.success("Login succefully");
      window.location.href = "/";

      return token;
    } catch (err) {
      // console.error("Error:", err);
      // toast.error("Login failed");
      throw err;
      // console.log(err);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/deleteCurrentUser",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/auth/deleteUser/${id}`);

      if (response.data.error) {
        toast.error("Deletion failed: " + response.data.error);
        return rejectWithValue(response.data.error);
      }

      document.cookie = `token=; path=/`;
      document.cookie = `tokens=; path=/`;
      // toast.success("Account deleted successfully");

      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;

      // console.error("Error:", axiosError);
      toast.error("Deletion failed");
      // toast.error("Deletion failed");

      return rejectWithValue(
        axiosError.response?.data || "An error occurred while deleting user."
      );
    }
  }
);

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (_, { rejectWithValue }) => {
    const tokens = getCookie("tokens");

    try {
      if (!tokens || tokens.length <= 20) {
        throw new Error("No valid token found." as unknown as ErrorProps);
      }

      const response = await axios.get(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${tokens}`,
        },
        withCredentials: true,
      });

      return response.data.user;
    } catch (err) {
      const axiosError = err as AxiosError;

      if (axiosError.response?.status === 401) {
        const errorMessage = "Your session has expired. Please log in again.";

        alert(errorMessage);
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        // Handle other errors
        // toast.error("Error getting current user");
        // console.error("Error:", axiosError);
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      }
      return rejectWithValue(
        axiosError.response?.data ||
          "An error occurred while fetching the current user."
      );
    }
  }
);

export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (
    data: { currentPassword: string; newPassword: string },
    { rejectWithValue }
  ) => {
    const token = getCookie("tokens");

    try {
      if (!token || token.length <= 20) {
        throw new Error("No valid token found." as unknown as ErrorProps);
      }

      const response = await axios.patch(
        `${API_URL}/auth/updatePassword`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("Password updated successfully");

      const newToken = response.data.token;
      document.cookie = `token=${newToken}; path=/`;
      document.cookie = `tokens=${newToken}; path=/`;

      return newToken;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        const errorMessage = "Your session has expired. Please log in again.";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        toast.error(axiosError.message);
      }
      return rejectWithValue(
        axiosError.response?.data ||
          "An error occurred while updating the password."
      );
    }
  }
);

export const updateCurrentUser = createAsyncThunk(
  "user/updateUser",
  async (
    data: {
      name: string;
      address: string;
      city: string;
      state: string;
      telephone: string;
      tradeRole: string;
      zipcode: string;
      currentUserId: string;
    },

    { rejectWithValue }
  ) => {
    // const token = document.cookie.split("=")[1];
    const token = getCookie("tokens");

    try {
      if (!token || token.length <= 20) {
        throw new Error("No valid token found." as unknown as ErrorProps);
      }

      const response = await axios.patch(
        `${API_URL}/user/${data.currentUserId}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      toast.success("User updated successfully");

      const newToken = response.data.token;
      document.cookie = `token=${newToken}; path=/`;

      //not necessary
      document.cookie = `tokens=${newToken}; path=/`;

      return newToken;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        const errorMessage = "Your session has expired. Please log in again.";
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        toast.error(axiosError.message);
      }
      return rejectWithValue(
        axiosError.response?.data ||
          "An error occurred while updating the password."
      );
    }
  }
);

export const requestPasswordReset = createAsyncThunk(
  "user/requestPasswordReset",
  async (email: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/auth/request-reset`, {
        email,
      });
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(
        error.response?.data || "Failed to send reset email"
      );
    }
  }
);

export const validateResetToken = createAsyncThunk(
  "user/validateResetToken",
  async (token: string, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/auth/validate-reset-token`,
        {
          token,
        }
      );
      return response.data;
    } catch (err) {
      const error = err as AxiosError;

      return rejectWithValue(
        error.response?.data || "Invalid or expired reset token"
      );
    }
  }
);

export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (
    data: { token: string; password: string; confirmPassword: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, data);
      return response.data;
    } catch (err) {
      const error = err as AxiosError;
      return rejectWithValue(
        error.response?.data || "Failed to reset password"
      );
    }
  }
);

export const setPassword = createAsyncThunk(
  "user/setPassword",
  async (
    data: { userId: number; newPassword: string; token: string | null },
    thunkAPI
  ) => {
    try {
      const response = await axios.post(`${API_URL}/auth/set-password`, data);
      toast.success("Password sets successfully");
      const newToken = response.data.token;
      window.location.href = "/";
      document.cookie = `tokens=${newToken}; path=/`;
      return response.data;
    } catch (err) {
      const axiosError = err as AxiosError;
      if (axiosError.response?.status === 401) {
        document.cookie =
          "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        document.cookie =
          "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      } else {
        toast.error("Error occurred while setting password.");
      }
      console.log(err);
      return thunkAPI.rejectWithValue(
        axiosError.response?.data ||
          "An error occurred while updating the password."
      );
    }
  }
);

const initialState: UserState = {
  users: [],
  currentUser: null,
  isAuthenticated: false,
  status: "idle",
  error: null,
  passwordReset: {
    requestStatus: "idle",
    validationStatus: "idle",
    resetStatus: "idle",
    error: null,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      document.cookie =
        "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      document.cookie =
        "tokens=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      state.currentUser = null;
      state.isAuthenticated = false;
    },
    clearPasswordResetStatus: (state) => {
      state.passwordReset = {
        requestStatus: "idle",
        validationStatus: "idle",
        resetStatus: "idle",
        error: null,
      };
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
      .addCase(registerUserAsync.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(registerUserAsync.pending, (state, action) => {
        state.status = "loading";
      })

      .addCase(verifyEmail.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(verifyEmail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      .addCase(verifyEmail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to verify email";
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

      .addCase(updatePassword.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
      })
      // .addCase(updatePassword.rejected, (state, action) => {
      //   state.status = "failed";
      //   state.isAuthenticated = false;
      // })
      .addCase(updatePassword.pending, (state, action) => {
        state.status = "loading";
      })
      /////////////
      .addCase(getCurrentUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(getCurrentUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(getCurrentUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch user";
      })
      .addCase(requestPasswordReset.pending, (state) => {
        state.passwordReset.requestStatus = "loading";
        state.passwordReset.error = null;
      })
      .addCase(requestPasswordReset.fulfilled, (state) => {
        state.passwordReset.requestStatus = "succeeded";
        state.passwordReset.error = null;
      })
      .addCase(requestPasswordReset.rejected, (state, action) => {
        state.passwordReset.requestStatus = "failed";
        state.passwordReset.error = action.payload as string;
      })

      // Validate Reset Token
      .addCase(validateResetToken.pending, (state) => {
        state.passwordReset.validationStatus = "loading";
        state.passwordReset.error = null;
      })
      .addCase(validateResetToken.fulfilled, (state) => {
        state.passwordReset.validationStatus = "succeeded";
        state.passwordReset.error = null;
      })
      .addCase(validateResetToken.rejected, (state, action) => {
        state.passwordReset.validationStatus = "failed";
        state.passwordReset.error = action.payload as string;
      })

      // Reset Password
      .addCase(resetPassword.pending, (state) => {
        state.passwordReset.resetStatus = "loading";
        state.passwordReset.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.passwordReset.resetStatus = "succeeded";
        state.passwordReset.error = null;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.passwordReset.resetStatus = "failed";
        state.passwordReset.error = action.payload as string;
      });
  },
});

export const { logoutUser, clearPasswordResetStatus } = userSlice.actions;
export default userSlice.reducer;
