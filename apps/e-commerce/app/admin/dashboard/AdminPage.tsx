"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table } from "@/components/ui/table";
import {
  LineChart,
  Pie,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  Users,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Package,
  AlertCircle,
} from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { format, subMonths } from "date-fns";
import useOrder_Sales_Comparison from "@/hooks/useOrder_Sales_Comparison";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";

const salesData = [
  { name: "Jan", sales: 4000 },
  { name: "Feb", sales: 3000 },
  { name: "Mar", sales: 5000 },
  { name: "Apr", sales: 7000 },
  { name: "May", sales: 6000 },
  { name: "Jun", sales: 8000 },
];

const revenueData = [
  { category: "Electronics", revenue: 12000 },
  { category: "Fashion", revenue: 9000 },
  { category: "Kitchen", revenue: 7500 },
  { category: "Beauty", revenue: 6500 },
  { category: "Care Products", revenue: 5000 },
];

const recentOrders = [
  { id: 1, customer: "John Doe", amount: 150, status: "Completed" },
  { id: 2, customer: "Jane Smith", amount: 290, status: "Processing" },
  { id: 3, customer: "John Doe", amount: 150, status: "Completed" },
  { id: 4, customer: "Jane Smith", amount: 290, status: "Processing" },
  // Add more orders...
];

const order = [
  {
    id: 1,
    customer: "John Doe",
    amount: 150,
    status: "Completed",
    createdAt: "2025-01-12T11:49:13.995Z",
    totalPrice: 65000,
  },
  {
    id: 2,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-01-12T11:49:13.995Z",
    totalPrice: 55000,
  },
  {
    id: 3,
    customer: "John Doe",
    amount: 150,
    status: "Completed",
    createdAt: "2025-01-12T11:49:13.995Z",
    totalPrice: 45000,
  },
  ////
  {
    id: 4,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-02-12T11:49:13.995Z",
    totalPrice: 35000,
  },
  {
    id: 5,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-02-12T11:49:13.995Z",
    totalPrice: 48000,
  },
  {
    id: 6,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-02-12T11:49:13.995Z",
    totalPrice: 75000,
  },
  //////
  {
    id: 7,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-12T11:49:13.995Z",
    totalPrice: 57000,
  },
  {
    id: 8,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-12T11:49:13.995Z",
    totalPrice: 66000,
  },
  {
    id: 9,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-13T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 10,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-15T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 11,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-16T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 12,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-16T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 13,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-17T11:49:13.995Z",
    totalPrice: 46000,
  },

  {
    id: 12,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-16T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 13,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-16T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 12,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-16T11:49:13.995Z",
    totalPrice: 46000,
  },
  {
    id: 13,
    customer: "Jane Smith",
    amount: 290,
    status: "Processing",
    createdAt: "2025-03-16T11:49:13.995Z",
    totalPrice: 46000,
  },
  // Add more orders...
];

export default function AdminDashboard() {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const { currentUser, users } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  const { orders } = useSelector((state: RootState) => state.order);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  const {
    currentWeekOrders,
    previousWeekOrders,
    orderChange,
    formattedOrderChange,

    currentMonthSales,
    formattedSalesChange,
    salesChange,

    currentMonthCustomers,
    previousMonthCustomers,
    formattedCustomerChange,
    customerChange,
  } = useOrder_Sales_Comparison(order, users);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchUsers());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
        {/* Top Header */}
        {/* <Button
          onClick={() => {
            console.log(products);
            // console.log(currentMonthCustomers);
            // console.log(previousMonthCustomers);
          }}
        >
          CLICK
        </Button> */}
        <div className="bg-white shadow-sm">
          <div className="px-6 py-4">
            <h1 className="text-2xl font-semibold text-gray-800">
              Dashboard Overview
            </h1>
            <p className="text-gray-600">
              Welcome back, {currentUser?.name || "Admin"}
            </p>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card className="py-6 px-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    ${currentMonthSales.toFixed(0)}
                  </h3>
                  <p
                    className={`text-xs ${
                      salesChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {salesChange >= 0 ? "▲" : "▼"}
                    {formattedSalesChange} from last month
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-green-100 rounded-full">
                  <ShoppingBag className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {currentWeekOrders}
                  </h3>
                  <p
                    className={`text-xs ${
                      orderChange >= 0 ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {orderChange === 0
                      ? "No change from last week"
                      : `${formattedOrderChange} from last week`}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Customers</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {/* {currentMonthCustomers} */}
                    {users.length}
                  </h3>
                  <p className="text-xs text-green-600">
                    {customerChange !== 0
                      ? `${formattedCustomerChange} from last month`
                      : "No new customer for last month"}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-yellow-100 rounded-full">
                  <Package className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Products</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {products.length}
                  </h3>
                  <p className="text-xs text-yellow-600">23 low in stock</p>
                </div>
              </div>
            </Card>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sales Overview
                </h3>
                <Select>
                  <SelectTrigger className="1 w-32 bg-gray-100 h-8 focus:ring-orange-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="90">Last 90 days</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={salesData}>
                    {/* <LineChart
                    data={orders.map((order) => ({
                      name: format(new Date(order.createdAt), "MMM dd"),
                      sales: order.totalPrice,
                    }))}
                  > */}
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4f46e5"
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Revenue by Category */}
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Revenue by Category
                </h3>
                <Button variant="outline" size="sm">
                  Download Report
                </Button>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueData}>
                    {/* <BarChart data={products}> */}
                    <XAxis dataKey="category" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#22c55e" />
                    {/* <Bar dataKey="price" fill="#22c55e" /> */}
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </div>

          {/* Recent Orders */}
          <Card className="p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Recent Orders
              </h3>
              <Button variant="outline" size="sm">
                View All Orders
              </Button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Order ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Customer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        #{order.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {order.customer}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${order.amount}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${
                            order.status === "Completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <Button variant="ghost" size="sm">
                          View Details
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
