// import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
// import axios, { AxiosError } from "axios";
// import dotenv from "dotenv";
// import toast from "react-hot-toast";

// dotenv.config();
// const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

// export const mpesaPayment = createAsyncThunk(
//   "m_pesa/payments",
//   async (credential: any, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/payment/mpesa`, credential);
//       return res.data;
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       const error = (axiosError.response?.data as any)?.message;
//       toast.error("Failed to make mobile payments: " + error);
//       return rejectWithValue(error || "Failed to make payments");
//     }
//   }
// );

// // Async thunk for card payment
// export const cardPayment = createAsyncThunk(
//   "card/payments",
//   async (credential: any, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/payment/card`, credential);
//       return res.data;
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       const error = (axiosError.response?.data as any)?.message;
//       toast.error("Failed to make card payments: " + error);
//       return rejectWithValue(error || "Failed to make payments");
//     }
//   }
// );

// // Async thunk for PayPal payment
// export const paypalPayment = createAsyncThunk(
//   "paypal/payments",
//   async (credential: any, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/payment/paypal`, credential);
//       return res.data;
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       const error = (axiosError.response?.data as any)?.message;
//       toast.error("Failed to make PayPal payments: " + error);
//       return rejectWithValue(error || "Failed to make payments");
//     }
//   }
// );

// // Async thunk for bank payment
// export const bankPayment = createAsyncThunk(
//   "bank/payments",
//   async (credential: any, { rejectWithValue }) => {
//     try {
//       const res = await axios.post(`${API_URL}/payment/bank`, credential);
//       return res.data;
//     } catch (err) {
//       const axiosError = err as AxiosError;
//       const error = (axiosError.response?.data as any)?.message;
//       toast.error("Failed to make bank payments: " + error);
//       return rejectWithValue(error || "Failed to make payments");
//     }
//   }
// );

// // Initial state for the payment slice
// interface PaymentState {
//   status: "idle" | "loading" | "succeeded" | "failed";
//   error: string | null;
// }

// const initialState: PaymentState = {
//   status: "idle",
//   error: null,
// };

// // Create the payment slice
// const paymentSlice = createSlice({
//   name: "payment",
//   initialState,
//   reducers: {
//     clearError: (state) => {
//       state.error = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(mpesaPayment.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(mpesaPayment.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         // Handle successful payment response
//       })
//       .addCase(
//         mpesaPayment.rejected,
//         (state, action: PayloadAction<string | null>) => {
//           state.status = "failed";
//           state.error = action.payload || "Failed to make M-Pesa payment";
//         }
//       )
//       .addCase(cardPayment.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(cardPayment.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         // Handle successful payment response
//       })
//       .addCase(
//         cardPayment.rejected,
//         (state, action: PayloadAction<string | null>) => {
//           state.status = "failed";
//           state.error = action.payload || "Failed to make card payment";
//         }
//       )
//       .addCase(paypalPayment.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(paypalPayment.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         // Handle successful payment response
//       })
//       .addCase(
//         paypalPayment.rejected,
//         (state, action: PayloadAction<string | null>) => {
//           state.status = "failed";
//           state.error = action.payload || "Failed to make PayPal payment";
//         }
//       )
//       .addCase(bankPayment.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(bankPayment.fulfilled, (state, action: PayloadAction<any>) => {
//         state.status = "succeeded";
//         // Handle successful payment response
//       })
//       .addCase(
//         bankPayment.rejected,
//         (state, action: PayloadAction<string | null>) => {
//           state.status = "failed";
//           state.error = action.payload || "Failed to make bank payment";
//         }
//       );
//   },
// });

// // Export actions and reducer
// export const { clearError } = paymentSlice.actions;
// export default paymentSlice.reducer;
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import dotenv from "dotenv";
import toast from "react-hot-toast";

dotenv.config();
const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

// Type definitions
interface PaymentCredentials {
  amount: number;
  currency?: string;
  [key: string]: any;
}

