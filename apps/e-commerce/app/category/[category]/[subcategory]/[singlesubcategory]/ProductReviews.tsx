/* eslint-disable @next/next/no-img-element */
// "use client";

// import { Button } from "@/components/ui/button";
// import { fetchReviews } from "@/redux/slices/ReviewsRatingSlice";
// import { AppDispatch, RootState } from "@/redux/store";
// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function ProductReviews() {
//   const dispatch: AppDispatch = useDispatch();
//   const { reviews } = useSelector((state: RootState) => state.review);
//   useEffect(() => {
//     dispatch(fetchReviews());
//   }, [dispatch]);

//   return (
//     <div>
//       <div className="space-y-4">
//         <div className="flex items-center justify-between">
//           <h3 className="text-xl font-semibold">Customer Reviews</h3>
//           <Button>Write a Review</Button>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import { Button } from "@/components/ui/button";
import { fetchReviews } from "@/redux/slices/ReviewsRatingSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Star,
  Filter,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "@/components/ui/skeleton";
// import ReviewForm from "./ReviewForm"; // Your existing review form component
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FaThumbsUp } from "react-icons/fa";
import { SiTicktick } from "react-icons/si";

interface ReviewFilters {
  rating: number | null;
  sort: "newest" | "oldest" | "highest" | "lowest";
  hasMedia: boolean;
}

