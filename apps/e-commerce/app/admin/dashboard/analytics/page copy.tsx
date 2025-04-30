// "use client";

// import { Card } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   LineChart,
//   Line,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
// } from "recharts";
// import {
//   TrendingUp,
//   Users,
//   ShoppingBag,
//   DollarSign,
//   Calendar,
//   Download,
// } from "lucide-react";
// import useAnalytics from "./useAnalytics";

// const salesData = [
//   { name: "Jan", sales: 4000, orders: 240 },
//   { name: "Feb", sales: 3000, orders: 180 },
//   { name: "Mar", sales: 5000, orders: 300 },
//   { name: "Apr", sales: 4500, orders: 270 },
//   { name: "May", sales: 6000, orders: 360 },
//   { name: "Jun", sales: 5500, orders: 330 },
// ];

// const categoryData = [
//   { name: "Electronics", value: 35 },
//   { name: "Clothing", value: 25 },
//   { name: "Books", value: 15 },
//   { name: "Home", value: 25 },
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

// export default function AnalyticsPage() {
//   const { revenue, orders } = useAnalytics();
//   return (
//     <div className="p-6 space-y-6">
//       <div className="flex justify-between items-center">
//         <div>
//           <h1 className="text-2xl font-semibold text-gray-800">Analytics</h1>
//           <p className="text-gray-600 mt-1">Monitor your store performance</p>
//         </div>
//         <div className="flex items-center space-x-3">
//           <Button variant="outline" className="flex items-center">
//             <Calendar className="w-4 h-4 mr-2" />
//             Last 30 Days
//           </Button>
//           <Button className="bg-orange-600/95 hover:bg-orange-600/80 transition-all duration-200 flex items-center">
//             <Download className="w-4 h-4 mr-2" />
//             Export Report
//           </Button>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
//         <Card className="p-4">
//           <div className="flex items-center space-x-3">
//             <div className="p-3 bg-blue-100 rounded-full">
//               <DollarSign className="w-5 h-5 text-blue-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">
//                 Total Revenue
//               </h3>
//               <p className="text-2xl font-bold mt-1">
//                 ${revenue.toLocaleString()}
//               </p>
//               <span className="text-green-600 text-sm">
//                 ↑ 12% from last month
//               </span>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center space-x-3">
//             <div className="p-3 bg-green-100 rounded-full">
//               <ShoppingBag className="w-5 h-5 text-green-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">
//                 Total Orders
//               </h3>
//               <p className="text-2xl font-bold mt-1">
//                 {orders.length.toLocaleString()}
//               </p>
//               <span className="text-green-600 text-sm">
//                 ↑ 8% from last month
//               </span>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center space-x-3">
//             <div className="p-3 bg-purple-100 rounded-full">
//               <Users className="w-5 h-5 text-purple-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">
//                 New Customers
//               </h3>
//               <p className="text-2xl font-bold mt-1">321</p>
//               <span className="text-green-600 text-sm">
//                 ↑ 18% from last month
//               </span>
//             </div>
//           </div>
//         </Card>

//         <Card className="p-4">
//           <div className="flex items-center space-x-3">
//             <div className="p-3 bg-yellow-100 rounded-full">
//               <TrendingUp className="w-5 h-5 text-yellow-600" />
//             </div>
//             <div>
//               <h3 className="text-sm font-medium text-gray-500">
//                 Conversion Rate
//               </h3>
//               <p className="text-2xl font-bold mt-1">3.2%</p>
//               <span className="text-green-600 text-sm">
//                 ↑ 2% from last month
//               </span>
//             </div>
//           </div>
//         </Card>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Revenue Overview</h3>
//             <select className="text-sm border rounded-md px-2 py-1">
//               <option>Last 6 months</option>
//               <option>Last 12 months</option>
//               <option>Last 30 days</option>
//             </select>
//           </div>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <LineChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Line
//                   type="monotone"
//                   dataKey="sales"
//                   stroke="#4f46e5"
//                   strokeWidth={2}
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Sales by Category</h3>
//             <Button variant="outline" size="sm">
//               View Details
//             </Button>
//           </div>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <PieChart>
//                 <Pie
//                   data={categoryData}
//                   cx="50%"
//                   cy="50%"
//                   labelLine={false}
//                   outerRadius={80}
//                   fill="#8884d8"
//                   dataKey="value"
//                 >
//                   {categoryData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="flex justify-center space-x-4 mt-4">
//               {categoryData.map((entry, index) => (
//                 <div key={entry.name} className="flex items-center">
//                   <div
//                     className="w-3 h-3 rounded-full mr-2"
//                     style={{ backgroundColor: COLORS[index % COLORS.length] }}
//                   />
//                   <span className="text-sm text-gray-600">{entry.name}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Orders Overview</h3>
//             <Button variant="outline" size="sm">
//               View All
//             </Button>
//           </div>
//           <div className="h-[300px]">
//             <ResponsiveContainer width="100%" height="100%">
//               <BarChart data={salesData}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Bar dataKey="orders" fill="#4f46e5" />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>
//         </Card>

