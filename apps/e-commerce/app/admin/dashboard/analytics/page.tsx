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
              variant={timeRange === "30" ? "default" : "outline"}
              onClick={() => setTimeRange("30")}
            >
              Last 30 Days
            </Button>
            <Button
              variant={timeRange === "all" ? "default" : "outline"}
              onClick={() => setTimeRange("all")}
            >
              All Time
            </Button>
            <Button
              onClick={() => {
                console.log(currentMonthOrder, lastMonthOrder);
              }}
              className="bg-orange-600/95 hover:bg-orange-600/80 flex items-center"
            >
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Revenue Overview</h3>
            <Select
              onValueChange={(value) => setSelectedPeriod(value)}
              value={selectedPeriod}
            >
              <SelectTrigger className="w-32 bg-gray-100 h-8 focus:ring-orange-500">
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
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={handleSales(selectedPeriod)}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} tickMargin={10} />
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

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Sales by Category</h3>
            <div className="flex space-x-2">
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
              <Button variant="outline" size="sm">
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
                  <Legend
                    formatter={(value, entry, index) => (
                      <span className="text-sm">
                        {value} ($
                        {salesByCategory[index]?.value.toLocaleString()})
                      </span>
                    )}
                  />
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

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
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
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>

          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartType === "day" ? dailyOrders : monthlyOrders}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
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
              {growthPercentage}% from previous period
            </div>
          </div>
        </Card>

        <Card className="p-6">
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
            <div className="flex space-x-2">
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
                <Users className="w-4 h-4 mr-2" />
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

        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
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
                <SelectTrigger className="w-32">
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
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={ageDistribution}
                // layout={
                //   demographicView === "location" ? "vertical" : "horizontal"
                // }
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis
                  // dataKey={demographicView === "location" ? "value" : "name"}
                  dataKey={"name"}
                  tick={{ fontSize: 12 }}
                />
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
