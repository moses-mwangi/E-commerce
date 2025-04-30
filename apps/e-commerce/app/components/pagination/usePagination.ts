import { fetchOrders } from "@/redux/slices/orderSlice";
import { fetchUsers } from "@/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { set } from "nprogress";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function usePagination(products: any[]) {
  // const { orders } = useSelector((state: RootState) => state.order);
  // const dispatch: AppDispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [paymentFilters, setPaymentFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productPerPage = 10;

  // Filter orders based on search term and filters
  const filteredProduct = products.filter((product) => {
    if (product.paymentStatus && product.User.name && product.totalPrice) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        product.id.toString().includes(searchLower) ||
        product.User.name.toLowerCase().includes(searchLower) ||
        product.status.toLowerCase().includes(searchLower) ||
        product.paymentStatus.toLowerCase().includes(searchLower) ||
        product.totalPrice.toString().includes(searchLower);

      // Status filter matching
      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(product.status);

      // Payment filter matching
      const matchesPayment =
        paymentFilters.length === 0 ||
        paymentFilters.includes(product.paymentStatus);

      return matchesSearch && matchesStatus && matchesPayment;
    } else {
      return product;
    }
  });

  // Pagination calculations
  const totalPages = Math.ceil(filteredProduct.length / productPerPage);
  const indexOfLastProduct = currentPage * productPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productPerPage;
  const currentProduct = filteredProduct.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilters, paymentFilters]);

  const activeFilterCount = statusFilters.length + paymentFilters.length;

  return {
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
  };
}

export default usePagination;