//         <Card className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="text-lg font-semibold">Customer Demographics</h3>
//             <Button variant="outline" size="sm">
//               View Report
//             </Button>
//           </div>
//           <div className="space-y-4">
//             {/* Add demographic charts or statistics here */}
//             <div className="bg-gray-50 p-4 rounded-lg">
//               <h4 className="text-sm font-medium text-gray-600 mb-2">
//                 Age Distribution
//               </h4>
//               {/* Add age distribution chart */}
//             </div>
//           </div>
//         </Card>
//       </div>
//     </div>
//   );
// }

"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import {
  TrendingUp,
  Users,
  ShoppingBag,
  DollarSign,
  Calendar,
  Download,
  Star,
} from "lucide-react";
import useAnalytics from "./useAnalytics";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AnalyticsPage() {
  const {
    // revenue,
    // orders,
    totalCustomers,
    newCustomers,
    conversionRate,
    topProducts,
    salesByCategory,
    monthlySales,
    ageDistribution,

    revenue,
    orders,
    timeRange,
    setTimeRange,
  } = useAnalytics();

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your store performance in real-time
          </p>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <Button
              variant={timeRange === "30days" ? "default" : "outline"}
              onClick={() => setTimeRange("30days")}
            >
              Last 30 Days
            </Button>
            <Button
              variant={timeRange === "all" ? "default" : "outline"}
              onClick={() => setTimeRange("all")}
            >
              All Time
            </Button>
            <Button className="bg-orange-600/95 hover:bg-orange-600/80 flex items-center">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <DollarSign className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Revenue
              </h3>
              <p className="text-2xl font-bold mt-1">
                ${revenue.toLocaleString()}
              </p>
              <span className="text-green-600 text-sm">
                ↑ 12% from last month
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <ShoppingBag className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Orders
              </h3>
              <p className="text-2xl font-bold mt-1">
                {orders?.length.toLocaleString()}
              </p>
              <span className="text-green-600 text-sm">
                ↑ 8% from last month
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-purple-100 rounded-full">
              <Users className="w-5 h-5 text-purple-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                New Customers
              </h3>
              <p className="text-2xl font-bold mt-1">{newCustomers}</p>
              <span className="text-green-600 text-sm">
                ↑ 18% from last month
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <TrendingUp className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Conversion Rate
              </h3>
              <p className="text-2xl font-bold mt-1">{conversionRate}%</p>
              <span className="text-green-600 text-sm">
                ↑ 2% from last month
              </span>
            </div>
          </div>
        </Card>
      </div>
      {/*
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <select className="text-sm border rounded-md px-2 py-1">
              <option>Last 12 months</option>
              <option>Last 6 months</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip formatter={(value) => [`$${value}`, "Revenue"]} />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4f46e5"
                  strokeWidth={2}
                  name="Revenue"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sales by Category</h3>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value, name, props) => [
                    `$${value}`,
                    props.payload.name,
                  ]}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Orders Overview</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="orders" fill="#4f46e5" name="Orders" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            <Button variant="outline" size="sm">
              View All
            </Button>
          </div>
          <div className="h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Units Sold</TableHead>
                  <TableHead>Revenue</TableHead>
                  <TableHead>Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{product.totalSold}</TableCell>
                    <TableCell>${product.revenue.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500 mr-1" />
                        {product?.ratings?.toFixed(1) || "N/A"}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Customer Demographics</h3>
            <Button variant="outline" size="sm">
              View Report
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ageDistribution}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" name="Customers" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Customer Growth</h3>
            <Button variant="outline" size="sm">
              View Details
            </Button>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlySales}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#00C49F"
                  strokeWidth={2}
                  name="New Customers"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      */}
    </div>
  );
}
