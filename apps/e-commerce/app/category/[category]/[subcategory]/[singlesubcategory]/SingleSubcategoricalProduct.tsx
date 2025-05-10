"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import {
  Star,
  Heart,
  Share2,
  Shield,
  ChevronRight,
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

import { addToCart, setCart } from "@/redux/slices/cartSlice";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import ImageScrol from "./ImageScrol";
import AIRecommendations from "./AIRecommendations";
import ARProductViewer from "./ARProductViewer";
import LiveChat from "./LiveChat";
import { Card } from "@/components/ui/card";
import ProductReviews from "./ProductReviews";
import { string } from "zod";
import LoadingState from "@/app/components/loaders/LoadingState";
import { addToFav } from "@/redux/slices/favoriteSlice";

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

  const { category, subcategory, singleProduct } = useParams();
  const dispatch: AppDispatch = useDispatch();

  const [showZoom, setShowZoom] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });

  // const [isWishlisted, setIsWishlisted] = useState(false);
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
              <div
                className="relative aspect-square rounded-lg overflow-hidden bg-gray-100"
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
              </div>
              <ImageScrol
                images={product.productImages.map((el) => el.url)}
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
              />
            </div>

            <Card className="flex rounded-lg flex-col shadow-xl gap-4 lg:w-full px-5 py-6">
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
                    <span className="text-red-500 hidden sm:flex bg-red-100 dark:bg-red-900 px-2 py-1 text-sm rounded-md">
                      -{product.discount}% Off
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
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

              <p className="text-sm text-[15px] text-gray-500">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-semibold flex items-center">
                    <Check size={20} className="mr-1" /> In Stock
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
                  className=""
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
              <ProductReviews productId={String(product.id)} />
            </TabsContent>
          </Tabs>
          <div className="mt-10">
            <AIRecommendations />
          </div>

          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">
              3D & AR Product Viewer
            </h3>
            <ARProductViewer productName={product.name} />
          </div>

          <LiveChat />
        </div>
      </div>
    </div>
  );
}

// "use client";

// import React, { useEffect, useState } from "react";
// import { useParams, useRouter, useSearchParams } from "next/navigation";
// import Image from "next/image";
// import {
//   Star,
//   Heart,
//   Share2,
//   Shield,
//   RefreshCcw,
//   ChevronRight,
//   Minus,
//   Plus,
//   ArrowLeft,
//   Check,
//   Package,
//   ShoppingCart,
// } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import Link from "next/link";
// import { Label } from "@/components/ui/label";
// import { AppDispatch, RootState } from "@/redux/store";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchProducts } from "@/redux/slices/productSlice";
// import { fetchCategories } from "@/redux/slices/categorySlice";
// import { addToCart, setCart } from "@/redux/slices/cartSlice";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import toast from "react-hot-toast";
// import { Input } from "@/components/ui/input";
// import ImageScrol from "./ImageScrol";
// import AIRecommendations from "./AIRecommendations";
// import ARProductViewer from "./ARProductViewer";
// import LiveChat from "./LiveChat";
// import { Card } from "@/components/ui/card";
// import ProductReviews from "./ProductReviews";
// import LoadingState from "@/app/components/loaders/LoadingState";
// import { addToFav } from "@/redux/slices/favoriteSlice";

// const productFeatures = [
//   {
//     icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
//     title: "Genuine Product",
//     description: "100% Authentic Products",
//   },
//   {
//     icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
//     title: "Free Shipping",
//     description: "On orders above $50",
//   },
//   {
//     icon: <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />,
//     title: "Easy Returns",
//     description: "30-day return policy",
//   },
// ];

// export default function SingleSuCategoricalProductPage() {
//   const [quantity, setQuantity] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);
//   const searchParams = useSearchParams();
//   const id = searchParams.get("id");
//   const { push } = useRouter();

//   const { category, subcategory, singleProduct } = useParams();
//   const dispatch: AppDispatch = useDispatch();

