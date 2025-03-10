"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "next/navigation";
import { fetchProductById, fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Heart,
  Check,
  Truck,
  Star,
  Share2,
  ArrowLeft,
  Shield,
  Package,
  RefreshCcw,
  ThumbsUp,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import toast from "react-hot-toast";
import Link from "next/link";
import AIRecommendations from "./AIRecommendations";
import ARProductViewer from "./ARProductViewer";
import LiveChat from "./LiveChat";
import ImageScrol from "./ImageScrol";
// import ImageScroll from "./ImageScroll";

export default function SingleProductDetails() {
  const [showImage, setShowImage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { selectedProduct, products } = useSelector(
    (state: RootState) => state.product
  );

  useEffect(() => {
    dispatch(fetchProductById(Number(id)));
    dispatch(fetchProducts());

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      dispatch(setCart(savedCart));
    }
  }, [dispatch, id]);

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
      ...selectedProduct,
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
    handleAddToCart();
    // Navigate to checkout
    // router.push("/checkout");
  };

  if (!selectedProduct) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-7xl mx-auto px-4 py-8"
    >
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-6">
        <Link href="/fashion" className="flex items-center hover:text-primary">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Products
        </Link>
        <span>/</span>
        <span>{selectedProduct.category}</span>
        <span>/</span>
        <span className="text-gray-900">{selectedProduct.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Images */}
        <div className="space-y-4">
          <div
            className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
            onMouseEnter={() => setShowZoom(true)}
            onMouseLeave={() => setShowZoom(false)}
            onMouseMove={handleImageHover}
          >
            <Image
              src={selectedProduct.images[showImage]}
              alt={selectedProduct.name}
              fill
              className="object-cover"
              priority
            />
            {showZoom && (
              <div
                className="absolute inset-0 bg-white"
                style={{
                  backgroundImage: `url(${selectedProduct.images[selectedImage]})`,
                  backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
                  backgroundSize: "200%",
                }}
              />
            )}
          </div>
          <ImageScrol
            images={selectedProduct.images}
            // selectedImage={selectedImage}
            // setSelectedImage={setSelectedImage}
            // images={selectedProduct?.images}
            setShowImage={setShowImage}
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              {selectedProduct.name}
            </h1>
            <p className="text-lg text-gray-600 mt-2">
              {selectedProduct.description}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-gray-900">
                ${selectedProduct.price}
              </span>
              {selectedProduct.discount > 0 && (
                <Badge variant="destructive" className="text-sm">
                  {selectedProduct.discount}% OFF
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < selectedProduct.ratings
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                ({selectedProduct.ratings} ratings)
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {/* Size Selection */}
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

            {/* Quantity */}
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
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Add to Cart
            </Button>
            <Button
              className="flex-1 bg-black hover:bg-black/90"
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

          {/* Product Features */}
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
        </div>
      </div>

      {/* Product Details Tabs */}
      <Tabs defaultValue="details" className="mt-12">
        <TabsList className="w-full justify-start border-b">
          <TabsTrigger value="details">Product Details</TabsTrigger>
          <TabsTrigger value="specifications">Specifications</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="details" className="mt-6">
          <div className="prose max-w-none">
            <h3 className="text-xl font-semibold mb-4">Product Description</h3>
            <p className="text-gray-600">{selectedProduct.description}</p>
            {/* Add more detailed description here */}
          </div>
        </TabsContent>
        <TabsContent value="specifications" className="mt-6">
          <div className="grid grid-cols-2 gap-4">
            {selectedProduct.specifications?.map((spec: any, idx: number) => (
              <div key={idx} className="flex gap-2 p-3 bg-gray-50 rounded-lg">
                <p className="font-medium text-gray-900">{spec.key}:</p>
                <p className="text-gray-600">{spec.value}</p>
              </div>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="mt-6">
          {/* Add reviews component here */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-semibold">Customer Reviews</h3>
              <Button>Write a Review</Button>
            </div>
            {/* Add review list component */}
          </div>
        </TabsContent>
      </Tabs>

      {/* AI Recommendations */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">You May Also Like</h2>
        <AIRecommendations />
      </div>

      {/* AR Viewer */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">View in 3D/AR</h2>
        <ARProductViewer />
      </div>

      {/* Live Chat */}
      <LiveChat />
    </motion.div>
  );
}
