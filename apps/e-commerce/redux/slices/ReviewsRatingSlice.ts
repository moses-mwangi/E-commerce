import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

// dotenv.config();
const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

interface Review {
  id: string;
  productId: number;
  userId: number;
  orderId: string;
  rating: number;
  comment: string;

  user: {
    id: number;
    name: string;
    email: string;
  };
  product: {
    id: 3;
    name: string;
    productImages: Images[];
  };
  createdAt: string;
}

interface Images {
  id: number;
  url: string;
  isMain: boolean;
  productId: number | string;
}

// {"id": 4,
//         "comment": "Good features but the battery life could be better.",
//         "rating": 5,
//         "productId": 3,
//         "orderId": "4",
//         "userId": 6,
//         "createdAt": "2025-04-21T17:49:39.751Z",
//         "user": {
//           "id": 6,
//           "name": "Moses mwangi",
//           "email": "moses.me7662@gmail.com"
//         },
//         "product": {
//           "id": 3,
//           "name": "moses mwangi"
//         }}

interface ReviewState {
  reviews: Review[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ReviewState = {
  reviews: [],
  status: "idle",
  error: null,
};

export const fetchReviews = createAsyncThunk(
  "reviews/fetchReviews",
  async () => {
    try {
      const response = await axios.get(`${API_URL}/review`);
      // if (!response.data.ok) throw new Error("Failed to fetch reviews");

      return await response.data.data.reviews;
    } catch (err: any) {
      return handleReviewError(err, "get");
    }
  }
);

export const fetchReview = createAsyncThunk(
  "reviews/fetchReviews",
  async (productId: string) => {
    try {
      const response = await axios.get(`${API_URL}/reviews/${productId}`);
      // if (!response.data.ok) throw new Error("Failed to fetch reviews");

      console.log();

      return await response.data;
    } catch (err: any) {
      return handleReviewError(err, "get");
    }
  }
);

export const createReview = createAsyncThunk(
  "reviews/createReview",
  async (
    reviewData: Omit<Review, "id" | "createdAt" | "user" | "product">,
    { rejectWithValue }
  ) => {
    console.log(reviewData);
    try {
      const response = await axios.post(`${API_URL}/review`, reviewData);
      // if (!response.data.ok) throw new Error("Failed to create review");

      toast.success("Thank you for your review!");
      return response.data.review;
      return "";
    } catch (err: any) {
      return handleReviewError(err, "Create");
    }
  }
);

// Delete a review
export const deleteReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/review/${reviewId}`);
      if (!response.data.ok) throw new Error("Failed to delete review");

      return reviewId;
    } catch (err: any) {
      return handleReviewError(err, "delete");
    }
  }
);

export const updateReview = createAsyncThunk(
  "reviews/deleteReview",
  async (reviewId: string, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/review/${reviewId}`);
      if (!response.data.ok) throw new Error("Failed to delete review");

      return reviewId;
    } catch (err: any) {
      return handleReviewError(err, "delete");
    }
  }
);

const handleReviewError = (err: unknown, method: string) => {
  const axiosError = err as AxiosError;
  const error =
    (axiosError.response?.data as any)?.message ||
    (axiosError.response?.data as any)?.error ||
    axiosError.message;

  toast.error(`Failed to ${method} review: ${error}`);
  return Promise.reject(error);
};

const reviewSlice = createSlice({
  name: "review",
  initialState,
  reducers: {
    clearReviews: (state) => {
      state.reviews = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchReviews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetchReviews.fulfilled,
        (state, action: PayloadAction<Review[]>) => {
          state.status = "succeeded";
          state.reviews = action.payload;
        }
      )
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      .addCase(createReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        createReview.fulfilled,
        (state, action: PayloadAction<Review>) => {
          state.status = "succeeded";
          state.reviews.unshift(action.payload);
        }
      )
      .addCase(createReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Delete Review
      .addCase(deleteReview.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        deleteReview.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.status = "succeeded";
          state.reviews = state.reviews.filter(
            (review) => review.id !== action.payload
          );
        }
      )
      .addCase(deleteReview.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      });
  },
});

export const { clearReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
