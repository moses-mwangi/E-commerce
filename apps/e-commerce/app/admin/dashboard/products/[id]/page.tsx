"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Edit,
  Trash2,
  Package,
  DollarSign,
  ShoppingCart,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { fetchProductById, fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";

export default function ProductDetailsPage() {
  const router = useRouter();
  const { id } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const dispatch: AppDispatch = useDispatch();
  const { products, selectedProduct } = useSelector(
    (state: RootState) => state.product
  );

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
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.back()}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">
            Product Details
          </h1>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => router.push(`/admin/dashboard/products/edit/${id}`)}
          >
            <Edit className="w-4 h-4 mr-2" /> Edit
          </Button>
          <Button variant="destructive">
            <Trash2 className="w-4 h-4 mr-2" /> Delete
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="aspect-square relative rounded-lg overflow-hidden mb-6">
            <Image
              src={selectedProduct?.images ? selectedProduct?.images[0] : ""}
              alt={selectedProduct?.name ? selectedProduct?.name : ""}
              fill
              className="object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {selectedProduct?.images.map((image: string, index: number) => (
              <div
                key={index}
                className="aspect-square relative rounded-lg overflow-hidden"
              >
                <Image
                  src={image}
                  alt={`${selectedProduct?.name ? selectedProduct?.name : ""} ${
                    index + 1
                  }`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-2xl font-bold mb-4">{selectedProduct?.name}</h2>
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

              <p className="text-gray-600">{selectedProduct?.description}</p>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <DollarSign className="w-4 h-4" />
                    Price
                  </div>
                  <div className="text-xl font-bold">
                    ${selectedProduct?.price}
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <Package className="w-4 h-4" />
                    Stock
                  </div>
                  <div className="text-xl font-bold">
                    {selectedProduct?.stock} units
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600 mb-1">
                    <ShoppingCart className="w-4 h-4" />
                    Total Sales
                  </div>
                  <div className="text-xl font-bold">
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
  );
}
