import { OrderState } from "@/app/types/order";
import {
  convertPrice,
  getCurrentCurrency,
  CurrencyCode,
} from "@/utils/currency";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";

const API_URL = process.env.API_URL || "https://kivamall.up.railway.app/api";
const BASE_CURRENCY: CurrencyCode = "KES";

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
    console.log("ORDERS_ITEMS", orderData);
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
      const token = getToken();
      const res = await axios.get(`${API_URL}/order`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const currentCurrency = getCurrentCurrency();

      const transformedOrders = res.data.orders.map((order: any) => {
        const convertedOrder = {
          ...order,
          totalPrice: convertPrice(
            order.totalPrice,
            BASE_CURRENCY,
            currentCurrency
          ),
          originalTotalPrice: order.totalPrice,
          currency: currentCurrency,
        };

        const convertedItems = order.OrderItems.map((item: any) => ({
          ...item,
          price: convertPrice(item.price, BASE_CURRENCY, currentCurrency),
          Product: {
            ...item.Product,
            price: convertPrice(
              item.Product.price,
              BASE_CURRENCY,
              currentCurrency
            ),
            originalPrice: item.Product.price,
            costPrice: convertPrice(
              item.Product.costPrice,
              BASE_CURRENCY,
              currentCurrency
            ),
            originalCostPrice: item.Product.costPrice,
          },
        }));

        return {
          ...convertedOrder,
          OrderItems: convertedItems,
        };
      });

      return transformedOrders;
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

      const currentCurrency = getCurrentCurrency();

      const order = res.data.order;
      const convertedOrder = {
        ...order,
        totalPrice: convertPrice(
          order.totalPrice,
          BASE_CURRENCY,
          currentCurrency
        ),
        originalTotalPrice: order.totalPrice,
        currency: currentCurrency,
      };

      const convertedItems = order.OrderItems.map((item: any) => ({
        ...item,
        price: convertPrice(item.price, BASE_CURRENCY, currentCurrency),
        Product: {
          ...item.Product,
          price: convertPrice(
            item.Product.price,
            BASE_CURRENCY,
            currentCurrency
          ),
          originalPrice: item.Product.price,
          costPrice: convertPrice(
            item.Product.costPrice,
            BASE_CURRENCY,
            currentCurrency
          ),
          originalCostPrice: item.Product.costPrice,
        },
      }));

      return {
        ...convertedOrder,
        OrderItems: convertedItems,
      };
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
      const res = await axios.patch(
        `${API_URL}/order/${orderId}`,
        updateAddress
      );

      toast.success("The address updated succefully");

      window.location.href = "https://www.kivamall.com/pages/order";
      clearState();
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
  reducers: {
    clearState: (state) => {
      state.status = "idle";
    },
  },
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

export const { clearState } = orderSlice.actions;

export default orderSlice.reducer;
