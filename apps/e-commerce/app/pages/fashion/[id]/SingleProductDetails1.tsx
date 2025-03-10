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
import { FaShoppingCart, FaHeart, FaCheck, FaTruck } from "react-icons/fa";
import AIRecommendations from "./AIRecommendations";
import ARProductViewer from "./ARProductViewer";
import LiveChat from "./LiveChat";
import ImageScrol from "./ImageScrol";
import { Check, Heart, ShoppingCart, Star, Truck } from "lucide-react";
import { addToCart, setCart } from "@/redux/slices/cartSlice";

export default function SingleProductDetails() {
  const [showImage, setShowImage] = useState(1);
  const [quantity, setQuantity] = useState(1);
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
      dispatch(setCart(savedCart)); // Set cart state in Redux
    }
  }, [dispatch, id]);

  function handleAddToCart(id: any) {
    const product = products.find((el) => el.id === id);
    if (product) {
      dispatch(addToCart(product));
    }
  }

  if (!selectedProduct) {
    return (
      <div className="text-center py-20 text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="py-6 px-6 lg:px-16">
      <h1 className=" text-[13px] text-gray-700">{`pages > fasions > ${id} > ${selectedProduct.name}`}</h1>
      <div className="grid grid-cols-[1.5fr_1fr] py-10 lg:flex-row gap-12">
        <div className="lg:w-full flex flex-col gap-4 items-center h-[500px]">
          <div className="bg-gray-100 overflow-hidden w-full h-full flex items-center justify-center mx-auto px-12 rounded-xl shadow-lg">
            <Image
              className="w-auto h-full cursor-pointer object-cover transition-transform duration-300 hover:scale-105"
              src={selectedProduct?.images[showImage] || "/placeholder.jpg"}
              alt={selectedProduct?.name}
              width={500}
              height={400}
            />
          </div>
          <ImageScrol
            images={selectedProduct?.images}
            setShowImage={setShowImage}
          />
        </div>

        <Card className="flex flex-col gap-4 lg:w-full p-6 shadow-lg">
          <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300">
            {selectedProduct.brand}
          </h2>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            {selectedProduct.name}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-[16px]">
            {selectedProduct.description}
          </p>

          <div className="flex items-center gap-3 text-xl font-semibold">
            <p className="text-gray-800 dark:text-gray-200">
              ${selectedProduct.price}
            </p>
            {selectedProduct.discount > 0 && (
              <span className="text-red-500 bg-red-100 dark:bg-red-900 px-2 py-1 text-sm rounded-md">
                -{selectedProduct.discount}% Off
              </span>
            )}
          </div>

          <div className="flex gap-1 items-center text-[16px] text-gray-600 dark:text-gray-400">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-5 h-5 ${
                  index < selectedProduct.ratings
                    ? "text-yellow-500"
                    : "text-gray-400"
                }`}
              />
            ))}
            <span className="ml-2">({selectedProduct.ratings})</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {selectedProduct.specifications?.map((spec: any, idx: any) => (
              <div className="flex gap-2" key={idx}>
                <p className="font-semibold text-gray-900 dark:text-gray-100">
                  {spec.key}:
                </p>
                <p className="text-gray-700 text-[15px] dark:text-gray-300">
                  {spec.value}
                </p>
              </div>
            ))}
          </div>

          <p className="text-sm text-[16px] text-gray-500">
            {selectedProduct.stock > 0 ? (
              <span className="text-green-600 font-semibold flex items-center">
                <Check className="mr-1" /> In Stock
              </span>
            ) : (
              <span className="text-red-500 font-semibold">Out of Stock</span>
            )}
          </p>

          <div className="flex items-center text-gray-800 mt-3">
            <Truck className="mr-2 text-lg" />
            <p>
              Estimated Delivery :
              <span className="font-medium pl-1 text-[16px] text-gray-700">
                3-5 business days
              </span>
            </p>
          </div>

          <div className="flex items-center space-x-3 mb-6 mt-4">
            <Button
              className="px-4 py-2 hover:text-white text-black bg-gray-200 rounded-md"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              -
            </Button>
            <Input
              type="number"
              className="w-20 flex items-center justify-center text-center border border-gray-300"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
            />
            <Button
              className="px-4 py-2 hover:text-white text-black bg-gray-200 rounded-md"
              onClick={() => setQuantity(quantity + 1)}
            >
              +
            </Button>
          </div>

          <div className="flex flex-col space-y-4">
            <Button
              className="bg-orange-500 text-white w-full flex items-center justify-center py-3 text-[15px] rounded-lg"
              onClick={() => handleAddToCart(selectedProduct.id)}
            >
              <ShoppingCart className="mr-2" /> Add to Cart
            </Button>
            <Button className="bg-green-500 text-white w-full flex items-center justify-center py-3 text-[15px] rounded-lg">
              Buy Now
            </Button>
            <Button className="bg-red-400 text-white w-full flex items-center justify-center py-3 text-[15px] rounded-lg">
              <Heart className="mr-2" /> Add to Wishlist
            </Button>
          </div>
        </Card>
      </div>

      <div className="mt-10">
        {/* <AIRecommendations productId={selectedProduct?.id} /> */}
        <AIRecommendations />
      </div>

      <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">3D & AR Product Viewer</h3>
        {/* <ARProductViewer product={selectedProduct} /> */}
        <ARProductViewer />
      </div>

      {/* <div className="mt-10">
        <h3 className="text-2xl font-semibold mb-4">
          Live Chat with AI & Seller
        </h3>
      </div> */}
      <LiveChat />
    </div>
  );
}