export default function ProductReviews({ productId }: { productId: string }) {
  const dispatch: AppDispatch = useDispatch();
  const { reviews, status } = useSelector((state: RootState) => state.review);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [filters, setFilters] = useState<ReviewFilters>({
    rating: null,
    sort: "newest",
    hasMedia: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 5;
  const singleProductReviews = reviews?.filter(
    (el) => el.productId.toString() === productId.toString()
  );

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch, productId]);

  const filteredReviews = React.useMemo(() => {
    let result = [...singleProductReviews];

    if (filters.rating) {
      result = result.filter((review) => review.rating === filters.rating);
    }
    if (filters.hasMedia) {
      result = result.filter(
        (review) => review?.product.productImages?.length > 0
        // ||
        //   review?.videos?.length > 0
      );
    }

    switch (filters.sort) {
      case "newest":
        return result.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return result.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "highest":
        return result.sort((a, b) => b.rating - a.rating);
      case "lowest":
        return result.sort((a, b) => a.rating - b.rating);
      default:
        return result;
    }
  }, [filters, singleProductReviews]);

  // Pagination
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );
  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);

  const ratingDistribution = React.useMemo(() => {
    const distribution = [0, 0, 0, 0, 0];
    singleProductReviews.forEach((review) => {
      distribution[review.rating - 1]++;
    });
    return distribution;
  }, [singleProductReviews]);

  const averageRating = React.useMemo(() => {
    if (singleProductReviews.length === 0) return 0;
    const sum = singleProductReviews.reduce(
      (acc, review) => acc + review.rating,
      0
    );
    return (sum / singleProductReviews.length).toFixed(1);
  }, [singleProductReviews]);

  if (status === "loading" && singleProductReviews.length === 0) {
    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <section className="space-y-8">
      <div className="bg-muted/50 p-6 rounded-lg">
        <div className="flex items-center flex-col md:flex-row gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-4xl font-bold">{averageRating}</h2>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(Number(averageRating))
                      ? "fill-orange-400 text-orange-400"
                      : "text-muted-foreground"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-muted-foreground mt-1">
              {singleProductReviews.length}{" "}
              {singleProductReviews.length === 1 ? "review" : "reviews"}
            </p>
          </div>

          <div className="flex-1 space-y-[6px]">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      rating: prev.rating === rating ? null : rating,
                    }))
                  }
                  className="flex items-center gap-1 hover:underline"
                >
                  <span className="w-4 text-[15px] text-right">{rating}</span>
                  <Star className="h-[15px] w-[15px] fill-orange-400 text-orange-400" />
                </button>
                <div className="flex-1 h-[6px] bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-orange-400"
                    style={{
                      width: `${
                        (ratingDistribution[rating - 1] /
                          singleProductReviews.length) *
                        100
                      }%`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8 text-right">
                  {ratingDistribution[rating - 1]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex bg-gray-50 p-3 rounded-lg flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h3 className="text-xl font-semibold">Customer Reviews</h3>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select
            value={filters.sort}
            onValueChange={(value) =>
              setFilters((prev) => ({
                ...prev,
                sort: value as "newest" | "oldest" | "highest" | "lowest",
              }))
            }
          >
            <SelectTrigger className="w-[180px] bg-white focus:ring-orange-400/85">
              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4" />
                <SelectValue placeholder="Sort by" />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest first</SelectItem>
              <SelectItem value="oldest">Oldest first</SelectItem>
              <SelectItem value="highest">Highest rated</SelectItem>
              <SelectItem value="lowest">Lowest rated</SelectItem>
            </SelectContent>
          </Select>

          <Button
            variant={filters.hasMedia ? "default" : "outline"}
            onClick={() =>
              setFilters((prev) => ({
                ...prev,
                hasMedia: !prev.hasMedia,
              }))
            }
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            <span>Media</span>
          </Button>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6 bg-gray-50/25">
        {currentReviews.length > 0 ? (
          currentReviews.map((review) => (
            <div key={review.id} className="border-b pb-6 last:border-b-0">
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarImage src={"Mf"} />
                  <AvatarFallback>
                    {review.user.name.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <h4 className="font-medium ">{review.user.name}</h4>
                      <div className="flex text-sm items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-[15px] w-[15px] ${
                                i < review.rating
                                  ? "fill-orange-400 text-orange-400"
                                  : "text-muted-foreground"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-muted-foreground">
                          {new Date(review.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <Badge
                      variant="secondary"
                      className="text-xs flex items-center gap-[6px] text-green-500 font-medium bg-slate-50"
                    >
                      <SiTicktick />
                      Verified Purchase
                    </Badge>
                  </div>

                  <h5 className="font-medium mt-2">{review.product.name}</h5>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {review.comment}
                  </p>

                  {review?.product.productImages?.length > 0 && (
                    <div className="flex gap-2 mt-3">
                      {review.product.productImages
                        .slice(0, 3)
                        .map((image, idx) => (
                          <div
                            key={idx}
                            className="w-16 h-16 rounded-md overflow-hidden border cursor-pointer hover:opacity-80 transition-opacity"
                          >
                            <img
                              src={
                                image.isMain === true ? image.url : image.url
                              }
                              alt={`Review image ${idx + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ))}
                      {review.product.productImages.length > 3 && (
                        <div className="w-16 h-16 rounded-md border flex items-center justify-center bg-muted text-sm">
                          +{review.product.productImages.length - 3}
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex items-center gap-5 mt-3">
                    <button className="text-[13px] flex items-center gap-2 text-muted-foreground hover:underline">
                      {"Helpful (0)"} <FaThumbsUp />
                    </button>
                    <button className="text-sm text-muted-foreground hover:underline">
                      Report
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              {filters.rating || filters.hasMedia
                ? "No reviews match your filters"
                : "No reviews yet. Be the first to review!"}
            </p>
            {filters.rating || filters.hasMedia ? (
              <Button
                variant="ghost"
                className="mt-2"
                onClick={() =>
                  setFilters({
                    rating: null,
                    sort: "newest",
                    hasMedia: false,
                  })
                }
              >
                Clear filters
              </Button>
            ) : (
              <Button className="mt-4" onClick={() => setShowReviewForm(true)}>
                Write a Review
              </Button>
            )}
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredReviews.length > reviewsPerPage && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (currentPage <= 3) {
              pageNum = i + 1;
            } else if (currentPage >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = currentPage - 2 + i;
            }

            return (
              <Button
                key={pageNum}
                variant={currentPage === pageNum ? "default" : "outline"}
                size="icon"
                onClick={() => setCurrentPage(pageNum)}
              >
                {pageNum}
              </Button>
            );
          })}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <span className="px-2">...</span>
          )}

          {totalPages > 5 && currentPage < totalPages - 2 && (
            <Button
              variant={currentPage === totalPages ? "default" : "outline"}
              size="icon"
              onClick={() => setCurrentPage(totalPages)}
            >
              {totalPages}
            </Button>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}

      {/* Review Form Modal */}
      {/* {showReviewForm && (
        <ReviewForm
          productId={productId}
          userId="current-user-id" // Replace with actual user ID
          orderId="order-id-if-available" // Optional
          productName="Product Name" // Pass the actual product name
          productImage="product-image-url" // Pass the actual product image
          productCategory="product-category" // Pass the actual category
          onCancel={() => setShowReviewForm(false)}
        />
      )} */}
    </section>
  );
}
