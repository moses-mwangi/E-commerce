import { Product } from "@/app/types/products";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// export const fetchRecentlyViewed = createAsyncThunk(
//   "recentlyViewed/fetchRecentlyViewed",
//   async (userId: string, { rejectWithValue }) => {
//     try {
//       const response = await axios.get(`/api/users/${userId}/recently-viewed`);
//       return response.data;
//     } catch (error) {
//       return rejectWithValue((error as any).response.data);
//     }
//   }
// );

// export const saveRecentlyViewed = createAsyncThunk(
//   "recentlyViewed/saveRecentlyViewed",
//   async (
//     { userId, products }: { userId: string; products: Product[] },
//     { rejectWithValue }
//   ) => {
//     try {
//       const response = await axios.post(
//         `/api/users/${userId}/recently-viewed`,
//         { products }
//       );
//       return response.data;
//     } catch (error) {
//       return rejectWithValue((error as any).response.data);
//     }
//   }
// );

interface RecentState {
  recentlyViewed: Product[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const LOCAL_STORAGE_KEY = "recentlyViewed";

const getInitialState = (): Product[] => {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
};

const initialState: RecentState = {
  recentlyViewed: getInitialState(),
  status: "idle",
  error: null,
};

export const recentlySlice = createSlice({
  name: "recentlyViewed",
  initialState,
  reducers: {
    addToRecentlyViewed: (state, action: PayloadAction<Product>) => {
      state.recentlyViewed = state.recentlyViewed.filter(
        (product) => product.id !== action.payload.id
      );

      state.recentlyViewed.unshift(action.payload);

      if (state.recentlyViewed.length > 20) {
        state.recentlyViewed = state.recentlyViewed.slice(0, 20);
      }

      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.recentlyViewed)
        );
      }
    },

    removeFromRecentlyViewed: (state, action: PayloadAction<number>) => {
      state.recentlyViewed = state.recentlyViewed.filter(
        (product) => product.id !== action.payload
      );

      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.recentlyViewed)
        );
      }
    },

    clearRecentlyViewed: (state) => {
      state.recentlyViewed = [];
      if (typeof window !== "undefined") {
        localStorage.removeItem(LOCAL_STORAGE_KEY);
      }
    },

    syncRecentlyViewed: (state, action: PayloadAction<Product[]>) => {
      const merged = [...action.payload, ...state.recentlyViewed].reduce(
        (acc: Product[], current: Product) => {
          const x = acc.find((item) => item.id === current.id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        },
        []
      );

      state.recentlyViewed = merged.slice(0, 20);

      if (typeof window !== "undefined") {
        localStorage.setItem(
          LOCAL_STORAGE_KEY,
          JSON.stringify(state.recentlyViewed)
        );
      }
    },
  },
});

export const {
  addToRecentlyViewed,
  removeFromRecentlyViewed,
  clearRecentlyViewed,
  syncRecentlyViewed,
} = recentlySlice.actions;

export const selectRecentlyViewed = (state: { recentlyViewed: RecentState }) =>
  state.recentlyViewed.recentlyViewed;

export default recentlySlice.reducer;
