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
  FileText,
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function AnalyticsPage() {
  const {
    totalCustomers,
    newCustomers,
    conversionRate,
    formattedCustomerChange,
    customerChange,
    ageDistribution,

    topProducts,
    salesByCategory,
    handleSales,

    orders,
    formattedOrderChange,
    orderChange,
    currentMonthOrder,
    lastMonthOrder,

    revenue,
    formattedSalesChange,
    salesChange,
    monthlySales,

    timeRange,
    setTimeRange,
    selectedPeriod,
    setSelectedPeriod,

    /////BarChart
    chartType,
    dailyOrders,
    monthlyOrders,
    setChartType,
    totalOrders,
    growthPercentage,
    topProductSlice,

    monthlyCustomerData,
    customerGrowthPercentage,
    totalCustomerss,
  } = useAnalytics();

  return (
    <div className="py-4 sm:px-6 sm:py-6 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center px-3 sm:px-0">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Analytics Dashboard
          </h1>
          <p className="text-gray-600 mt-1">
            Monitor your store performance in real-time
          </p>
        </div>

        <div className="flex justify-between w-full items-center">
          <Select
            onValueChange={(value) => setTimeRange(value)}
            value={timeRange}
          >
            <SelectTrigger className="w-32 bg-card text-[15px] h-8 focus:ring-orange-500">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="30">Last 30 Days</SelectItem>
                <SelectItem value="all">All Time</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button
            onClick={() => {
              console.log(currentMonthOrder, lastMonthOrder);
            }}
            className="bg-orange-600/95 h-8 hover:bg-orange-600/80 flex items-center"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className=" hidden sm:grid grid-cols-1 md:grid-cols-4 gap-4 ">
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
                KES {revenue.toLocaleString()}
              </p>
              <span
                className={`text-green-600 text-sm ${
                  salesChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {salesChange === 0
                  ? "N/A from last month"
                  : `${formattedSalesChange} from last month`}
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
              <span
                className={`text-green-600 text-sm ${
                  orderChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {orderChange === 0
                  ? "No change from last week"
                  : `${formattedOrderChange} from last month`}
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
              <p className="text-2xl font-bold mt-1">
                {newCustomers.toLocaleString()}
              </p>
              <span
                className={`text-green-600 text-sm ${
                  customerChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {customerChange !== 0
                  ? `${formattedCustomerChange} from last month`
                  : "No new customer for last month"}
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

      <div className=" block sm:hidden px-3 sm:px-0">
        <div className=" grid grid-cols-2 gap-3">
          <Card className=" px-3 rounded-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
            <div className="flex gap-3 items-center">
              <p className=" text-[16px] sm:text-2xl font-bold mt-1">
                KES {revenue.toLocaleString()}
              </p>
              <span
                className={`text-green-600 text-sm ${
                  salesChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {salesChange === 0
                  ? "N/A from last month"
                  : `${formattedSalesChange}`}
              </span>
            </div>
          </Card>
          <Card className=" px-3 rounded-sm">
            <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
            <div className="flex gap-2 items-center">
              <p className="text-[16] sm:text-2xl font-bold mt-1">
                {orders?.length.toLocaleString()}
              </p>
              <span
                className={`text-green-600 text-sm ${
                  orderChange >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {orderChange === 0
                  ? "No change from last week"
                  : `${formattedOrderChange}`}
              </span>
            </div>
          </Card>
          <Card className=" px-3 rounded-sm">
            <h3 className="text-sm font-medium text-gray-500">New Customers</h3>
            <div className="flex gap-2 items-center">
              <p className="text-[16px] sm:text-2xl font-bold mt-1">
                {newCustomers.toLocaleString()}
              </p>
              <span
                className={`text-green-600 text-sm ${
                  customerChange > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {customerChange !== 0 ? `${formattedCustomerChange}` : "▼"}
              </span>
            </div>
          </Card>
          <Card className=" px-3 rounded-sm">
            <h3 className="text-sm font-medium text-gray-500">
              Conversion Rate
            </h3>
            <div className="flex items-center gap-3">
              <p className="text-[17px] sm:text-2xl font-bold mt-1">
                {conversionRate}%
              </p>
              <span className="text-green-600 text-sm">↑ 2%</span>
            </div>
          </Card>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="px-3 sm:px-6 py-5 rounded-none sm:rounded-md ">
          <div className="flex justify-between items-center mb-4">
            <h3 className="sm:text-lg text-[17px] font-semibold">
              Revenue Overview
            </h3>
            <Select
              onValueChange={(value) => setSelectedPeriod(value)}
              value={selectedPeriod}
            >
              <SelectTrigger className="w-32 bg-gray-100 h-7 text-[15px] sm:h-8 focus:ring-orange-500">
                <SelectValue placeholder="Select period" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="12">Last 12 months</SelectItem>
                  <SelectItem value="6">Last 6 months</SelectItem>
                  <SelectItem value="30">Last 30 days</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%" className="">
              <LineChart
                data={handleSales(selectedPeriod)}
                width={100}
                className=""
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis
                  tickFormatter={(value) => `KSH ${value}`}
                  tick={{ fontSize: 11 }}
                />
                <Tooltip
                  formatter={(value) => [`KSH ${value}`, "Revenue"]}
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

        <Card className="py-5 px-3 sm:px-6 rounded-none sm:rounded-md">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between sm:items-center mb-4">
            <h3 className="text-lg font-semibold">Sales by Category</h3>
            <div className="flex space-x-2 w-full">
              <Select

              //  value={timeRange} onValueChange={setTimeRange}
              >
                <SelectTrigger className="w-32 h-[31px] focus:ring-orange-500/85">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-white"
              >
                View Details
              </Button>
            </div>
          </div>

          {salesByCategory.length > 0 ? (
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name}: ${(percent * 100).toFixed(1)}%`
                    }
                    labelLine={false}
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
                      `$${Number(value).toLocaleString()}`,
                      `${props.payload.name}`,
                      `Products: ${props.payload.productCount}`,
                      `Orders: ${props.payload.orderCount}`,
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      padding: "12px",
                      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    }}
                  />
                  {/* <Legend
                    formatter={(value, entry, index) => (
                      <span className="text-sm">
                        {value} (ksh
                        {salesByCategory[index]?.value.toLocaleString()})
                      </span>
                    )}
                  /> */}
                  {window.innerWidth < 640 && (
                    <Legend
                      layout="horizontal"
                      verticalAlign="bottom"
                      align="center"
                      wrapperStyle={{
                        // paddingTop: "20px",
                        fontSize: window.innerWidth < 400 ? "14px" : "15px",
                      }}
                      formatter={(value, entry, index) => (
                        <span className="">
                          {value} (ksh
                          {salesByCategory[index]?.value.toLocaleString()})
                        </span>
                      )}
                    />
                  )}
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="h-[300px] flex flex-col items-center justify-center text-gray-500">
              <ShoppingBag className="w-12 h-12 mb-4" />
              <p>No sales data available by category</p>
              <p className="text-sm">
                Sales will appear here once orders are placed
              </p>
            </div>
          )}
        </Card>

        <Card className="py-3 sm:py-5 rounded-none sm:rounded-md px-3 sm:px-0">
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-0 justify-between sm:items-center mb-4">
            <h3 className="text-lg font-semibold">Orders Overview</h3>
            <div className="flex space-x-2">
              <Select
                value={timeRange}
                onValueChange={(value) => {
                  setTimeRange(value);
                  setChartType(value === "30" ? "day" : "month");
                }}
              >
                <SelectTrigger className="w-32 h-[31px] focus:ring-orange-500/85">
                  <SelectValue placeholder="Time Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="30">Last 30 Days</SelectItem>
                  <SelectItem value="90">Last 90 Days</SelectItem>
                  <SelectItem value="365">Last Year</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="sm"
                className="bg-orange-500 text-card"
              >
                View All
              </Button>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                width={100}
                className="w-full"
                data={chartType === "day" ? dailyOrders : monthlyOrders}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
                // domain={['dataMin', 'dataMax']}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
                <YAxis
                  tick={{ fontSize: 12 }}
                  tickFormatter={(value) =>
                    Math.floor(value) === value ? value : ""
                  }
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                  }}
                  formatter={(value) => [`${value} orders`]}
                />
                <Legend />
                <Bar
                  dataKey="orders"
                  name="Orders"
                  fill="#4f46e5"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                >
                  {chartType === "day"
                    ? dailyOrders.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.orders > 0 ? "#4f46e5" : "#e5e7eb"}
                        />
                      ))
                    : monthlyOrders.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.orders > 0 ? "#4f46e5" : "#e5e7eb"}
                        />
                      ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
            <div>
              <span className="font-medium">Total Orders: </span>
              {totalOrders.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Avg Daily: </span>
              {Math.round(
                totalOrders /
                  (timeRange === "30" ? 30 : timeRange === "all" ? 90 : 365)
              )}
            </div>
            <div className="flex items-center text-green-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              {/* {growthPercentage}% from previous period */}
              {growthPercentage}%
            </div>
          </div>
        </Card>

        <Card className="px-5 sm:px-0 py-5 rounded-none sm:rounded-md">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Top Selling Products</h3>
            <Button
              onClick={() => {
                // topProductSlice = 10;
              }}
              variant="outline"
              size="sm"
            >
              View All
            </Button>
          </div>
          <div className="h-[300px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead className=" whitespace-nowrap">
                    Units Sold
                  </TableHead>
                  <TableHead className=" whitespace-nowrap">Revenue</TableHead>
                  <TableHead className=" whitespace-nowrap">Rating</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium whitespace-nowrap">
                      {product.name}
                    </TableCell>
                    <TableCell className=" whitespace-nowrap">
                      {product.totalSold}
                    </TableCell>
                    <TableCell className=" whitespace-nowrap">
                      KES {product.revenue.toLocaleString()}
                    </TableCell>
                    <TableCell className=" whitespace-nowrap">
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

        <Card className="py-4 sm:py-5 px-3 sm:px-5 rounded-none sm:rounded-md">
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Customer Growth</h3>
              <p className="text-sm text-gray-500">
                {customerGrowthPercentage >= 0 ? (
                  <span className="text-green-600">
                    ↑ {customerGrowthPercentage}% from last month
                  </span>
                ) : (
                  <span className="text-red-600">
                    ↓ {Math.abs(customerGrowthPercentage)}% from last month
                  </span>
                )}
              </p>
            </div>
            <div className="flex  gap-2 sm:gap-0  sm:space-x-2">
              <Select value={`12`} onValueChange={setTimeRange}>
                <SelectTrigger className="w-28 h-[31px] focus:ring-orange-500/85">
                  <SelectValue placeholder="Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 Months</SelectItem>
                  <SelectItem value="6">6 Months</SelectItem>
                  <SelectItem value="12">12 Months</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Users className="w-4 h-4 sm:mr-2" />
                View Details
              </Button>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={monthlyCustomerData.slice(-Number(timeRange))}
                margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                  formatter={(value) => [`${value} new customers`]}
                  labelFormatter={(label) => `Month: ${label}`}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="customers"
                  name="New Customers"
                  stroke="#00C49F"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6, fill: "#00C49F" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 flex justify-between text-sm text-gray-600">
            <div>
              <span className="font-medium">Total Customers: </span>
              {totalCustomerss.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Avg Monthly: </span>
              {Math.round(
                monthlyCustomerData
                  .slice(-Number(timeRange))
                  .reduce((sum, month) => sum + month.customers, 0) /
                  Number(timeRange)
              )}
            </div>
          </div>
        </Card>

        <Card className="py-5 px-3 sm:px-5 hidden">
          <div className="flex flex-col gap-2 sm:gap-0 sm:flex-row sm:justify-between sm:items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">Customer Demographics</h3>
              <p className="text-sm text-gray-500">
                {totalCustomers} customers analyzed
              </p>
            </div>
            <div className="flex space-x-2">
              <Select
              // value={demographicView}
              // onValueChange={setDemographicView}
              >
                <SelectTrigger className="w-32 h-8">
                  <SelectValue placeholder="View" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="age">Age</SelectItem>
                  <SelectItem value="gender">Gender</SelectItem>
                  <SelectItem value="location">Location</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <FileText className="w-4 h-4 mr-2" />
                View Report
              </Button>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer className="" width="100%" height="100%">
              <BarChart
                data={ageDistribution}
                // layout={
                //   demographicView === "location" ? "vertical" : "horizontal"
                // }
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey={"name"} tick={{ fontSize: 12 }} />
                <YAxis
                  // dataKey={demographicView === "location" ? "name" : "value"}
                  dataKey={"name"}
                  tick={{ fontSize: 12 }}
                  // width={demographicView === "location" ? 100 : undefined}
                  width={100}
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                    border: "none",
                  }}
                  formatter={(value, name, props) => [
                    `${value} customers (${props.payload.percentage}%)`,
                    props.payload.name,
                  ]}
                />
                <Legend />
                <Bar
                  dataKey="value"
                  name="Customers"
                  fill="#8884d8"
                  radius={[4, 4, 0, 0]}
                >
                  {ageDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28DFF"][
                          index % 5
                        ]
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-4 grid grid-cols-5 gap-2">
            {ageDistribution.map((group) => (
              <div key={group.name} className="text-center">
                <p className="font-medium">{group.name}</p>
                <p className="text-sm text-gray-600">
                  {/* {group.value} ({group.percentage}%) */}
                  {group.value} ({10}%)
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
