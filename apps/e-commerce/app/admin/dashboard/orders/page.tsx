"use client";

import { Pagination } from "@/app/components/pagination/pagination";
import usePagination from "@/app/components/pagination/usePagination";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { Eye, Filter, Search, X } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const statusOptions = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];
const paymentOptions = ["paid", "unpaid", "failed"];

export default function OrdersPage() {
  const { orders } = useSelector((state: RootState) => state.order);
  const dispatch: AppDispatch = useDispatch();

  const {
    searchTerm,
    setSearchTerm,
    activeFilterCount,
    setIsFilterOpen,
    statusFilters,
    toggleStatusFilter,
    togglePaymentFilter,

    paymentFilters,
    filteredProduct,
    clearAllFilters,
    currentProduct,
    totalPages,
    handlePageChange,
    currentPage,
    productPerPage,
  } = usePagination(orders);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchOrders());
  }, [dispatch]);

  return (
    <div className="p-3 md:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-800">Orders</h1>
        <div className="flex space-x-2">
          <Button variant="outline">Export</Button>
          <Button variant="outline">Print</Button>
        </div>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 h-8 bg-gray-50 bg-opacity-85 focus-visible:ring-orange-500 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex h-8 items-center">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                  {activeFilterCount > 0 && (
                    <Badge className="ml-2" variant="secondary">
                      {activeFilterCount}
                    </Badge>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end">
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">Order Status</h3>
                  {statusOptions.map((status) => (
                    <DropdownMenuCheckboxItem
                      key={status}
                      checked={statusFilters.includes(status)}
                      onCheckedChange={() => toggleStatusFilter(status)}
                    >
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <Separator />
                <div className="p-2">
                  <h3 className="text-sm font-medium mb-2">Payment Status</h3>
                  {paymentOptions.map((payment) => (
                    <DropdownMenuCheckboxItem
                      key={payment}
                      checked={paymentFilters.includes(payment)}
                      onCheckedChange={() => togglePaymentFilter(payment)}
                    >
                      {payment.charAt(0).toUpperCase() + payment.slice(1)}
                    </DropdownMenuCheckboxItem>
                  ))}
                </div>
                <Separator />
                <div className="p-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full"
                    onClick={clearAllFilters}
                  >
                    <X className="w-4 h-4 mr-2" />
                    Clear filters
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Active filters display */}
        {(statusFilters.length > 0 || paymentFilters.length > 0) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {statusFilters.map((status) => (
              <Badge
                key={`status-${status}`}
                variant="outline"
                className="capitalize"
              >
                Status: {status}
                <button
                  onClick={() => toggleStatusFilter(status)}
                  className="ml-2 rounded-full hover:bg-gray-100 p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
            {paymentFilters.map((payment) => (
              <Badge
                key={`payment-${payment}`}
                variant="outline"
                className="capitalize"
              >
                Payment: {payment}
                <button
                  onClick={() => togglePaymentFilter(payment)}
                  className="ml-2 rounded-full hover:bg-gray-100 p-1"
                >
                  <X className="w-3 h-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentProduct?.length > 0 ? (
                currentProduct?.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">
                      ORD-#{order.id}
                    </TableCell>
                    <TableCell>{order.User.name}</TableCell>
                    <TableCell>{format(order.createdAt, "MMM d yy")}</TableCell>
                    <TableCell>${order.totalPrice}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.status === "confirmed" ||
                          order.status === "delivered"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          order.paymentStatus === "paid"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-orange-100 text-orange-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm">
                        <Eye className="w-4 h-4 mr-2" /> View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
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
        <div className="pt-1">
          <Separator />
          <div className="pt-5">
            {filteredProduct.length > productPerPage && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}
