"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  Star,
  MessageCircle,
  ThumbsUp,
  Flag,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

import { format } from "date-fns";
import useReviews from "./useReviews";
import { Pagination } from "@/app/components/pagination/pagination";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";

const statusOptions = [
  "pending",
  "confirmed",
  "shipped",
  "delivered",
  "cancelled",
];
const paymentOptions = ["paid", "unpaid", "failed"];

export default function ReviewsPage() {
  const {
    avrRating,
    positivePercentage,
    reviews,
    totalReviews,
    formattedReviewChange,
    reviewsChange,

    currentPage,
    totalPages,
    onPageChange,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  } = useReviews();
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [paymentFilters, setPaymentFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const toggleStatusFilter = (status: string) => {
    setStatusFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const togglePaymentFilter = (payment: string) => {
    setPaymentFilters((prev) =>
      prev.includes(payment)
        ? prev.filter((p) => p !== payment)
        : [...prev, payment]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setStatusFilters([]);
    setPaymentFilters([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const activeFilterCount = statusFilters.length + paymentFilters.length;

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-gray-800">
            Customer Reviews
          </h1>
          <p className="text-gray-600 mt-1">Manage and respond to reviews</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Star className="w-5 h-5 text-yellow-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Average Rating
              </h3>
              <p className="text-2xl font-bold mt-1">{avrRating.toFixed(1)}</p>
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      avrRating > star
                        ? "text-yellow-400 fill-current"
                        : "text-gray-400"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-blue-100 rounded-full">
              <MessageCircle className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Total Reviews
              </h3>
              <p className="text-2xl font-bold mt-1">{totalReviews}</p>
              <span
                className={`${
                  reviewsChange >= 0 ? "text-green-600 " : "text-red-600"
                } text-sm`}
              >
                {reviewsChange >= 0 ? "▲" : "▼"}
                {formattedReviewChange === "N/A"
                  ? "N/A this month"
                  : `${formattedReviewChange} this month`}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-green-100 rounded-full">
              <ThumbsUp className="w-5 h-5 text-green-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Positive Reviews
              </h3>
              <p className="text-2xl font-bold mt-1">{positivePercentage}%</p>
              <span className="text-green-600 text-sm">↑ 3% this month</span>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center space-x-3">
            <div className="p-3 bg-red-100 rounded-full">
              <Flag className="w-5 h-5 text-red-600" />
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">
                Flagged Reviews
              </h3>
              <p className="text-2xl font-bold mt-1">
                {100 - positivePercentage}%
              </p>
              <span className="text-gray-600 text-sm">Needs attention</span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center space-x-4 flex-1 max-w-md">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search reviews..."
                className=" focus-visible:ring-orange-500 pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
            <DropdownMenu onOpenChange={setIsFilterOpen}>
              <DropdownMenuTrigger
                asChild
                className=" focus-visible:ring-orange-500 focus:ring-orange-500"
              >
                <Button variant="outline" className="flex items-center">
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
                {/* <Card> */}
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
                {/* </Card> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

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
                <TableHead>Product</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Review</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <TableRow key={review.id}>
                    <TableCell className="font-medium">
                      {review.product.name}
                    </TableCell>
                    <TableCell>
                      {review.user.name
                        .split(" ")
                        .map(
                          (word) =>
                            word.charAt(0).toUpperCase() +
                            word.slice(1).toLowerCase()
                        )
                        .join(" ")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, index) => (
                          <Star
                            key={index}
                            className={`w-4 h-4 ${
                              index < review.rating
                                ? "text-yellow-400 fill-current"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </TableCell>
                    <TableCell className="max-w-xs truncate">
                      {review.comment}
                    </TableCell>
                    <TableCell>
                      {format(review.createdAt, "MM/dd/yyy")}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                        {/* {review.status} */}
                        Published
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm">
                          Reply
                        </Button>
                        <Button variant="ghost" size="sm">
                          Hide
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-4">
                    {searchTerm || statusFilters.length > 0
                      ? "No reviews match your criteria"
                      : "No reviews found"}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className="pt-1">
          <Separator />
          <div className="pt-5">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={onPageChange}
            />
          </div>
        </div>
      </Card>
    </div>
  );
}
