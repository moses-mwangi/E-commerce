import useLanguage_Currency from "@/app/home-page/navbar/language_currency_change/useLanguage_Currency";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Product } from "../../categoryComponents/product";

interface ProductCardProps {
  product: Product;
  view: string;
}

export function ProductCard({ product, view }: ProductCardProps) {
  const { category, subcategory } = useParams();
  const { selectedCurrency } = useLanguage_Currency();

  if (view === "list") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
      >
        <div className="flex">
          <div className="relative w-48 h-48">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover rounded-l-lg"
            />
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <Button variant="ghost" size="icon">
                <Heart className="w-5 h-5" />
              </Button>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < product.rating
                        ? "text-yellow-400 fill-current"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500">
                ({product.reviews} reviews)
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="space-x-2">
                <span className="text-2xl font-bold text-gray-900">
                  {`${product.currency} ${product.price
                    .toFixed(2)
                    .toLocaleString()}`}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {`${product.currency} ${product.originalPrice
                      .toFixed(2)
                      .toLocaleString()}`}
                  </span>
                )}
              </div>
              <Button asChild>
                <Link href={`/product/${product.id}`}>View Details</Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
    >
      <Link
        href={`/category/${product.category}/${subcategory}/${product.name}`}
        className="block"
      >
        <div className="relative aspect-square">
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover rounded-t-lg"
          />
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm"
          >
            <Heart className="w-5 h-5" />
          </Button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < product.rating
                      ? "text-yellow-400 fill-current"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              {`${product.currency} ${product.price
                .toFixed(2)
                .toLocaleString()}`}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {`${product.currency} ${product.originalPrice
                  .toFixed(2)
                  .toLocaleString()}`}
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
