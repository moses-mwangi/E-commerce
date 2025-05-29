"use client";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import {
  Check,
  ChevronRight,
  Heart,
  Package,
  RefreshCcw,
  Share2,
  Shield,
  ShoppingCart,
  Star,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import LoadingState from "@/app/components/loaders/LoadingState";
import { capitalizeWords } from "@/app/types/products";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addToCart, setCart } from "@/redux/slices/cartSlice";
import { addToFav } from "@/redux/slices/favoriteSlice";
import toast from "react-hot-toast";
import ARProductViewer from "./ARProductViewer";
import ImageScrol from "./ImageScrol";
import LiveChat from "./LiveChat";
import ProductReviews from "./ProductReviews";
import RelatedProducts from "./RelatedProducts";

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
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { push } = useRouter();

  const { category, subcategory } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

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
  const { items } = useSelector((state: RootState) => state.favourite);
  const product = products.find((el) => el.id === Number(id));
  const mainImageIndex =
    Number(product?.productImages.findIndex((el) => el.isMain === true)) || 0;

  const [selectedImage, setSelectedImage] = useState(
    mainImageIndex !== -1 ? mainImageIndex : 0
  );

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!showZoom) return;

    const { left, top, width, height } =
      e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPosition({ x, y });
  };

  const handleAddToCart = () => {
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

  const handleBuyNow = (id: any) => {
    setIsLoading(true);
    localStorage.setItem("buyProductQuantity", quantity.toString());
    const param = new URLSearchParams();
    param.set("Buy", id);
    push(`/pages/cart/checkout?${param.toString()}`);
  };

  const handleAddToFavourite = (id: any) => {
    const product = products.find((el) => el.id === id);
    const inFavourite = items.find((el) => el.product.id === id);

    if (product) {
      dispatch(addToFav(product));
      if (inFavourite) {
        toast.success(`Product already in favourite!`);
      } else {
        toast.success(`${product.name} added to Fav!`);
      }
    }
  };

  if (!product)
    return (
      <div>
        <p>N product</p>
      </div>
    );

  return (
    <div>
      {isLoading === true && <LoadingState />}
      <div className="py-6 sm:px-6 px-2 lg:px-16">
        <div className="min-h-screen bg-gray-50d">
          <div className="flex items-center text-xs sm:text-sm pb-4 sm:pb-6 overflow-x-auto whitespace-nowrap">
            <Link
              href={`/category`}
              onClick={() => setIsLoading(true)}
              className="text-gray-500 hover:underline hover:text-blue-500"
            >
              Categories
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
            <Link
              href={`/category/${decodedCategory}`}
              onClick={() => setIsLoading(true)}
              className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
            >
              {decodedCategory}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
            <Link
              href={`/category/${decodedCategory}/${decodedSub}`}
              onClick={() => setIsLoading(true)}
              className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
            >
              {decodedSub}
            </Link>
            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
            <Label className="text-gray-900 dark:text-gray-100 capitalize truncate max-w-[150px] sm:max-w-none">
              {product?.name}
            </Label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-[2fr_1.5fr] gap-8">
            <div className="space-y-4">
              <Card
                className="relative aspect-square shadow-md rounded-lg overflow-hidden bg-gray-100"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleImageHover}
              >
                {product.productImages && (
                  <Image
                    src={
                      product.productImages
                        ? product.productImages[selectedImage]?.url
                        : ""
                    }
                    alt={product?.name || "Product Image"}
                    fill
                    className="object-cover"
                    priority
                  />
                )}
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
              </Card>
              <ImageScrol
                images={product.productImages.map((el) => el.url)}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>

            <Card className="flex rounded-lg flex-col shadow-xl gap-0 sm:gap-4 lg:w-full px-3 sm:px-5 py-6">
              <h2 className="sm:text-[17px] text-[16px] font-semibold text-gray-700 dark:text-gray-300">
                {product.brand}
              </h2>
              <h1 className="text-xl sm:text-[22px] md:text-3xl font-bold text-gray-900 dark:text-gray-100">
                {product.name}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 text-sm pt-1 sm:pt-0 sm:text-[15px]">
                {product.description}
              </p>
              <div className="flex items-center gap-6 py-3">
                <div className="flex items-center gap-3 text-[18px] sm:text-xl font-semibold">
                  <p className="text-gray-800 dark:text-gray-200">
                    {/* {`${capitalizeWords(selectedCurrency)} ${product.price
                      .toFixed(2)
                      .toLocaleString()}`} */}
                    {`${product.currency} ${product.price
                      .toFixed(2)
                      .toLocaleString()}`}
                  </p>
                  {product.discount > 0 && (
                    <span className="text-red-500 hidden sm:flex bg-red-100 dark:bg-red-900 px-2 py-1 text-sm rounded-md">
                      -{product.discount}% Off
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 sm:w-5 sm:h-5 ${
                        i < product.ratings
                          ? "text-yellow-500"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-600 ml-2">
                    ({product.ratings} ratings)
                  </span>
                </div>
              </div>

              <p className="text-sm sm:text-[15px] pb-3 sm:pb-0 text-gray-500">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold flex items-center">
                    <Check className="mr-1 w-4 h-4 sm:w-5 sm:h-5" /> In Stock
                  </span>
                ) : (
                  <span className="text-red-500 font-semibold">
                    Out of Stock
                  </span>
                )}
              </p>

              <div className=" hidden sm:flex">
                <label className="text-sm font-medium text-gray-700">
                  Size
                </label>
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

              <div className=" hidden sm:flex">
                <label className="text-sm font-medium text-gray-700">
                  Color
                </label>
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
                    className=" h-8"
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
                    className="w-20 h-8 text-center mx-2"
                  />
                  <Button
                    className=" h-8"
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
                  className="flex-1 h-8 sm:h-9 bg-orange-600 hover:bg-orange-500"
                  onClick={handleAddToCart}
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  className="flex-1 h-8 sm:h-9 bg-orange-600 hover:bg-orange-500"
                  onClick={() => handleBuyNow(product.id)}
                >
                  Buy Now
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => {
                    handleAddToFavourite(product.id);
                  }}
                  className=" h-8 sm:h-auto"
                >
                  <Heart
                    fill={`${
                      items.map((el) => el.product.id === product.id).length > 0
                        ? "oklch(70.4% 0.191 22.216)"
                        : "white"
                    }`}
                    className="w-6 h-6 text-red-400"
                  />
                </Button>
                <Button className="h-8 sm:h-auto" variant="outline" size="icon">
                  <Share2 className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex overflow-x-scroll hide-scrollbar lg:overflow-x-hidden lg:grid lg:grid-cols-3 gap-4 pt-6 border-t">
                {productFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className=" flex-shrink-0 flex flex-col items-center text-center p-4 rounded-lg bg-gray-50"
                  >
                    {feature.icon}
                    <h3 className="font-medium mt-2">{feature.title}</h3>
                    <p className="text-sm text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
          <Tabs defaultValue="reviews" className="mt-12">
            <TabsList className="w-full justify-start border-b">
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="details">Product Details</TabsTrigger>
            </TabsList>
            <TabsContent value="specifications" className="mt-6">
              <div className="grid grid-cols-2 gap-4">
                {product.specifications?.map((spec: any, idx: number) => (
                  <div
                    key={idx}
                    className="flex gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <p className="font-semibold text-gray-900">
                      {capitalizeWords(spec.key)} :
                    </p>
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
              <ProductReviews productId={String(product.id)} />
            </TabsContent>
          </Tabs>
          <div className="mt-10">
            <RelatedProducts product={product} />
          </div>

          <div className="">
            <ARProductViewer productName={product.name} />
          </div>

          <LiveChat />
        </div>
      </div>
    </div>
  );
}
