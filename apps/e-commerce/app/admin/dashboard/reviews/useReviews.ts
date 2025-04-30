import { useEffect, useMemo, useState } from "react";
import {
  startOfWeek,
  subWeeks,
  isAfter,
  isBefore,
  format,
  subMonths,
  // isThisMonth,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
} from "date-fns";
import { fetchReviews } from "@/redux/slices/ReviewsRatingSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { useSelector, useDispatch } from "react-redux";

function useReviews() {
  const [currentPage, setCurrentPage] = useState(1);
  const reviewsPerPage = 10;
  const { reviews } = useSelector((state: RootState) => state.review);
  const dispatch: AppDispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchReviews());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const totalReviews = reviews.length;
  const ratingSum = reviews
    .map((el) => el.rating)
    .reduce((sum, rating) => sum + rating, 0);

  const avrRating = reviews.length > 0 ? ratingSum / reviews.length : 0;

  const positivePercentage = reviews.length
    ? (reviews.filter((el) => el.rating >= 2).length * 100) / reviews.length
    : 0;

  const currentMonth = new Date();
  const previousMonth = subMonths(currentMonth, 1);

  const startOfCurrentMonth = startOfMonth(currentMonth);
  const endOfCurrentMonth = endOfMonth(currentMonth);

  const startOfLastMonth = startOfMonth(previousMonth);
  const endOfLastMonth = endOfMonth(previousMonth);

  const getMonthlyReviews = (start: Date, end: Date) => {
    const monthReviews = reviews.filter((review) => {
      const matchedReviews = isWithinInterval(new Date(review.createdAt), {
        start: start,
        end: end,
      });

      return matchedReviews;
    });

    return monthReviews;
  };

  const lastMonthReviews = getMonthlyReviews(
    startOfLastMonth,
    endOfLastMonth
  ).length;

  const currentMonthReviews = getMonthlyReviews(
    startOfCurrentMonth,
    endOfCurrentMonth
  ).length;

  const reviewsChange = lastMonthReviews
    ? Math.floor(
        ((currentMonthReviews - lastMonthReviews) / lastMonthReviews) * 100
      )
    : 0;

  const formattedReviewChange =
    lastMonthReviews > 0
      ? currentMonthReviews === 0
        ? "-100%"
        : currentMonthReviews >= lastMonthReviews * 2
        ? `${(currentMonthReviews / lastMonthReviews).toFixed(1)}x`
        : lastMonthReviews >= currentMonthReviews * 2
        ? `${(lastMonthReviews / currentMonthReviews).toFixed(1)}x`
        : `${reviewsChange > 0 ? `+${reviewsChange}` : reviewsChange}%`
      : "N/A";

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const filteredReviews = reviews.filter((review) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      review.id.toString().includes(searchLower) ||
      review.id.toString().toLowerCase().includes(searchLower) ||
      review.product.name.toLowerCase().includes(searchLower) ||
      review.rating.toString().toLowerCase().includes(searchLower) ||
      review.comment.toLowerCase().includes(searchLower) ||
      review.user.email.toString().includes(searchLower) ||
      review.user.name.toString().includes(searchLower)
    );
  });

  const totalPages = Math.ceil(filteredReviews.length / reviewsPerPage);
  const indexOfLastReview = currentPage * reviewsPerPage;
  const indexOfFirstReview = indexOfLastReview - reviewsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return {
    avrRating,
    positivePercentage,
    ratingSum,
    reviews: currentReviews,
    totalReviews,
    formattedReviewChange,
    reviewsChange,

    onPageChange: handlePageChange,
    currentPage,
    totalPages,
    reviewsPerPage,
    searchTerm,
    setSearchTerm,
    setCurrentPage,
  };
}

export default useReviews;
