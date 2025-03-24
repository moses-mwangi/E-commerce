"use client";

import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  Truck,
  Shield,
  RefreshCw,
  ChevronRight,
  Minus,
  Plus,
  ArrowLeft,
  Check,
  Package,
  RefreshCcw,
  ShoppingCart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { AppDispatch, RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "@/redux/slices/productSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";

import { FaShoppingCart, FaHeart, FaCheck, FaTruck } from "react-icons/fa";

import { addToCart, setCart } from "@/redux/slices/cartSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import ImageScrol from "./ImageScrol";
import AIRecommendations from "./AIRecommendations";
import ARProductViewer from "./ARProductViewer";
import LiveChat from "./LiveChat";
import { Card } from "@/components/ui/card";

const productFeatures = [
  {
    icon: <Shield className="w-5 h-5" />,
    title: "Genuine Product",
    description: "100% Authentic Products",
  },
  {
    icon: <Package className="w-5 h-5" />,
    title: "Free Shipping",
    description: "On orders above $50",
  },
  {
    icon: <RefreshCcw className="w-5 h-5" />,
    title: "Easy Returns",
    description: "30-day return policy",
  },
];

export default function SingleSuCategoricalProductPage() {
  const [quantity, setQuantity] = useState(1);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  const { category, subcategory, singleProduct } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const [showImage, setShowImage] = useState(1);

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch]);

  const decodedCategory = decodeURIComponent(String(category));
  const decodedSub = decodeURIComponent(String(subcategory));

  const { products } = useSelector((state: RootState) => state.product);
  const product = products.find((el) => el.id === Number(id));

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
    if (!selectedSize || !selectedColor) {
      toast.error("Please select size and color");
      return;
    }

    const productToAdd = {
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    };

    dispatch(addToCart(productToAdd as any));
    toast.success("Added to cart successfully!", {
      icon: "🛍️",
    });
  };

  const handleBuyNow = () => {
    // handleAddToCart();
    // Navigate to checkout
    // router.push("/checkout");
  };

  if (!product)
    return (
      <div>
        <p>N product</p>
      </div>
    );

  return (
    <div className="py-6 px-6 lg:px-16">
      <div className="min-h-screen bg-gray-50d">
        <div className="flex items-center text-sm pb-7 px-6">
          <Link
            href={`/category`}
            className="text-gray-500 hover:underline hover:text-blue-500"
          >
            Categories
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link
            href={`/category/${decodedCategory}`}
            className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
          >
            {decodedCategory}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Link
            href={`/category/${decodedCategory}/${decodedSub}`}
            className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
          >
            {decodedSub}
          </Link>
          <ChevronRight className="w-4 h-4 mx-2 text-gray-400" />
          <Label className="text-gray-900 capitalize">{product?.name}</Label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div
              className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
              onMouseEnter={() => setShowZoom(true)}
              onMouseLeave={() => setShowZoom(false)}
              onMouseMove={handleImageHover}
            >
              <Image
                // src={product.images[showImage]}
                src={
                  product.productImages
                    ? String(
                        product.productImages.find((el) => el.isMain === true)
                          ?.url
                      )
                    : ""
                }
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {showZoom && (
                <div
                  className="absolute inset-0 bg-white"
                  style={{
                    backgroundImage: `url(${
                      product.productImages.map((el) => el.url)[selectedImage]
                    })`,
                    backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    backgroundSize: "200%",
                  }}
                />
              )}
            </div>
            <ImageScrol
              images={product.productImages.map((el) => el.url)}
              // selectedImage={selectedImage}
              // setSelectedImage={setSelectedImage}
              // images={selectedProduct?.images}
              setShowImage={setShowImage}
              showImage={showImage}
            />
          </div>

          <Card className="flex rounded-lg flex-col shadow-xl gap-4 lg:w-full px-3 py-6">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
              {product.brand}
            </h2>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
              {product.name}
            </h1>
            <p className="text-gray-600 dark:text-gray-400 text-[16px]">
              {product.description}
            </p>
            <div className="flex gap-6 py-3">
              <div className="flex items-center gap-3 text-xl font-semibold">
                <p className="text-gray-800 dark:text-gray-200">
                  ${product.price}
                </p>
                {product.discount > 0 && (
                  <span className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-sm rounded-md">
                    -{product.discount}% Off
                  </span>
                )}
              </div>

              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < product.ratings ? "text-yellow-500" : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="text-sm text-gray-600 ml-2">
                  ({product.ratings} ratings)
                </span>
              </div>
            </div>

            <p className="text-sm text-[15px] text-gray-500">
              {product.stock > 0 ? (
                <span className="text-green-600 font-semibold flex items-center">
                  <Check size={20} className="mr-1" /> In Stock
                </span>
              ) : (
                <span className="text-red-500 font-semibold">Out of Stock</span>
              )}
            </p>

            <div>
              <label className="text-sm font-medium text-gray-700">Size</label>
              <div className="flex gap-2 mt-2">
                {["S", "M", "L", "XL", "XXL"].map((size) => (
                  <Button
                    key={size}
                    variant={selectedSize === size ? "default" : "outline"}
                    onClick={() => setSelectedSize(size)}
                    className="w-12 h-12"
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </div>

            {/* Color Selection */}
            <div>
              <label className="text-sm font-medium text-gray-700">Color</label>
              <div className="flex gap-2 mt-2">
                {["Red", "Blue", "Green", "Black", "White"].map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColor === color
                        ? "border-primary"
                        : "border-transparent"
                    }`}
                    style={{ backgroundColor: color.toLowerCase() }}
                  />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium text-gray-700">
                Quantity
              </label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                  }
                  className="w-20 text-center mx-2"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>
            </div>

            <div className="flex gap-4 py-4">
              <Button
                className="flex-1 bg-orange-600 hover:bg-orange-500"
                onClick={handleAddToCart}
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Add to Cart
              </Button>
              <Button
                className="flex-1 bg-orange-600 hover:bg-orange-500"
                onClick={handleBuyNow}
              >
                Buy Now
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={isWishlisted ? "text-red-500" : ""}
              >
                <Heart className={isWishlisted ? "fill-current" : ""} />
              </Button>
              <Button variant="outline" size="icon">
                <Share2 className="w-4 h-4" />
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-4 pt-6 border-t">
              {productFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center text-center p-4 rounded-lg bg-gray-50"
                >
                  {feature.icon}
                  <h3 className="font-medium mt-2">{feature.title}</h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <Tabs defaultValue="specifications" className="mt-12">
          <TabsList className="w-full justify-start border-b">
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="details">Product Details</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>
          <TabsContent value="specifications" className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              {product.specifications?.map((spec: any, idx: number) => (
                <div key={idx} className="flex gap-2 p-3 bg-gray-50 rounded-lg">
                  <p className="font-semibold text-gray-900">{spec.key} :</p>
                  <p className="text-gray-600">{spec.value}</p>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="details" className="mt-6">
            <div className="prose max-w-none">
              <h3 className="text-xl font-semibold mb-4">
                Product Description
              </h3>
              <p className="text-gray-600">{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Customer Reviews</h3>
                <Button>Write a Review</Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="mt-10">
          {/* <AIRecommendations productId={selectedProduct?.id} /> */}
          <AIRecommendations />
        </div>

        <div className="mt-10">
          <h3 className="text-2xl font-semibold mb-4">
            3D & AR Product Viewer
          </h3>
          {/* <ARProductViewer product={selectedProduct} /> */}
          <ARProductViewer />
        </div>

        <LiveChat />
      </div>
    </div>
  );
}
