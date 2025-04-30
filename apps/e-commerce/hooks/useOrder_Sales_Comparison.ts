import { useMemo, useState } from "react";
import {
  startOfWeek,
  subWeeks,
  isAfter,
  isBefore,
  format,
  subMonths,
  isThisMonth,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";

interface Compare {
  orders: any[];
}

const useOrder_Sales_Comparison = (orders: any[], users: any[]) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  ////////////SALES
  const getMonthlySales = (month: Date) => {
    return orders
      .filter((order) => {
        const matchedDate =
          format(new Date(order.createdAt), "yyyy-MM") ===
            format(month, "yyyy-MM") &&
          order.paymentStatus.toLowerCase() === "paid";

        return matchedDate;
      })
      .reduce((total, order) => total + order.totalPrice, 0);
  };

  const revenue =
    orders
      ?.filter((el) => el.paymentStatus.toLowerCase() === "paid")
      ?.map((el) => el.totalPrice)
      ?.reduce((val, arr) => val + arr, 0) || 0;

  const previousMonth = subMonths(currentMonth, 1);

  const currentMonthSales = getMonthlySales(currentMonth);
  const previousMonthSales = getMonthlySales(previousMonth);
  const salesChange = Math.floor(
    previousMonthSales
      ? ((currentMonthSales - previousMonthSales) / previousMonthSales) * 100
      : 0
  );

  const formattedSalesChange = previousMonthSales
    ? currentMonthSales >= previousMonthSales * 2
      ? `${(currentMonthSales / previousMonthSales).toFixed(1)}x`
      : `${salesChange}%`
    : "N/A";

  //////////////////////  ORDERS
  const startOfThisWeek = useMemo(
    () => startOfWeek(new Date(), { weekStartsOn: 0 }),
    []
  );

  const startOfLastWeek = useMemo(
    () => subWeeks(startOfThisWeek, 1),
    [startOfThisWeek]
  );

  const { currentWeekOrders, previousWeekOrders } = useMemo(() => {
    const current = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return isAfter(orderDate, startOfThisWeek);
    });

    const previous = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        isAfter(orderDate, startOfLastWeek) &&
        isBefore(orderDate, startOfThisWeek)
      );
    });

    return {
      currentWeekOrders: current.length,
      previousWeekOrders: previous.length,
    };
  }, [orders, startOfThisWeek, startOfLastWeek]);

  const orderChange = Math.floor(
    previousWeekOrders
      ? ((currentWeekOrders - previousWeekOrders) / previousWeekOrders) * 100
      : 0
  );

  const formattedOrderChange = previousWeekOrders
    ? currentWeekOrders === 0
      ? "-100%"
      : currentWeekOrders >= previousWeekOrders * 2
      ? `${(currentWeekOrders / previousWeekOrders).toFixed(1)}x`
      : previousWeekOrders >= currentWeekOrders * 2
      ? `${(previousWeekOrders / currentWeekOrders).toFixed(1)}x`
      : `${orderChange > 0 ? `+${orderChange}` : orderChange}%`
    : "N/A";

  ///////////////////////////////CUSTOMERS FILTERS

  const now = new Date();
  const startOfCurrentMonth = startOfMonth(now);
  const endOfCurrentMonth = endOfMonth(now);
  const startOfLastMonth = startOfMonth(subMonths(now, 1));
  const endOfLastMonth = endOfMonth(subMonths(now, 1));

  // Filter users based on their created date
  const currentMonthCustomers = users.filter((user) =>
    isWithinInterval(new Date(user.createdAt), {
      start: startOfCurrentMonth,
      end: endOfCurrentMonth,
    })
  ).length;

  const previousMonthCustomers = users.filter((user) =>
    isWithinInterval(new Date(user.createdAt), {
      start: startOfLastMonth,
      end: endOfLastMonth,
    })
  ).length;

  const customerChanges = previousMonthCustomers
    ? Math.floor((currentMonthCustomers - previousMonthCustomers) * 100)
    : 0;

  const customerChange = previousMonthCustomers
    ? Math.floor(
        ((currentMonthCustomers - previousMonthCustomers) /
          previousMonthCustomers) *
          100
      )
    : 0;

  const formattedCustomerChange = previousMonthCustomers
    ? currentMonthCustomers === 0
      ? "-100%" // No new customers this month
      : currentMonthCustomers >= previousMonthCustomers * 2
      ? `${(currentMonthCustomers / previousMonthCustomers).toFixed(1)}x`
      : previousMonthCustomers >= currentMonthCustomers * 2
      ? `${(previousMonthCustomers / currentMonthCustomers).toFixed(1)}x`
      : `${customerChange > 0 ? `+${customerChange}` : customerChange}%`
    : "N/A";

  return {
    currentWeekOrders,
    previousWeekOrders,
    orderChange,
    formattedOrderChange,

    currentMonthSales,
    previousMonth,
    previousMonthSales,
    formattedSalesChange,
    salesChange,
    revenue: revenue.toFixed(1),

    currentMonthCustomers,
    previousMonthCustomers,
    formattedCustomerChange,
    customerChange,
  };
};

export default useOrder_Sales_Comparison;
