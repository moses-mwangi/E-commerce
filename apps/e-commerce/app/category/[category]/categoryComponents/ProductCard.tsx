import LoadingState from "@/app/components/loaders/LoadingState";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import useCategoryContex from "@/hooks/useCategoryContex";
import useSubCategoryContex from "@/hooks/useSubCategoryContex";
import { Heart, Star, Eye } from "lucide-react";
import React from "react";

export default function ProductCard({ val }: { val: string }) {
  const categoryContext = useCategoryContex();
  const subCategoryContext = useSubCategoryContex();

  const {
    handleAddToCart,
    handleAddToFavourite,
    filteredProducts,
    handleBuyNow,
    handleRoute,
    isLoading,
    items: favItems,
  } = val === "category" ? categoryContext : subCategoryContext;

  return (
    <>
      {isLoading === true && <LoadingState />}
      <div className={`sm:hidden grid grid-cols-2 gap-3 flex-1`}>
        {filteredProducts?.map((product) => (
          <Card
            key={product.id}
            className={`flex flex-col h-full bg-white shadow-lg rounded-xl overflow-hidden`}
          >
            <div
              className={`group aspect-square h-32 rounded-b-none rounded-t-md w-full bg-gray-200 relative overflow-hidden hover:cursor-pointer`}
            >
              <div
                className={`relative h-full bg-gray-900`}
                style={{
                  backgroundImage: product.productImages
                    ? `url(${String(
                        product.productImages.find((el) => el.isMain === true)
                          ?.url
                      )})`
                    : "",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              <Button
                onClick={() => handleAddToFavourite(product.id)}
                size="icon"
                className="absolute top-2 right-2 bg-gray-100/65 hover:bg-gray-100 z-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 w-8 h-8"
              >
                <Heart
                  fill={
                    favItems.some((el) => el.product.id === product.id)
                      ? "oklch(70.4% 0.191 22.216)"
                      : "white"
                  }
                  className="w-4 h-4 text-red-400"
                />
              </Button>
            </div>

            <CardContent
              className={`px-0 pb-2 flex flex-col justify-between flex-1`}
            >
              <div className="space-y-[6px] p-2">
                <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-1">
                  {product.name}
                </h2>
                <p className="text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center gap-2 text-base sm:text-lg font-semibold">
                  <p className="text-gray-800 dark:text-gray-200">
                    ${product.price}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-red-500 bg-red-100 dark:bg-red-900 px-1 sm:px-2 py-0.5 text-xs rounded-md">
                      -{product.discount}%
                    </p>
                  )}
                </div>

                <div className="flex gap-1 items-center text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        index < product.ratings
                          ? "text-yellow-500"
                          : "text-gray-400"
                      }`}
                    />
                  ))}
                  <span className="ml-1">({product.ratings})</span>
                </div>
              </div>

              <div className={`grid grid-cols-2 gap-2 mt-2 px-2`}>
                <Button
                  size="sm"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-xs h-7"
                  onClick={() => handleAddToCart(product.id)}
                >
                  Add to Cart
                </Button>
                <Button
                  size="sm"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-xs h-7"
                  onClick={() => handleBuyNow(product.id)}
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => handleRoute(product.name, product.id)}
                  size="sm"
                  variant="outline"
                  className={`col-span-2 w-full h-7`}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  View
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}
