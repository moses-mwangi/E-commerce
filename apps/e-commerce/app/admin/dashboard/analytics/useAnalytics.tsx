import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { fetchUsers, getCurrentUser } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  endOfMonth,
  format,
  isSameDay,
  isSameMonth,
  isWithinInterval,
  startOfMonth,
  subDays,
  subMonths,
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function useAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("6");

  const { users } = useSelector((state: RootState) => state.user);
  const { products } = useSelector((state: RootState) => state.product);
  const { orders } = useSelector((state: RootState) => state.order);
  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();
  const [timeRange, setTimeRange] = useState<"30" | "all" | string>("all");
  const [chartType, setChartType] = useState<"day" | "month">("month");

  useEffect(() => {
    dispatch(getCurrentUser());
    dispatch(fetchUsers());
    dispatch(fetchCategories());
    dispatch(fetchOrders());
    dispatch(fetchProducts());
  }, [dispatch]);

  //////////// ORDERS IMPLEMENTATIONS
  const currentMonth = new Date();
  const previousMonth = subMonths(currentMonth, 1);

  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);

  const startOfLastMonth = startOfMonth(previousMonth);
  const endOfLastMonth = endOfMonth(previousMonth);

  const getMonthlyOrders = (start: Date, end: Date) => {
    const monthOrder = orders.filter((order) => {
      const matchedOrder = isWithinInterval(new Date(order.createdAt), {
        start: start,
        end: end,
      });

      return matchedOrder;
    });

    return monthOrder;
  };

  const currentMonthOrder = getMonthlyOrders(
    startOfCurrentMonth,
    endOfCurrentMonth
  );
  const lastMonthOrder = getMonthlyOrders(startOfLastMonth, endOfLastMonth);

  const orderChange = Math.floor(
    lastMonthOrder
      ? ((currentMonthOrder.length - lastMonthOrder.length) /
          lastMonthOrder.length) *
          100
      : 0
  );

  const formattedOrderChange = lastMonthOrder
    ? currentMonthOrder.length === 0
      ? "-100%"
      : currentMonthOrder.length >= lastMonthOrder.length * 2
      ? `▲ ${(currentMonthOrder.length / lastMonthOrder.length > 0
          ? lastMonthOrder.length
          : 1
        ).toFixed(1)}x`
      : lastMonthOrder.length >= currentMonthOrder.length * 2
      ? `▼ ${(lastMonthOrder.length / currentMonthOrder.length).toFixed(1)}x`
      : `${orderChange > 0 ? `+${orderChange}` : orderChange}%`
    : "N/A";

  const ordersByRange = timeRange === "all" ? orders : currentMonthOrder;

  //////////// SALES REVENUE

  const getMonthlySales = (start: Date, end: Date) => {
    const monthSales = orders
      .filter((order) => {
        const matchedOrder = isWithinInterval(new Date(order.createdAt), {
          start: start,
          end: end,
        });

        return matchedOrder;
      })
      .reduce((total, order) => total + order.totalPrice, 0);

    return monthSales;
  };

  const currentMonthSales = getMonthlySales(
    startOfCurrentMonth,
    endOfCurrentMonth
  );

  const previousMonthSales = getMonthlySales(startOfLastMonth, endOfLastMonth);
  const salesChange = Math.floor(
    previousMonthSales
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : 0
  );

  const formattedSalesChange = previousMonthSales
    ? currentMonthSales === 0
      ? "-100%"
      : currentMonthSales >= previousMonthSales * 2
      ? `▲ ${(currentMonthSales / previousMonthSales).toFixed(1)}h`
      : previousMonthSales >= currentMonthSales * 2
      ? `▼ ${(previousMonthSales / currentMonthSales).toFixed(1)}x`
      : `${salesChange > 0 ? `+${salesChange}` : salesChange}%`
    : "N/A";

  const revenue =
    ordersByRange
      ?.filter((el) => el.paymentStatus.toLowerCase() === "paid")
      ?.map((el) => el.totalPrice)
      ?.reduce((val, arr) => val + arr, 0) || 0;

  //////////// USERS IMPLEMENTATIONS
  const totalCustomers = users?.length || 0;
  const newCustomers =
    users?.filter((user) => {
      const createdDate = String(user.createdAt);
      const createdAt = isWithinInterval(createdDate, {
        start: startOfCurrentMonth,
        end: endOfCurrentMonth,
      });

      return createdAt;
    }).length || 0;

  const lastMonthNewCustomers =
    users?.filter((user) => {
      const createdDate = String(user.createdAt);
      const createdAt = isWithinInterval(createdDate, {
        start: startOfLastMonth,
        end: endOfLastMonth,
      });

      return createdAt;
    }).length || 0;

  const customerChange = lastMonthNewCustomers
    ? Math.floor(
        ((newCustomers - lastMonthNewCustomers) / lastMonthNewCustomers) * 100
      )
    : 0;

  const formattedCustomerChange = lastMonthNewCustomers
    ? newCustomers === 0
      ? "-100%"
      : newCustomers >= lastMonthNewCustomers * 2
      ? `▲ ${(newCustomers / lastMonthNewCustomers).toFixed(1)}h`
      : lastMonthNewCustomers >= newCustomers * 2
      ? `▼ ${(lastMonthNewCustomers / newCustomers).toFixed(1)}x`
      : `${customerChange > 0 ? `+${customerChange}` : customerChange}%`
    : "N/A";

  const userIdsWhoOrdered = new Set(orders.map((order) => order.userId));
  const totalUsers = users.length;

  const rawRate =
    totalUsers > 0 ? (userIdsWhoOrdered.size / totalUsers) * 100 : 0;

  const conversionRate = Math.min(Math.max(rawRate, 0), 100).toFixed(1);

  //////////// GET TOP SELLING PRODUCTS

  const topProductSlice = 7;

  const topProducts =
    products
      ?.map((product) => {
        const productOrders =
          ordersByRange?.filter(
            (order) =>
              order.OrderItems.some((item) => item.productId === product.id) &&
              order.paymentStatus.toLowerCase() === "paid"
          ) || [];

        const totalSold = productOrders.reduce((sum, order) => {
          const item = order.OrderItems.find(
            (item) => item.productId === product.id
          );

          return sum + (item?.quantity || 0);
        }, 0);

        return {
          ...product,
          totalSold,
          revenue: totalSold * product.price,
        };
      })
      ?.sort((a, b) => b.totalSold - a.totalSold)
      ?.slice(0, topProductSlice) || [];

  ////// GET SALES BY CATEGORY

  const salesByCategory =
    categories
      ?.map((category) => {
        const categoryProducts =
          products?.filter(
            (pro) =>
              pro.category.toLowerCase() === category.name.toLowerCase() ||
              pro.category === category.name
          ) || [];

        const categoryRevenue = categoryProducts.reduce((sum, product) => {
          const productOrders = orders
            .filter(
              (order) =>
                order.paymentStatus.toLowerCase() === "paid" &&
                order.OrderItems.some((item) => item.productId === product.id)
            )
            .filter((ord) => ord.paymentStatus.toLowerCase() === "paid");

          return (
            sum +
            productOrders.reduce((orderSum, order) => {
              const item = order.OrderItems.find(
                (item) => item.productId === product.id
              );
              console.log(item);

              return orderSum + (item?.quantity || 0) * product.price;
            }, 0)
          );
        }, 0);

        return {
          name: category.name,
          value: categoryRevenue,
          productCount: categoryProducts.length,
          orderCount: orders.filter(
            (order) =>
              order.paymentStatus.toLowerCase() === "paid" &&
              order.OrderItems.some((item) =>
                categoryProducts.some((p) => p.id === item.productId)
              )
          ).length,
        };
      })
      .filter((category) => category.value > 0) || [];

  ///// GET MONTHLY SELLS
  const paidOrders =
    orders?.filter((el) => el.paymentStatus.toLowerCase() === "paid") || [];

  const handleSales = (daysAgo: number | string) => {
    const startDate = subDays(new Date(), Number(daysAgo));
    const endDate = new Date();

    const filteredOrders = paidOrders.filter((order) =>
      isWithinInterval(new Date(order.createdAt), {
        start: startDate,
        end: endDate,
      })
    );

    if (Number(daysAgo) === 30) {
      return groupByDay(filteredOrders);
    } else {
      return groupByMonth(filteredOrders, Number(daysAgo));
    }
  };

  const groupByDay = (orders: typeof paidOrders) => {
    const dailyData: Record<string, number> = {};

    orders.forEach((order) => {
      const dateStr = format(new Date(order.createdAt), "MMM dd");
      dailyData[dateStr] = (dailyData[dateStr] || 0) + order.totalPrice;
    });

    //////// Filling The Missing Days
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

  const groupByMonth = (orders: typeof paidOrders, monthsAgo: number) => {
    const monthlyData: Record<string, number> = {};

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      const monthStr = format(date, "MMM yyyy");
      monthlyData[monthStr] = (monthlyData[monthStr] || 0) + order.totalPrice;
    });

    //////// Filling The Missing Months
    const result = [];
    const now = new Date();
    for (let i = 0; i < monthsAgo; i++) {
      const date = new Date(now);
      date.setMonth(date.getMonth() - i);
      const monthStr = format(date, "MMM yyyy");
      result.unshift({
        name: monthStr.split(" ")[0],
        sales: monthlyData[monthStr] || 0,
        // customers: uniqueCustomers,
      });
    }

    return result;
  };

  const monthlySales = Array(12)
    .fill(0)
    .map((_, index) => {
      const monthOrders = orders.filter(
        (order) => new Date(order.createdAt).getMonth() === index
      );

      // Count UNIQUE customers (not orders)
      const uniqueCustomers = new Set(monthOrders.map((order) => order.userId))
        .size;

      return {
        name: new Date(0, index).toLocaleString("default", { month: "short" }),
        sales: monthOrders.reduce((sum, o) => sum + o.totalPrice, 0),
        orders: monthOrders.length,
        customers: uniqueCustomers,
      };
    });

  const getCustomerGrowthData = () => {
    // Group orders by month and count unique customers
    const monthlyData = Array(12)
      .fill(0)
      .map((_, index) => {
        const monthStart = new Date();
        monthStart.setMonth(monthStart.getMonth() - (11 - index)); // Last 12 months

        const monthOrders = orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return (
            orderDate.getMonth() === monthStart.getMonth() &&
            orderDate.getFullYear() === monthStart.getFullYear()
          );
        });

        // Get unique customer IDs
        const uniqueCustomers = new Set(
          monthOrders.map((order) => order.userId || order.userId)
        ).size;

        return {
          name: monthStart.toLocaleString("default", { month: "short" }),
          customers: uniqueCustomers,
          orders: monthOrders.length,
          month: monthStart.getMonth(),
          year: monthStart.getFullYear(),
        };
      });

    const prevYearCustomers = monthlyData.map((month) => {
      const prevYearMonth = orders.filter(
        (o) =>
          new Date(o.createdAt).getMonth() === month.month &&
          new Date(o.createdAt).getFullYear() === month.year - 1
      );
      return {
        ...month,
        prevYearCustomers: new Set(prevYearMonth.map((o) => o.userId)).size,
      };
    });

    const currentMonth = monthlyData[11].customers;
    const previousMonth = monthlyData[10].customers;
    const growthPercentage =
      previousMonth > 0
        ? Math.round(((currentMonth - previousMonth) / previousMonth) * 100)
        : currentMonth > 0
        ? 100
        : 0;

    return {
      monthlyCustomerData: monthlyData,
      customerGrowthPercentage: growthPercentage,
      totalCustomerss: new Set(orders.map((o) => o.userId || o.userId)).size,
    };
  };
  const { monthlyCustomerData, customerGrowthPercentage, totalCustomerss } =
    getCustomerGrowthData();

  //////////////// BARCHART SALES

  const dailyOrders = useMemo(() => {
    const days = Number(timeRange);
    const result = [];

    for (let i = days - 1; i >= 0; i--) {
      const date = subDays(new Date(), i);
      const dateStr = format(date, "MMM dd");

      const dayOrders = orders.filter((order) =>
        isSameDay(new Date(order.createdAt), date)
      );

      result.push({
        name: dateStr,
        orders: dayOrders.length,
        date: date,
      });
    }

    return result;
  }, [orders, timeRange]);

  const monthlyOrders = useMemo(() => {
    const months =
      Number(timeRange) === 365
        ? 12
        : Number(timeRange) === 90
        ? 3
        : Number(timeRange) === 30
        ? 1
        : 12;

    const result = [];

    for (let i = months - 1; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthStr = format(date, "MMM yyyy");

      const monthOrders = orders.filter((order) =>
        isSameMonth(new Date(order.createdAt), date)
      );

      result.push({
        name: format(date, "MMM"),
        orders: monthOrders.length,
        fullMonth: monthStr,
      });
    }

    return result;
  }, [orders, timeRange]);

  const totalOrders = useMemo(() => {
    return (chartType === "day" ? dailyOrders : monthlyOrders).reduce(
      (sum, item) => sum + item.orders,
      0
    );
  }, [dailyOrders, monthlyOrders, chartType]);

  const growthPercentage = useMemo(() => {
    const currentOrders = (
      chartType === "day" ? dailyOrders : monthlyOrders
    ).reduce((sum, item) => sum + item.orders, 0);

    const previousOrders = () => {
      const currentDate = new Date();

      if (chartType === "day") {
        const previousStart = subDays(currentDate, Number(timeRange) * 2);
        const previousEnd = subDays(currentDate, Number(timeRange));

        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return isWithinInterval(orderDate, {
            start: previousStart,
            end: previousEnd,
          });
        }).length;
      } else {
        const months =
          Number(timeRange) === 365 ? 12 : Number(timeRange) === 90 ? 3 : 1;

        const previousStart = subMonths(currentDate, months * 2);
        const previousEnd = subMonths(currentDate, months);

        return orders.filter((order) => {
          const orderDate = new Date(order.createdAt);
          return isWithinInterval(orderDate, {
            start: previousStart,
            end: previousEnd,
          });
        }).length;
      }
    };

    if (previousOrders() === 0) {
      return currentOrders === 0 ? 0 : 100;
    }

    return Math.round(
      ((currentOrders - previousOrders()) / previousOrders()) * 100
    );
  }, [chartType, dailyOrders, monthlyOrders, timeRange, orders]);

  // const ageDistribution = [
  //   { name: "18-24", value: 15 },
  //   { name: "25-34", value: 35 },
  //   { name: "35-44", value: 25 },
  //   { name: "45-54", value: 15 },
  //   { name: "55+", value: 10 },
  // ];

  const getAgeDistribution = () => {
    const currentYear = new Date().getFullYear();

    const distribution = [
      { name: "18-24", min: 18, max: 24, count: 0 },
      { name: "25-34", min: 25, max: 34, count: 0 },
      { name: "35-44", min: 35, max: 44, count: 0 },
      { name: "45-54", min: 45, max: 54, count: 0 },
      { name: "55+", min: 55, max: 999, count: 0 },
    ];

    users.forEach((user) => {
      let age: number;

      if (user.birthDate) {
        const birthYear = new Date(user.birthDate).getFullYear();
        age = currentYear - birthYear;
      } else if (user.age) {
        age = user.age;
      } else {
        return;
      }

      const bracket = distribution.find((b) => age >= b.min && age <= b.max);
      if (bracket) bracket.count++;
    });

    return distribution.map((bracket) => ({
      name: bracket.name,
      value: bracket.count,
      percentage:
        users.length > 0
          ? ((bracket.count / users.length) * 100).toFixed(1)
          : "0",
    }));
  };

  const ageDistribution = getAgeDistribution();

  return {
    totalCustomers,
    newCustomers,
    conversionRate,
    formattedCustomerChange,
    customerChange,
    ageDistribution,

    topProducts,

    orders: ordersByRange,
    formattedOrderChange,
    orderChange,
    currentMonthOrder,
    lastMonthOrder,

    revenue,
    formattedSalesChange,
    salesChange,
    salesByCategory,
    handleSales,
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
  };
}