interface MpesaCredentials extends PaymentCredentials {
  phoneNumber: string;
  name: string;
}

interface CardCredentials extends PaymentCredentials {
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardHolderName: string;
  name: string;
}

interface PayPalCredentials extends PaymentCredentials {
  email: string;
}

interface BankTransferCredentials extends PaymentCredentials {
  accountNumber: string;
  bankCode: string;
}

interface CryptoCredentials extends PaymentCredentials {
  walletAddress: string;
  cryptoCurrency: "BTC" | "ETH" | "USDT" | "SOL";
}

interface PaymentState {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  paymentMethod: PaymentMethod | null;
  transactionId: string | null;
  lastPaymentAmount: number | null;
  availablePaymentMethods: PaymentMethod[];

  ///M_PESA
  CheckoutRequestID: null;
  MerchantRequestID: null;
}

type PaymentMethod =
  | "mpesa"
  | "card"
  | "paypal"
  | "bank"
  | "crypto"
  | "apple_pay"
  | "google_pay"
  | "mobile_money";

export const mpesaPayment = createAsyncThunk(
  "payment/mpesa",
  async (credentials: MpesaCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/payment/mpesa`, credentials);
      toast.success("M-Pesa payment initiated successfully");
      return res.data.data;
    } catch (err) {
      toast.error("Failed to make mibile paymnets");
      return handlePaymentError(err, "M-Pesa");
    }
  }
);

export const cardPayment = createAsyncThunk(
  "payment/card",
  async (credentials: any, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/payment/card`, credentials);
      console.log("Card response", res);
      // toast.success("Card payment processed successfully");
      return res.data;
    } catch (err) {
      toast.error("Card payment Failed: Try again");
      return handlePaymentError(err, "card");
    }
  }
);

export const paypalPayment = createAsyncThunk(
  "payment/paypal",
  async (credentials: PayPalCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/payment/paypal`, credentials);
      toast.success("PayPal payment completed successfully");
      return res.data;
    } catch (err) {
      return handlePaymentError(err, "PayPal");
    }
  }
);

export const bankPayment = createAsyncThunk(
  "payment/bank",
  async (credentials: BankTransferCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/payment/bank`, credentials);
      toast.success("Bank transfer initiated successfully");
      return res.data;
    } catch (err) {
      return handlePaymentError(err, "bank transfer");
    }
  }
);

export const cryptoPayment = createAsyncThunk(
  "payment/crypto",
  async (credentials: CryptoCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/payment/crypto`, credentials);
      toast.success("Crypto payment address generated");
      return res.data;
    } catch (err) {
      return handlePaymentError(err, "crypto");
    }
  }
);

export const applePayPayment = createAsyncThunk(
  "payment/apple_pay",
  async (credentials: PaymentCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${API_URL}/payment/apple_pay`, credentials);
      toast.success("Apple Pay payment completed");
      return res.data;
    } catch (err) {
      return handlePaymentError(err, "Apple Pay");
    }
  }
);

