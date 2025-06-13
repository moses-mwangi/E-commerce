"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  deleteProduct,
  fetchProductById,
  fetchProducts,
} from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  ArrowLeft,
  Calendar,
  DollarSign,
  Edit,
  Package,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import DeleteProduct from "../DeleteProduct";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const { selectedProduct } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchProductById(Number(id)));
  }, [dispatch, id]);

  const getDate = (date: string) => {
    const dates = new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
    const time = new Date(date).toLocaleTimeString();
    return `${dates}, ${time}`;
  };

  useEffect(() => {
    // Fetch product details
    const fetchProduct = async () => {
      try {
        // API call to get product details
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setProduct({
          id: 1,
          name: "Wireless Headphones",
          description:
            "High-quality wireless headphones with noise cancellation",
          price: 99.99,
          stock: 45,
          category: "Electronics",
          status: "In Stock",
          images: ["/products/headphones.jpg"],
          createdAt: "2024-01-01",
          sales: 150,
        });
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleDelete = async () => {
    try {
      await dispatch(deleteProduct(Number(id))).unwrap();
      setShowDeleteDialog(false);
      router.push("/admin/dashboard");
    } catch (error) {
      // console.error("Failed to delete product:", error);
      toast.error("Failed to delete product");
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-[400px] bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      {showDeleteDialog === true && (
        <DeleteProduct
          handleDelete={handleDelete}
          setShowDeleteDialog={setShowDeleteDialog}
        />
      )}
      <div className="px-3 sm:px-6 py-4 sm:py-6 space-y-6">
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="sm:flex items-center gap-2 hidden"
            >
              <ArrowLeft className="w-4 h-4" /> Back
            </Button>
            <h1 className="text-2xl font-semibold text-gray-800">
              Product Details
            </h1>
          </div>
          <div className="flex gap-2">
            <Button
              className="h-9"
              variant="outline"
              onClick={() =>
                router.push(`/admin/dashboard/products/edit/${id}`)
              }
            >
              <Edit className="w-4 h-4 mr-2" /> Edit
            </Button>
            <Button
              className="h-9"
              onClick={() => {
                setShowDeleteDialog(true);
              }}
              variant="destructive"
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6">
            <div className="aspect-square relative rounded-lg overflow-hidden mb-6">
              <Image
                src={String(
                  selectedProduct?.productImages.find(
                    (el) => el.isMain === true
                  )?.url
                )}
                alt={selectedProduct?.name ? selectedProduct?.name : ""}
                fill
                className="object-cover"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {selectedProduct?.productImages.map((image, index: number) => (
                <div
                  key={index}
                  className="aspect-square relative rounded-lg overflow-hidden"
                >
                  <Image
                    src={image.url}
                    alt={`${
                      selectedProduct?.name ? selectedProduct?.name : ""
                    } ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Card>

          <div className="space-y-6">
            <Card className="px-3 py-4 sm:px-6 sm:py-6">
              <h2 className="text-2xl font-bold mb-4">
                {selectedProduct?.name}
              </h2>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{selectedProduct?.category}</Badge>
                  <Badge
                    variant={
                      Number(selectedProduct?.stock) > 0
                        ? // ? "success"
                          "outline"
                        : "destructive"
                    }
                  >
                    {Number(selectedProduct?.stock) > 0
                      ? "In stock"
                      : "Out of stock"}
                  </Badge>
                </div>

                <p className="text-gray-600 text-[15px]">
                  {selectedProduct?.description}
                </p>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      Price
                    </div>
                    <div className="text-lg font-bold">
                      KES {selectedProduct?.price}
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Package className="w-4 h-4" />
                      Stock
                    </div>
                    <div className="text-lg font-bold">
                      {selectedProduct?.stock} units
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <ShoppingCart className="w-4 h-4" />
                      Total Sales
                    </div>
                    <div className="text-lg font-bold">
                      {/* {selectedProduct?.sales} units */}
                      55
                    </div>
                  </div>

                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-2 text-gray-600 mb-1">
                      <Calendar className="w-4 h-4" />
                      Added On
                    </div>
                    <div className="text-[15px] font-semibold">
                      {getDate(String(selectedProduct?.createdAt))}
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
