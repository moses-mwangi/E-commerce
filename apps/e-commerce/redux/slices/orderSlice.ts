import { Order, OrderState } from "@/app/types/order";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

type OrdersItemType = {
  userId: string | undefined;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  shippingAddress: any;
  trackingNumber: string;
  orderItems: {
    productId: number;
    quantity: number;
    price: any;
  }[];
};

export const createOrder = createAsyncThunk(
  "orders/create",
  async (orderData: OrdersItemType) => {
    try {
      const res = await axios.post(`${API_URL}/order`, orderData);
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to create order");
    }
  }
);

// Fetch user orders
export const fetchOrders = createAsyncThunk("orders/fetchAll", async () => {
  try {
    const res = await axios.get(`${API_URL}/order`);
    return res.data.orders;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to fetch orders");
  }
});

// Fetch a single order by ID
export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (orderId: number) => {
    try {
      const res = await axios.get(`${API_URL}/order/${orderId}`);
      return res.data.order;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to fetch order");
    }
  }
);

// Update order status (e.g., processing, completed)
export const updateOrderStatus = createAsyncThunk(
  "orders/updateStatus",
  async ({ orderId, status }: { orderId: number; status: string }) => {
    try {
      const res = await axios.put(`${API_URL}/order/${orderId}`, { status });
      return res.data;
    } catch (err) {
      console.error(err);
      throw new Error("Failed to update order status");
    }
  }
);

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  status: "idle",
  error: null,
};

const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create order";
      })
      .addCase(fetchOrders.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch orders";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.selectedOrder = action.payload;
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        const updatedOrder = action.payload;
        state.orders = state.orders.map((order) =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
      });
  },
});

export default orderSlice.reducer;