//   const [showZoom, setShowZoom] = useState(false);
//   const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 });
//   const [selectedSize, setSelectedSize] = useState("");
//   const [selectedColor, setSelectedColor] = useState("");

//   useEffect(() => {
//     dispatch(fetchProducts());
//     dispatch(fetchCategories());

//     if (typeof window !== "undefined") {
//       const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
//       dispatch(setCart(savedCart));
//     }
//   }, [dispatch]);

//   const decodedCategory = decodeURIComponent(String(category));
//   const decodedSub = decodeURIComponent(String(subcategory));

//   const { products } = useSelector((state: RootState) => state.product);
//   const { items } = useSelector((state: RootState) => state.favourite);
//   const product = products.find((el) => el.id === Number(id));
//   const mainImageIndex =
//     Number(product?.productImages.findIndex((el) => el.isMain === true)) || 0;

//   const [selectedImage, setSelectedImage] = useState(
//     mainImageIndex !== -1 ? mainImageIndex : 0
//   );

//   const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
//     if (!showZoom) return;

//     const { left, top, width, height } =
//       e.currentTarget.getBoundingClientRect();
//     const x = ((e.clientX - left) / width) * 100;
//     const y = ((e.clientY - top) / height) * 100;
//     setZoomPosition({ x, y });
//   };

//   const handleAddToCart = () => {
//     const productToAdd = {
//       ...product,
//       quantity,
//       selectedSize,
//       selectedColor,
//     };

//     dispatch(addToCart(productToAdd as any));
//     toast.success("Added to cart successfully!", {
//       icon: "🛍️",
//     });
//   };

//   const handleBuyNow = (id: any) => {
//     setIsLoading(true);
//     localStorage.setItem("buyProductQuantity", quantity.toString());
//     const param = new URLSearchParams();
//     param.set("Buy", id);
//     push(`/pages/cart/checkout?${param.toString()}`);
//   };

//   const handleAddToFavourite = (id: any) => {
//     const product = products.find((el) => el.id === id);
//     const inFavourite = items.find((el) => el.product.id === id);

//     if (product) {
//       dispatch(addToFav(product));
//       if (inFavourite) {
//         toast.success(`Product already in favourite!`);
//       } else {
//         toast.success(`${product.name} added to Fav!`);
//       }
//     }
//   };

//   if (!product)
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <p className="text-lg text-gray-600">Product not found</p>
//       </div>
//     );

//   return (
//     <div className="bg-gray-50 dark:bg-gray-900">
//       {isLoading && <LoadingState />}
//       <div className="py-4 sm:py-6 px-4 sm:px-6 lg:px-8 xl:px-16 max-w-7xl mx-auto">
//         {/* Breadcrumb Navigation */}
// <div className="flex items-center text-xs sm:text-sm pb-4 sm:pb-6 overflow-x-auto whitespace-nowrap">
//   <Link
//     href={`/category`}
//     onClick={() => setIsLoading(true)}
//     className="text-gray-500 hover:underline hover:text-blue-500"
//   >
//     Categories
//   </Link>
//   <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
//   <Link
//     href={`/category/${decodedCategory}`}
//     onClick={() => setIsLoading(true)}
//     className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
//   >
//     {decodedCategory}
//   </Link>
//   <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
//   <Link
//     href={`/category/${decodedCategory}/${decodedSub}`}
//     onClick={() => setIsLoading(true)}
//     className="text-gray-500 hover:underline hover:text-blue-500 capitalize"
//   >
//     {decodedSub}
//   </Link>
//   <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 mx-1 sm:mx-2 text-gray-400" />
//   <Label className="text-gray-900 dark:text-gray-100 capitalize truncate max-w-[150px] sm:max-w-none">
//     {product?.name}
//   </Label>
// </div>

