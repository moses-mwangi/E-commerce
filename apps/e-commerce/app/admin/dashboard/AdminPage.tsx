"use client";

import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
} from "recharts";
import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import useOrder_Sales_Comparison from "@/hooks/useOrder_Sales_Comparison";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { format, isWithinInterval, subDays } from "date-fns";
import { Order } from "@/app/types/order";
import { capitalizeWords } from "@/app/types/products";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// const groupByDay = (orders: Order[]) => {
//   const dailyData: Record<string, number> = {};

//   orders.forEach((order) => {
//     const dateStr = format(new Date(order.createdAt), "MMM dd");
//     dailyData[dateStr] = (dailyData[dateStr] || 0) + order.totalPrice;
//   });

//   return Object.entries(dailyData).map(([name, sales]) => ({
//     name,
//     sales,
//   }));
// };

// const groupByMonth = (orders: Order[]) => {
//   const monthlyData: Record<string, number> = {};

//   orders.forEach((order) => {
//     const monthStr = format(new Date(order.createdAt), "MMM yyyy");
//     monthlyData[monthStr] = (monthlyData[monthStr] || 0) + order.totalPrice;
//   });

//   return Object.entries(monthlyData).map(([name, sales]) => ({
//     name,
//     sales,
//   }));
// };

const groupByDay = (orders: Order[], selectedPeriod: string | number) => {
  const dailyData: Record<string, number> = {};

  orders.forEach((order) => {
    const dateStr = format(new Date(order.createdAt), "MMM dd");
    dailyData[dateStr] = (dailyData[dateStr] || 0) + order.totalPrice;
  });

  // Fill in missing days to maintain consistent chart display
  const result = [];
  const days = Number(selectedPeriod);
  for (let i = 0; i < days; i++) {
    const date = subDays(new Date(), i);
    const dateStr = format(date, "MMM dd");
    result.unshift({
      name: dateStr,
      sales: dailyData[dateStr] || 0,
    });
  }

  return result;
};

const groupByMonth = (orders: Order[], monthsAgo: number) => {
  const monthlyData: Record<string, number> = {};

  orders.forEach((order) => {
    const monthStr = format(new Date(order.createdAt), "MMM yyyy");
    monthlyData[monthStr] = (monthlyData[monthStr] || 0) + order.totalPrice;
  });

  //////////////////// Fill in missing months
  const result = [];
  for (let i = 0; i < monthsAgo; i++) {
    const date = new Date();
    date.setMonth(date.getMonth() - i);
    const monthStr = format(date, "MMM yyyy");
    result.unshift({
      name: monthStr.split(" ")[0],
      sales: monthlyData[monthStr] || 0,
    });
  }

  return result;
};

const exportPDF = (data: { category: string; revenue: number }[]) => {
  const doc = new jsPDF();

  // Title
  doc.setFontSize(16);
  doc.text("Revenue by Category", 14, 20);

  // Table
  autoTable(doc, {
    startY: 30,
    head: [["Category", "Revenue"]],
    body: data.map((item) => [
      item.category,
      `$${item.revenue <= 3 ? "N/A" : item.revenue.toFixed(2)}`,
    ]),
  });

  // Save
  doc.save("revenue-report.pdf");
};

