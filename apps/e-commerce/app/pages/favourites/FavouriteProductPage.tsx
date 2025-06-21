"use client";

import { addToCart } from "@/redux/slices/cartSlice";
import { clearFav, removeFromFav, setFav } from "@/redux/slices/favoriteSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineDelete } from "react-icons/md";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import LoadingState from "@/app/components/loaders/LoadingState";
import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { addToRecentlyViewed } from "@/redux/slices/BrowsingHistory";
import { fetchProducts } from "@/redux/slices/productSlice";
import Image from "next/image";
import toast from "react-hot-toast";

export default function FavouritesProductPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { products } = useSelector((state: RootState) => state.product);
  const { categories } = useSelector((state: RootState) => state.category);

  const { selectedCurrency } = useLanguage_Currency();

  const { items: favItems } = useSelector(
    (state: RootState) => state.favourite
  );

  const proSubCategory = categories
    .find((category) =>
      favItems.some(
        (item) =>
          item.product.category?.toLowerCase() === category.name.toLowerCase()
      )
    )
    ?.subcategories.find(
      (subcat) => subcat.name.toLowerCase() === "smartphones & accessories"
    );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedFav = JSON.parse(localStorage.getItem("fav") || "[]");

      const favProducts = products
        .filter((pro) => savedFav.some((el: any) => el.product.id === pro.id))
        .map((val) => {
          return { product: val };
        });

      dispatch(setFav(favProducts));
      dispatch(fetchProducts());
    }
  }, [dispatch, products]);

  const handleAddToCart = (id: any) => {
    const product = products.find((el) => el.id === id);
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart!`);
    }
  };

  const handleRemove = (productId: number) => {
    dispatch(removeFromFav(productId));
  };

  const handleClearFav = () => {
    dispatch(clearFav());
  };

  return (
    <>
      {isLoading === true && <LoadingState />}
      <div className=" sm:px-6 md:px-8 lg:px-44 mt-4 sm:mt-6 md:mt-8 min-h-screen">
        <div className="px-2 sm:px-0  flex sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Your Favourites
          </h1>

          <Link
            href="/category"
            onClick={() => setIsLoading(true)}
            className="flex items-center text-gray-700 transition-all duration-200 hover:text-blue-400 font-semibold text-sm hover:underline"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Continue Shopping
          </Link>
        </div>

        <Card className="bg-gray-50 rounded-none sm:rounded-xl mb-10 mx-auto sm:px-4 py-4">
          {favItems.length === 0 && (
            <div className="text-center py-8 sm:py-16 min-h-[40svh]">
              <h1 className="text-xl sm:text-2xl font-bold text-center mb-3">
                Your Favourites is Empty
              </h1>
              <p className="text-gray-500 mb-6 sm:mb-8">
                Looks like you haven&apos;t added any favourites item yet.
              </p>
              <Button
                className="bg-orange-500/90 w-28 hover:bg-orange-600"
                disabled={isLoading === true}
                onClick={() => {
                  setIsLoading(true);
                  router.push("/");
                }}
              >
                {isLoading === true ? <ButtonLoader /> : "Back Home"}
              </Button>
            </div>
          )}

          {favItems.length > 0 && (
            <div className="mb-4">
              <CardHeader className="p-4 sm:p-6">
                <CardTitle className="flex sm:flex-row justify-between items-start sm:items-center gap-4">
                  <p className="">Favourite Items</p>
                  <div
                    className="bg-gray-200 hover:bg-gray-300 hover:text-red-700 text-red-500 transition-all duration-200 flex items-center gap-1 cursor-pointer text-sm sm:text-[15px] font-medium rounded-sm px-3 sm:px-5 py-[6px] sm:py-[8px]"
                    onClick={handleClearFav}
                  >
                    <MdOutlineDelete size={17} />
                    Clear
                  </div>
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-3 sm:gap-4">
                {favItems.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 sm:p-4 border rounded-lg bg-white"
                  >
                    <div className="flex-shrink-0 flex items-center sm:items-start gap-2 sm:gap-0 sm:block">
                      <Image
                        src={
                          item.product.productImages
                            ? String(
                                item.product.productImages.find(
                                  (el: any) => el.isMain === true
                                )?.url
                              )
                            : ""
                        }
                        alt={item.product.name}
                        width={80}
                        height={80}
                        className="rounded-md object-cover h-16 w-16 sm:h-20 sm:w-24"
                      />
                      <div className="flex-1 sm:hidden min-w-0">
                        <Link
                          href={`/category/${item.product.category}/${proSubCategory?.name}/${item.product.name}?id=${item.product.id}`}
                          onClick={() => {
                            setIsLoading(true);
                            dispatch(addToRecentlyViewed(item.product));
                          }}
                          className="font-medium hover:underline hover:text-gray-700 transition-all duration-200 cursor-pointer line-clamp-2"
                        >
                          {item.product.name}
                        </Link>
                        <p className="text-sm text-gray-500 mt-1">
                          {`Price : ${selectedCurrency.toLocaleUpperCase()} ${
                            item.product.price
                          }`}
                        </p>
                      </div>
                    </div>

                    <div className="flex-1 hidden sm:block min-w-0">
                      <Link
                        href={`/category/${item.product.category}/${proSubCategory?.name}/${item.product.name}?id=${item.product.id}`}
                        onClick={() => {
                          setIsLoading(true);
                          dispatch(addToRecentlyViewed(item.product));
                        }}
                        className="font-medium w-full hover:underline hover:text-gray-700 transition-all duration-200 cursor-pointer line-clamp-1"
                      >
                        {item.product.name}
                      </Link>
                      <p className="text-sm text-gray-500 mt-1">
                        {`Price : ${item.product.currency} ${item.product.price}`}
                      </p>
                    </div>

                    <div className="w-full sm:w-auto flex sm:flex-col gap-4 sm:space-y-2 items-center sm:block justify-end">
                      <Button
                        onClick={() => handleAddToCart(item.product.id)}
                        className="h-8 sm:h-[26px] bg-orange-500 rounded-sm sm:rounded-[2px] hover:bg-orange-600/85 text-sm sm:text-[15px] w-full sm:w-auto"
                      >
                        <ShoppingCart />
                      </Button>
                      <button
                        onClick={() => handleRemove(item.product.id)}
                        className=" transition-all duration-300 px-5 sm:px-3 py-2 sm:py-[2px] rounded-[2px] flex mx-auto text-red-500 hover:bg-slate-100"
                      >
                        <X className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </div>
          )}
        </Card>
      </div>
    </>
  );
}