//         {/* Product Main Content */}
//         <div className="grid grid-cols-1 lg:grid-cols-[1fr_1fr] gap-6 xl:gap-8">
//           {/* Product Images */}
//           <div className="space-y-4">
//             <div
//               className="relative aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"
//               onMouseEnter={() => setShowZoom(true)}
//               onMouseLeave={() => setShowZoom(false)}
//               onMouseMove={handleImageHover}
//             >
//               {product.productImages && (
//                 <Image
//                   src={
//                     product.productImages
//                       ? product.productImages[selectedImage]?.url
//                       : ""
//                   }
//                   alt={product?.name || "Product Image"}
//                   fill
//                   className="object-cover"
//                   priority
//                   sizes="(max-width: 768px) 100vw, 50vw"
//                 />
//               )}
//               {showZoom && (
//                 <div
//                   className="absolute inset-0 bg-white hidden lg:block"
//                   style={{
//                     backgroundImage: `url(${
//                       product.productImages.map((el) => el.url)[selectedImage]
//                     })`,
//                     backgroundPosition: `${zoomPosition.x}% ${zoomPosition.y}%`,
//                     backgroundSize: "200%",
//                   }}
//                 />
//               )}
//             </div>
//             <ImageScrol
//               images={product.productImages.map((el) => el.url)}
//               selectedImage={selectedImage}
//               setSelectedImage={setSelectedImage}
//             />
//           </div>

//           {/* Product Info */}
//           <Card className="rounded-lg shadow-xl p-4 sm:p-6">
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-700 dark:text-gray-300">
//               {product.brand}
//             </h2>
//             <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-gray-100 mt-2">
//               {product.name}
//             </h1>
//             <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base mt-2">
//               {product.description}
//             </p>

//             <div className="flex flex-col sm:flex-row sm:items-center gap-4 py-3 mt-4">
//               <div className="flex items-center gap-2 text-lg sm:text-xl font-semibold">
//                 <p className="text-gray-800 dark:text-gray-200">
//                   ${product.price}
//                 </p>
//                 {product.discount > 0 && (
//                   <span className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-xs sm:text-sm rounded-md">
//                     -{product.discount}% Off
//                   </span>
//                 )}
//               </div>

//               <div className="flex items-center gap-1">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 sm:w-5 sm:h-5 ${
//                       i < product.ratings
//                         ? "text-yellow-500"
//                         : "text-gray-300 dark:text-gray-600"
//                     }`}
//                   />
//                 ))}
//                 <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 ml-2">
//                   ({product.ratings} ratings)
//                 </span>
//               </div>
//             </div>

//             <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
//               {product.stock > 0 ? (
//                 <span className="text-green-600 dark:text-green-400 font-semibold flex items-center">
//                   <Check size={16} className="mr-1" /> In Stock
//                 </span>
//               ) : (
//                 <span className="text-red-500 font-semibold">Out of Stock</span>
//               )}
//             </p>

//             {/* Size Selection */}
//             <div className="mt-6">
//               <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Size
//               </Label>
//               <div className="flex flex-wrap gap-2 mt-2">
//                 {["S", "M", "L", "XL", "XXL"].map((size) => (
//                   <Button
//                     key={size}
//                     variant={selectedSize === size ? "default" : "outline"}
//                     onClick={() => setSelectedSize(size)}
//                     className="w-10 h-10 sm:w-12 sm:h-12 text-xs sm:text-sm"
//                   >
//                     {size}
//                   </Button>
//                 ))}
//               </div>
//             </div>

//             {/* Color Selection */}
//             <div className="mt-4">
//               <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Color
//               </Label>
//               <div className="flex gap-2 mt-2">
//                 {["Red", "Blue", "Green", "Black", "White"].map((color) => (
//                   <button
//                     key={color}
//                     onClick={() => setSelectedColor(color)}
//                     className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 ${
//                       selectedColor === color
//                         ? "border-primary"
//                         : "border-transparent"
//                     }`}
//                     style={{ backgroundColor: color.toLowerCase() }}
//                     aria-label={color}
//                   />
//                 ))}
//               </div>
//             </div>

