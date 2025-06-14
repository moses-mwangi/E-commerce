"use client";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Pagination } from "@/app/components/pagination/pagination";
import usePagination from "@/app/components/pagination/usePagination";
import { capitalizeWords } from "@/app/types/products";
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
import { deleteCategory, fetchCategories } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Edit, Plus, Search, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DeleteCategory from "./DeleteCategory";

export default function CategoriesPage() {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { categories: categories } = useSelector(
    (state: RootState) => state.category
  );

  const {
    searchTerm,
    setSearchTerm,
    filteredProduct,
    totalPages,
    handlePageChange,
    currentPage,
    currentProduct,
    productPerPage,

    statusFilters,
    paymentFilters,
  } = usePagination(categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleDelete = async () => {
    const id: number = Number(selectedCategoryId);
    try {
      setIsLoading(true);
      await dispatch(deleteCategory(id)).unwrap();
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      {showDeleteDialog === true && (
        <DeleteCategory
          handleDelete={handleDelete}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      )}

      <div className="p-3 md:p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Categories</h1>
          <div className="flex gap-2 items-center">
            <Button
              disabled={isLoading === true}
              onClick={() => {
                setIsLoading(true);
                push("/admin/dashboard/categories/new_category");
              }}
              className="bg-orange-500/85  hover:bg-orange-600 w-36"
            >
              {isLoading === false ? (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Category
                </div>
              ) : (
                <ButtonLoader />
              )}
            </Button>
          </div>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                type="text"
                placeholder="Search categories..."
                className="focus-visible:ring-orange-500 pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="relative overflow-x-auto shadow-sm sm:rounded-lg">
            <div className="block w-full overflow-x-auto">
              <Table className="w-full min-w-[700px] md:min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Products</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentProduct.length > 0 ? (
                    <>
                      {currentProduct?.map((category) => (
                        <TableRow key={category.id}>
                          <TableCell className="font-medium">
                            {category.name}
                          </TableCell>
                          <TableCell>{category.itemCount}</TableCell>
                          <TableCell>
                            {capitalizeWords(String(category.slug))}
                          </TableCell>
                          <TableCell>
                            <span
                              className={`${
                                category.status === "active"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-50 text-red-500"
                              } px-2 py-1 rounded-full text-xs font-semibold `}
                            >
                              {capitalizeWords(String(category?.status))}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                onClick={() => {
                                  setIsLoading(true);
                                  push(
                                    `/admin/dashboard/categories/edit/${category.id}`
                                  );
                                }}
                                variant="ghost"
                                size="sm"
                              >
                                <Edit className="w-4 h-4" />
                              </Button>
                              <Button
                                onClick={() => {
                                  setShowDeleteDialog(true);
                                  setSelectedCategoryId(category.id);
                                  console.log(category.id);
                                }}
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
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
          </div>
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
        </Card>
      </div>
    </>
  );
}