export const googlePayPayment = createAsyncThunk(
  "payment/google_pay",
  async (credentials: PaymentCredentials, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${API_URL}/payment/google_pay`,
        credentials
      );
      toast.success("Google Pay payment completed");
      return res.data;
    } catch (err) {
      return handlePaymentError(err, "Google Pay");
    }
  }
);

const handlePaymentError = (err: unknown, method: string) => {
  const axiosError = err as AxiosError;
  const error =
    (axiosError.response?.data as any)?.message ||
    (axiosError.response?.data as any)?.error ||
    axiosError.message;

  toast.error(`Failed to process ${method} payment: ${error}`);
  return Promise.reject(error);
};

const initialState: PaymentState = {
  status: "idle",
  error: null,
  paymentMethod: null,
  transactionId: null,
  lastPaymentAmount: null,
  availablePaymentMethods: [
    "mpesa",
    "card",
    "paypal",
    "bank",
    "crypto",
    "apple_pay",
    "google_pay",
  ],

  ////M_PESA
  CheckoutRequestID: null,
  MerchantRequestID: null,
};

const paymentSlice = createSlice({
  name: "payment",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    resetPaymentState: (state) => {
      state.status = "idle";
      state.error = null;
      state.transactionId = null;
      state.lastPaymentAmount = null;
      state.availablePaymentMethods = [
        "mpesa",
        "card",
        "paypal",
        "bank",
        "crypto",
        "apple_pay",
        "google_pay",
      ];

      ////M_PESA
      state.CheckoutRequestID = null;
      state.MerchantRequestID = null;
    },
    setAvailablePaymentMethods: (
      state,
      action: PayloadAction<PaymentMethod[]>
    ) => {
      state.availablePaymentMethods = action.payload;
    },
  },
  extraReducers: (builder) => {
    // M-Pesa Payment
    builder
      .addCase(mpesaPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(mpesaPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.transactionId = action.payload.transactionId;
        // state.lastPaymentAmount = action.payload.amount;

        state.transactionId = action.payload.CheckoutRequestID;
        state.CheckoutRequestID = action.payload.CheckoutRequestID;
        state.MerchantRequestID = action.payload.MerchantRequestID;
        state.paymentMethod = "mpesa";
      })
      .addCase(mpesaPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "M-Pesa payment failed";
      });

    // Card Payment
    builder
      .addCase(cardPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(cardPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionId = action.payload.transactionId;
        state.lastPaymentAmount = action.payload.amount;
        state.paymentMethod = "card";
      })
      .addCase(cardPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Card payment failed";
      });

    // PayPal Payment
    builder
      .addCase(paypalPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(paypalPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionId = action.payload.transactionId;
        state.lastPaymentAmount = action.payload.amount;
        state.paymentMethod = "paypal";
      })
      .addCase(paypalPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "PayPal payment failed";
      });

    // Bank Transfer
    builder
      .addCase(bankPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(bankPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionId = action.payload.transactionId;
        state.lastPaymentAmount = action.payload.amount;
        state.paymentMethod = "bank";
      })
      .addCase(bankPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Bank transfer failed";
      });

    // Crypto Payment (with special handling)
    builder
      .addCase(cryptoPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(cryptoPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionId = action.payload.walletAddress; // Special case
        state.lastPaymentAmount = action.payload.amount;
        state.paymentMethod = "crypto";
      })
      .addCase(cryptoPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Crypto payment failed";
      });

    // Apple Pay
    builder
      .addCase(applePayPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(applePayPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionId = action.payload.transactionId;
        state.lastPaymentAmount = action.payload.amount;
        state.paymentMethod = "apple_pay";
      })
      .addCase(applePayPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Apple Pay failed";
      });

    // Google Pay
    builder
      .addCase(googlePayPayment.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(googlePayPayment.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.transactionId = action.payload.transactionId;
        state.lastPaymentAmount = action.payload.amount;
        state.paymentMethod = "google_pay";
      })
      .addCase(googlePayPayment.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Google Pay failed";
      });
  },
});

// Export actions and reducer
export const { clearError, resetPaymentState, setAvailablePaymentMethods } =
  paymentSlice.actions;

export default paymentSlice.reducer;

// Selectors
export const selectPaymentStatus = (state: { payment: PaymentState }) =>
  state.payment.status;
export const selectPaymentError = (state: { payment: PaymentState }) =>
  state.payment.error;
export const selectLastTransaction = (state: { payment: PaymentState }) => ({
  id: state.payment.transactionId,
  amount: state.payment.lastPaymentAmount,
  method: state.payment.paymentMethod,
});
export const selectAvailablePaymentMethods = (state: {
  payment: PaymentState;
}) => state.payment.availablePaymentMethods;
