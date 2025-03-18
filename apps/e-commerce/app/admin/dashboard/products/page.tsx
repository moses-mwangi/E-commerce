"use client";

import { useEffect, useState } from "react";
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
  Plus,
  Search,
  Filter,
  MoreVertical,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { deleteProduct, fetchProducts } from "@/redux/slices/productSlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeWords } from "@/app/types/products";
import DeleteProduct from "./DeleteProduct";
import { number } from "zod";

export default function ProductsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);

  const [selectedProductId, setSelectedProductId] = useState<number>();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const handleView = (product: any) => {
    router.push(`/admin/dashboard/products/${product.id}`);
  };

  const handleEdit = (product: any) => {
    setIsLoading(true);
    router.push(`/admin/dashboard/products/edit/${product.id}`);
  };

  const handleDelete = async () => {
    const id: number = Number(selectedProductId);
    try {
      await dispatch(deleteProduct(id)).unwrap(); // ✅ Correct way to dispatch
      // toast.success("Product deleted successfully");
      setShowDeleteDialog(false);
    } catch (error) {
      // console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  return (
    <>
      {showDeleteDialog === true && (
        <DeleteProduct
          setShowDeleteDialog={setShowDeleteDialog}
          handleDelete={handleDelete}
        />
      )}
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-gray-800">Products</h1>
          <Button
            className="bg-primary w-36 bg-orange-500 hover:bg-orange-600"
            onClick={() => {
              setIsLoading(true);
              router.push("/admin/dashboard/products/upload");
            }}
          >
            {isLoading === false && <Plus className="w-4 h-4 mr-2" />}
            {isLoading === true ? <ButtonLoader /> : "Add Product"}
          </Button>
        </div>

        <Card className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-4 flex-1 max-w-md">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  className="pl-10 pr-4 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <Button variant="outline" className="flex items-center">
                <Filter className="w-4 h-4 mr-2" /> Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">
                      {product.name}
                    </TableCell>
                    <TableCell>{capitalizeWords(product.category)}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-semibold bg-green-100 ${
                          product.stock > 0 ? "text-green-800" : "text-red-700"
                        }`}
                      >
                        {product.stock > 0 ? "In Stock" : "Out of Stock"}
                      </span>
                    </TableCell>
                    <TableCell>
                      {/* <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button> */}

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleView(product)}>
                            <Eye className="w-4 h-4 mr-2" /> View
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEdit(product)}>
                            <Edit className="w-4 h-4 mr-2" /> Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => {
                              setSelectedProductId(product.id);
                              setShowDeleteDialog(true);
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-2" /> Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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
