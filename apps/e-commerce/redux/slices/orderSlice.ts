import { OrderState } from "@/app/types/order";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.API_URL || "http://127.0.0.1:8000/api";

type OrdersItemType = {
  userId: string | undefined;
  totalPrice: number;
  status: string;
  paymentStatus: string;
  shippingAddress: any;
  trackingNumber?: string;
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
      toast.success("Order sent succefully");
      window.location.href = "/pages/cart/checkout/order_delivery_method";

      localStorage.setItem("orderId", res.data.order.id.toString());

      return res.data;
    } catch (err) {
      return handleOrderError(err, "creating");
    }
  }
);

const getToken = () => {
  const match = document.cookie.match(/(?:^|; )token=([^;]*)/);
  return match ? match[1] : null;
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      // const token = document.cookie.split("=")[1];
      const token = getToken();
      const res = await axios.get(`${API_URL}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return res.data.orders;
    } catch (err) {
      return handleOrderError(err, "fetching");
    }
  }
);

export const fetchOrderById = createAsyncThunk(
  "orders/fetchById",
  async (orderId: number) => {
    try {
      const res = await axios.get(`${API_URL}/order/${orderId}`);
      return res.data.order;
    } catch (err) {
      return handleOrderError(err, "fetch");
    }
  }
);

export const updateOrder = createAsyncThunk(
  "orders/updateStatus",
  async (address: any) => {
    try {
      const { orderId, ...updateAddress } = address;
      console.log(orderId, updateAddress);
      const res = await axios.patch(`${API_URL}/order/${orderId}`, {
        updateAddress,
      });

      console.log(res.data);

      toast.success("The address updated succefully");
      return res.data;
    } catch (err) {
      return handleOrderError(err, "Updating");
    }
  }
);

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

const handleOrderError = (err: unknown, method: string) => {
  const axiosError = err as AxiosError;
  const error =
    (axiosError.response?.data as any)?.message ||
    (axiosError.response?.data as any)?.error ||
    axiosError.message;

  toast.error(`Failed to ${method} order address: ${error}`);
  return Promise.reject(error);
};

const initialState: OrderState = {
  orders: [],
  selectedOrder: null,
  status: "idle",
  error: null,
  orderId: null,
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
        state.orderId = action.payload.order.id;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to create order";
      })

      .addCase(updateOrder.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateOrder.fulfilled, (state, action) => {
        state.status = "succeeded";
        // state.orders.push(action.payload);
        // state.orderId = action.payload.order.id;
      })
      .addCase(updateOrder.rejected, (state, action) => {
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
      });
    // .addCase(updateOrderStatus.fulfilled, (state, action) => {
    //   const updatedOrder = action.payload;
    //   state.orders = state.orders.map((order) =>
    //     order.id === updatedOrder.id ? updatedOrder : order
    //   );
    // });
  },
});

export default orderSlice.reducer;
