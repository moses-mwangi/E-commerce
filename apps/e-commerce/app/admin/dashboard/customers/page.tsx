"use client";

import { Pagination } from "@/app/components/pagination/pagination";
import usePagination from "@/app/components/pagination/usePagination";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchOrders } from "@/redux/slices/orderSlice";
import { fetchUsers } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { format } from "date-fns";
import { Filter, Mail, MoreVertical, Phone, Search } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function CustomersPage() {
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch: AppDispatch = useDispatch();

  const {
    searchTerm,
    setSearchTerm,
    filteredProduct,
    totalPages,
    handlePageChange,
    currentPage,
    productPerPage,

    statusFilters,
    paymentFilters,
  } = usePagination(orders);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  const uniqueCustomers = filteredProduct?.filter(
    (order, index, self) =>
      index === self.findIndex((u) => u.email === order.User.email)
  );

  return (
    <div className="flex">
      <div className="md:p-6 w-full px-2 py-4 space-y-6 overflow-x-scroll">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">Customers</h1>
            <p className="text-gray-600 mt-1">Manage your customer base</p>
          </div>
          <Button className="bg-orange-500/85 hover:bg-orange-600/90">
            Export Customers
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          <Card className="p-3 md:p-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-500">
              Total Customers
            </h3>
            <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">1,234</p>
            <span className="text-green-600 text-xs md:text-sm">
              ↑ 12% from last month
            </span>
          </Card>
          <Card className="p-3 md:p-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-500">
              Active Customers
            </h3>
            <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">892</p>
            <span className="text-green-600 text-xs md:text-sm">
              ↑ 8% from last month
            </span>
          </Card>
          <Card className="p-3 md:p-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-500">
              New Customers
            </h3>
            <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">156</p>
            <span className="text-green-600 text-xs md:text-sm">
              ↑ 24% from last month
            </span>
          </Card>
          <Card className="p-3 md:p-4">
            <h3 className="text-xs md:text-sm font-medium text-gray-500">
              Churn Rate
            </h3>
            <p className="text-xl md:text-2xl font-bold mt-1 md:mt-2">2.4%</p>
            <span className="text-red-600 text-xs md:text-sm">
              ↑ 0.3% from last month
            </span>
          </Card>
        </div>

        <Card className="md:p-6 p-4">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search customers..."
                  className=" focus-visible:ring-orange-500/80 pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-scroll sm:max-w-full md:min-w-[300px] md:max-w-[700px] lg:max-w-full">
            <Table className="md:min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {uniqueCustomers.length > 0 ? (
                  <>
                    {uniqueCustomers?.map((order) => (
                      <TableRow key={order.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                              {order.User.name.charAt(0)}
                            </div>
                            <div>
                              <div className="font-medium">
                                {order.User.name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {order.User.email}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button variant="ghost" size="sm">
                              <Mail className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Phone className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell>
                          {
                            orders.filter(
                              (el) => el.User.email === order.User.email
                            ).length
                          }
                        </TableCell>
                        <TableCell>$ {order.totalPrice}</TableCell>
                        <TableCell>
                          <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                            {order.status}
                          </span>
                        </TableCell>
                        <TableCell>
                          {format(order.User.createdAt, "MMM d yyy")}
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </>
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-4">
                      {searchTerm ||
                      statusFilters.length > 0 ||
                      paymentFilters.length > 0
                        ? "No orders match your criteria"
                        : "No orders found"}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          {uniqueCustomers.length > 0 && (
            <div className="pt-1">
              <Separator />
              <div className="pt-5">
                <Pagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