//             {/* Quantity Selector */}
//             <div className="flex items-center gap-4 mt-6">
//               <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">
//                 Quantity
//               </Label>
//               <div className="flex items-center">
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setQuantity(Math.max(1, quantity - 1))}
//                 >
//                   <Minus className="w-4 h-4" />
//                 </Button>
//                 <Input
//                   type="number"
//                   value={quantity}
//                   onChange={(e) =>
//                     setQuantity(Math.max(1, parseInt(e.target.value) || 1))
//                   }
//                   className="w-16 sm:w-20 text-center mx-2 h-9 sm:h-10"
//                   min="1"
//                 />
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={() => setQuantity(quantity + 1)}
//                 >
//                   <Plus className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* Action Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 mt-6">
//               <Button
//                 className="flex-1 bg-orange-600 hover:bg-orange-500 h-11"
//                 onClick={handleAddToCart}
//               >
//                 <ShoppingCart className="w-4 h-4 mr-2" />
//                 Add to Cart
//               </Button>
//               <Button
//                 className="flex-1 bg-orange-600 hover:bg-orange-500 h-11"
//                 onClick={() => handleBuyNow(product.id)}
//               >
//                 Buy Now
//               </Button>
//               <div className="flex gap-3">
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={() => handleAddToFavourite(product.id)}
//                   className="h-11 w-11"
//                 >
//                   <Heart
//                     fill={
//                       items.some((el) => el.product.id === product.id)
//                         ? "oklch(70.4% 0.191 22.216)"
//                         : "white"
//                     }
//                     className="w-5 h-5 text-red-400"
//                   />
//                 </Button>
//                 <Button variant="outline" size="icon" className="h-11 w-11">
//                   <Share2 className="w-4 h-4" />
//                 </Button>
//               </div>
//             </div>

//             {/* Product Features */}
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 pt-6 mt-6 border-t">
//               {productFeatures.map((feature, index) => (
//                 <Card
//                   key={index}
//                   className="flex flex-col items-center text-center p-3 sm:p-4"
//                 >
//                   {feature.icon}
//                   <h3 className="font-medium text-sm sm:text-base mt-2">
//                     {feature.title}
//                   </h3>
//                   <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
//                     {feature.description}
//                   </p>
//                 </Card>
//               ))}
//             </div>
//           </Card>
//         </div>

//         {/* Product Tabs */}
//         <Tabs defaultValue="specifications" className="mt-8 sm:mt-12">
//           <TabsList className="w-full justify-start border-b overflow-x-auto">
//             <TabsTrigger value="specifications" className="text-xs sm:text-sm">
//               Specifications
//             </TabsTrigger>
//             <TabsTrigger value="details" className="text-xs sm:text-sm">
//               Product Details
//             </TabsTrigger>
//             <TabsTrigger value="reviews" className="text-xs sm:text-sm">
//               Reviews
//             </TabsTrigger>
//           </TabsList>
//           <TabsContent value="specifications" className="mt-4 sm:mt-6">
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
//               {product.specifications?.map((spec: any, idx: number) => (
//                 <Card key={idx} className="flex gap-2 p-3 sm:p-4 rounded-lg">
//                   <p className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">
//                     {spec.key}:
//                   </p>
//                   <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
//                     {spec.value}
//                   </p>
//                 </Card>
//               ))}
//             </div>
//           </TabsContent>
//           <TabsContent value="details" className="mt-4 sm:mt-6">
//             <div className="prose max-w-none">
//               <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">
//                 Product Description
//               </h3>
//               <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
//                 {product.description}
//               </p>
//             </div>
//           </TabsContent>
//           <TabsContent value="reviews" className="mt-4 sm:mt-6">
//             <ProductReviews productId={String(product.id)} />
//           </TabsContent>
//         </Tabs>

//         {/* Additional Sections */}
//         <div className="mt-8 sm:mt-10">
//           <AIRecommendations />
//         </div>

//         <div className="mt-8 sm:mt-10">
//           <h3 className="text-xl sm:text-2xl font-semibold mb-4">
//             3D & AR Product Viewer
//           </h3>
//           <ARProductViewer productName={product.name} />
//         </div>

//         <div className="mt-8 sm:mt-10">
//           <LiveChat />
//         </div>
//       </div>
//     </div>
//   );
// }
