"use client";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { capitalizeWords } from "@/app/types/products";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  deleteSubcategory,
  fetchCategories,
  getSubcategories,
} from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ArrowLeft, Edit, Plus, Search, Trash2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DeleteSubCategory from "./DeleteSubCategory";

export default function SubCategoryTable() {
  const { push, back } = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const [subCategoryId, setSubCategoryId] = useState<number>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const { selectedSubCategories } = useSelector(
    (state: RootState) => state.category
  );

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(getSubcategories(Number(id)));
  }, [dispatch, id]);

  const handleDelete = async () => {
    const subId: number = Number(subCategoryId);

    try {
      setIsLoading(true);
      const ids = { categoryId: Number(id), subcategoryId: subCategoryId };
      await dispatch(deleteSubcategory(ids)).unwrap();
    } catch (error) {
      toast.error("Failed to delete category");
    } finally {
      setShowDeleteDialog(false);
    }
  };

  return (
    <>
      {showDeleteDialog === true && (
        <DeleteSubCategory
          handleDelete={handleDelete}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      )}

      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">
            Subcategories
          </h1>
          <div className="flex items-center gap-4">
            <Label
              className="bg-gray-100 text-gray-800 transition-all duration-150 flex items-center gap-1 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => {
                push(`/admin/dashboard/categories/edit/${id}`);
              }}
            >
              <ArrowLeft size={17} />
              Back
            </Label>
            <Button
              disabled={isLoading === true}
              onClick={() => {
                setIsLoading(true);
                // const params = new URLSearchParams();
                // params.set("subId", String());
                push(
                  `/admin/dashboard/categories/edit/${id}/subcategories/new_subcategory`
                );
              }}
              className="bg-orange-500/85 h-8  hover:bg-orange-600 w-36"
            >
              {isLoading === false ? (
                <div className="flex items-center gap-2">
                  <Plus className="w-4 h-4" /> Add Subcategory
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
                type="text"
                placeholder="Search categories..."
                className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
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
                {selectedSubCategories?.map((sub) => (
                  <TableRow key={sub.id}>
                    <TableCell className="font-medium">{sub.name}</TableCell>
                    <TableCell>{sub.itemCount}</TableCell>
                    <TableCell>{capitalizeWords(String(sub.slug))}</TableCell>
                    <TableCell>
                      <span
                        className={`${
                          sub.status?.toLowerCase() === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-50 text-red-500"
                        } px-2 py-1 rounded-full text-xs font-semibold `}
                      >
                        {capitalizeWords(String(sub?.status))}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button
                          onClick={() => {
                            setIsLoading(true);
                            const params = new URLSearchParams();
                            params.set("subId", String(sub.id));
                            push(
                              `/admin/dashboard/categories/edit/${id}/subcategories/edit_subcategory?${params.toString()}`
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
                            setSubCategoryId(sub.id);
                            console.log(sub.id);
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
              </TableBody>
            </Table>
          </div>
        </Card>
      </div>
    </>
  );
}
