import { useEffect, useState } from "react";

function usePagination(products: any[]) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilters, setStatusFilters] = useState<string[]>([]);
  const [paymentFilters, setPaymentFilters] = useState<string[]>([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const productPerPage = 10;

  const filteredProduct = products.filter((product) => {
    if (product.paymentStatus && product.User.name && product.totalPrice) {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        product.id.toString().includes(searchLower) ||
        product.User.name.toLowerCase().includes(searchLower) ||
        product.status.toLowerCase().includes(searchLower) ||
        product.paymentStatus.toLowerCase().includes(searchLower) ||
        product.totalPrice.toString().includes(searchLower);

      const matchesStatus =
        statusFilters.length === 0 || statusFilters.includes(product.status);

      const matchesPayment =
        paymentFilters.length === 0 ||
        paymentFilters.includes(product.paymentStatus);

      return matchesSearch && matchesStatus && matchesPayment;
    } else {
      return product;
    }
  });

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