export default function AdminDashboard() {
  const [showAllOrders, setShowAllOrders] = useState(6);
  const [selectedPeriod, setSelectedPeriod] = useState("30");

  const { currentUser, users } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  const { orders } = useSelector((state: RootState) => state.order);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  const {
    orderChange,
    formattedOrderChange,
    currentMonthSales,
    formattedSalesChange,
    salesChange,
    formattedCustomerChange,
    customerChange,
    revenue,
  } = useOrder_Sales_Comparison(orders, users);

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchUsers());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleSales = (daysAgo: number | string) => {
    const startDate = subDays(new Date(), Number(daysAgo));
    const endDate = new Date();

    const filteredOrders = orders
      .filter((el) => el.paymentStatus.toLowerCase() === "paid")
      .filter((order) =>
        isWithinInterval(new Date(order.createdAt), {
          start: startDate,
          end: endDate,
        })
      );

    if (Number(daysAgo) === 7 || Number(daysAgo) === 30) {
      return groupByDay(filteredOrders, selectedPeriod);
    } else {
      return groupByMonth(filteredOrders, Number(daysAgo));
    }
  };

  const revenueByCategory = () => {
    const revenueMap: Record<string, number> = {};

    orders
      .filter((order) => order.paymentStatus.toLowerCase() === "paid")
      .forEach((order) => {
        order.OrderItems.forEach((item) => {
          const category = item.Product.category;
          const revenue = item.price * item.quantity;

          if (revenueMap[category]) {
            revenueMap[category] += revenue;
          } else {
            revenueMap[category] = revenue;
          }
        });
      });

    const revenue = Object.entries(revenueMap).map(([category, revenue]) => ({
      category: capitalizeWords(category),
      revenue: revenue,
    }));

    const updatedRevenue = [...revenue];

    const unmatchedCategories = categories.filter(
      (cate) =>
        !revenue.some(
          (rev) => rev.category.toLowerCase() === cate.name.toLowerCase()
        )
    );

    unmatchedCategories.forEach((cate) => {
      updatedRevenue.push({
        category: capitalizeWords(cate.name),
        revenue: 3,
      });
    });

    return updatedRevenue;
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <div className="flex-1 overflow-auto">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <Card className="py-6 px-6 hover:shadow-lg transition-shadow">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Revenue</p>
                  <h3 className="text-2xl font-bold text-gray-900">
                    ${revenue.toLocaleString()}
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
                    {/* {currentWeekOrders} */}
                    {orders.length}
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
                  <p className="text-xs text-yellow-600">
                    {products.length < 100
                      ? `${100 - products.length} low in stock`
                      : `Enough stock`}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Sales Overview
                </h3>
                <Select
                  onValueChange={(value) => setSelectedPeriod(value)}
                  defaultValue="30"
                >
                  <SelectTrigger className="w-32 bg-gray-100 h-8 focus:ring-orange-500">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="7">Last 7 days</SelectItem>
                      <SelectItem value="30">Last 30 days</SelectItem>
                      <SelectItem value="3">Last 90 days</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={handleSales(selectedPeriod)}>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis
                      dataKey="name"
                      tick={{ fontSize: 12 }}
                      tickMargin={10}
                    />
                    <YAxis
                      tickFormatter={(value) => `$${value}`}
                      tick={{ fontSize: 12 }}
                    />
                    <Tooltip
                      formatter={(value) => [`$${value}`, "Revenue"]}
                      labelFormatter={(label) => `Date: ${label}`}
                      contentStyle={{
                        borderRadius: "8px",
                        border: "none",
                        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                      }}
                    />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="sales"
                      stroke="#4f46e5"
                      strokeWidth={2}
                      name="Revenue"
                      dot={{ r: 4 }}
                      activeDot={{ r: 6, strokeWidth: 0 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Revenue by Category */}
            <Card className="py-6">
              <div className="flex px-6 justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Revenue by Category
                </h3>
                <Button
                  onClick={() => {
                    exportPDF(revenueByCategory());
                  }}
                  variant="outline"
                  size="sm"
                >
                  Download Report
                </Button>
              </div>

              <div className="h-auto">
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={revenueByCategory()}>
                    <XAxis
                      dataKey="category"
                      tick={({ x, y, payload }) => {
                        const words = payload.value.split(" ");
                        return (
                          <text
                            x={x}
                            y={y + 11}
                            textAnchor="middle"
                            fontSize={11}
                            color="red"
                          >
                            {words.map((word: string, index: number) => (
                              <tspan
                                x={x}
                                dy={index === 0 ? 0 : 12}
                                key={index}
                              >
                                {word}
                              </tspan>
                            ))}
                          </text>
                        );
                      }}
                      interval={0}
                    />

                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#22c55e" />
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
              <Button
                onClick={() => {
                  if (showAllOrders === 6) {
                    setShowAllOrders(orders.length);
                  } else {
                    setShowAllOrders(6);
                  }
                }}
                variant="outline"
                size="sm"
              >
                {showAllOrders === 6 ? "View All Orders" : "View less Orders"}
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
                      Payment
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
                  {/* {recentOrders.map((order) => ( */}
                  {orders
                    .toReversed()
                    .slice(0, showAllOrders)
                    .map((order) => (
                      <tr key={order.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ORD-#{order.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {order.User.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${order.totalPrice}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            order.paymentStatus === "paid"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-400 text-white"
                          }`}
                          >
                            {order.paymentStatus}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${
                            order.status === "delivered"
                              ? "bg-green-100 text-green-800"
                              : order.status === "confirmed"
                              ? "bg-blue-400 text-white"
                              : "bg-yellow-100 text-gray-800"
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

// "use client";

// import React, { useEffect, useState } from "react";
// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   BarChart,
//   Bar,
//   CartesianGrid,
// } from "recharts";
// import { Users, ShoppingBag, DollarSign, Package } from "lucide-react";
// import { AppDispatch, RootState } from "@/redux/store";
// import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "@/redux/slices/categorySlice";
// import { fetchOrders } from "@/redux/slices/orderSlice";
// import { fetchProducts } from "@/redux/slices/productSlice";
// import useOrder_Sales_Comparison from "@/hooks/useOrder_Sales_Comparison";
// import {
//   Select,
//   SelectTrigger,
//   SelectValue,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// const salesData = [
//   { name: "Jan", sales: 4000 },
//   { name: "Feb", sales: 3000 },
//   { name: "Mar", sales: 5000 },
//   { name: "Apr", sales: 7000 },
//   { name: "May", sales: 6000 },
//   { name: "Jun", sales: 8000 },
// ];

// const revenueData = [
//   { category: "Electronics", revenue: 12000 },
//   { category: "Fashion", revenue: 9000 },
//   { category: "Kitchen", revenue: 7500 },
//   { category: "Beauty", revenue: 6500 },
//   { category: "Care Products", revenue: 5000 },
// ];

// export default function AdminDashboard() {
//   const { currentUser, users } = useSelector((state: RootState) => state.user);
//   const { products } = useSelector((state: RootState) => state.product);
//   const { orders } = useSelector((state: RootState) => state.order);
//   const dispatch: AppDispatch = useDispatch();
//   const [isMobile, setIsMobile] = useState(false);

//   const {
//     currentWeekOrders,
//     orderChange,
//     formattedOrderChange,
//     currentMonthSales,
//     formattedSalesChange,
//     salesChange,
//     formattedCustomerChange,
//     customerChange,
//   } = useOrder_Sales_Comparison(orders, users);

//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => window.removeEventListener("resize", checkScreenSize);
//   }, []);

//   useEffect(() => {
//     dispatch(getCurrentUser());
//     dispatch(fetchUsers());
//     dispatch(fetchCategories());
//     dispatch(fetchOrders());
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-50">
//       {/* Header */}
//       <div className="bg-white shadow-sm sticky top-0 z-10">
//         <div className="px-4 py-3 sm:px-6">
//           <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
//             Dashboard Overview
//           </h1>
//           <p className="text-sm sm:text-base text-gray-600">
//             Welcome back, {currentUser?.name || "Admin"}
//           </p>
//         </div>
//       </div>

//       <div className="flex-1 p-4 sm:p-6 space-y-4 sm:space-y-6">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
//           <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-blue-100 rounded-full">
//                 <DollarSign className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   Total Revenue
//                 </p>
//                 <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   ${currentMonthSales.toFixed(0)}
//                 </h3>
//                 <p
//                   className={`text-xs ${
//                     salesChange >= 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {salesChange >= 0 ? "▲" : "▼"}
//                   {formattedSalesChange} from last month
//                 </p>
//               </div>
//             </div>
//           </Card>

//           <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-green-100 rounded-full">
//                 <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Total Orders</p>
//                 <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   {currentWeekOrders}
//                 </h3>
//                 <p
//                   className={`text-xs ${
//                     orderChange >= 0 ? "text-green-600" : "text-red-600"
//                   }`}
//                 >
//                   {orderChange === 0
//                     ? "No change from last week"
//                     : `${formattedOrderChange} from last week`}
//                 </p>
//               </div>
//             </div>
//           </Card>

//           <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-purple-100 rounded-full">
//                 <Users className="h-5 w-5 sm:h-6 sm:w-6 text-purple-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">
//                   Total Customers
//                 </p>
//                 <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   {users.length}
//                 </h3>
//                 <p className="text-xs text-green-600">
//                   {customerChange !== 0
//                     ? `${formattedCustomerChange} from last month`
//                     : "No new customer for last month"}
//                 </p>
//               </div>
//             </div>
//           </Card>

//           <Card className="p-4 sm:p-6 hover:shadow-lg transition-shadow">
//             <div className="flex items-center space-x-3 sm:space-x-4">
//               <div className="p-2 sm:p-3 bg-yellow-100 rounded-full">
//                 <Package className="h-5 w-5 sm:h-6 sm:w-6 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-xs sm:text-sm text-gray-600">Products</p>
//                 <h3 className="text-xl sm:text-2xl font-bold text-gray-900">
//                   {products.length}
//                 </h3>
//                 <p className="text-xs text-yellow-600">23 low in stock</p>
//               </div>
//             </div>
//           </Card>
//         </div>

//         {/* Charts Section */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
//           <Card className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
//               <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                 Sales Overview
//               </h3>
//               <Select>
//                 <SelectTrigger className="w-full sm:w-32 bg-gray-100 h-8 focus:ring-orange-500">
//                   <SelectValue placeholder="Period" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectItem value="7">Last 7 days</SelectItem>
//                     <SelectItem value="30">Last 30 days</SelectItem>
//                     <SelectItem value="90">Last 90 days</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="h-[250px] sm:h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart data={salesData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Line
//                     type="monotone"
//                     dataKey="sales"
//                     stroke="#4f46e5"
//                     strokeWidth={2}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>

//           <Card className="p-4 sm:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
//               <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//                 Revenue by Category
//               </h3>
//               <Button variant="outline" size="sm" className="w-full sm:w-auto">
//                 Download Report
//               </Button>
//             </div>
//             <div className="h-[250px] sm:h-[300px]">
//               <ResponsiveContainer width="100%" height="100%">
//                 <BarChart data={revenueData}>
//                   <XAxis dataKey="category" />
//                   <YAxis />
//                   <Tooltip />
//                   <Bar dataKey="revenue" fill="#22c55e" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
//           </Card>
//         </div>

//         {/* Recent Orders */}
//         <Card className="p-4 sm:p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4 sm:mb-6">
//             <h3 className="text-base sm:text-lg font-semibold text-gray-800">
//               Recent Orders
//             </h3>
//             <Button variant="outline" size="sm" className="w-full sm:w-auto">
//               View All Orders
//             </Button>
//           </div>
//           <div className="overflow-x-auto">
//             <Table className="min-w-[800px] sm:min-w-full">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Order ID</TableHead>
//                   {!isMobile && <TableHead>Customer</TableHead>}
//                   <TableHead>Amount</TableHead>
//                   <TableHead>Payment</TableHead>
//                   <TableHead>Status</TableHead>
//                   <TableHead>Actions</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {orders
//                   .slice()
//                   .reverse()
//                   .slice(0, 6)
//                   .map((order) => (
//                     <TableRow key={order.id}>
//                       <TableCell className="font-medium">
//                         ORD-#{order.id}
//                       </TableCell>
//                       {!isMobile && (
//                         <TableCell className="truncate max-w-[150px]">
//                           {order.User.name}
//                         </TableCell>
//                       )}
//                       <TableCell>${order.totalPrice}</TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             order.paymentStatus === "paid"
//                               ? "default"
//                               : "destructive"
//                           }
//                         >
//                           {order.paymentStatus}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Badge
//                           variant={
//                             order.status === "delivered"
//                               ? "default"
//                               : order.status === "confirmed"
//                               ? "secondary"
//                               : "outline"
//                           }
//                         >
//                           {order.status}
//                         </Badge>
//                       </TableCell>
//                       <TableCell>
//                         <Button variant="ghost" size="sm">
//                           Details
//                         </Button>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//               </TableBody>
//             </Table>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }
