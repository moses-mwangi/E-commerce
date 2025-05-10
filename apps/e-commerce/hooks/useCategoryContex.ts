import { addToCart, setCart } from "@/redux/slices/cartSlice";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { addToFav, setFav } from "@/redux/slices/favoriteSlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

function useCategoryContex() {
  const [isLoading, setIsLoading] = useState(false);
  const [gridView, setGridView] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("featured");

  const router = useRouter();
  const { items } = useSelector((state: RootState) => state.favourite);
  const { category } = useParams();
  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const { products } = useSelector((state: RootState) => state.product);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());

    if (typeof window !== "undefined") {
      const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
      const savedFav = JSON.parse(localStorage.getItem("fav") || "[]");
      dispatch(setCart(savedCart));
      dispatch(setFav(savedFav));
    }
  }, [dispatch]);

  const decodedCategory = decodeURIComponent(String(category));

  const subFilter = categories.find(
    (el) => el.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  const capitalizeWords = (str: string) => {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const handleAddToCart = (id: any) => {
    const product = products.find((el) => el.id === id);
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart!`);
    }
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

  const subCategoryProduct = products.filter(
    (el) => el.category.toLowerCase() === decodedCategory.toLowerCase()
  );

  const categoryData = categories.find(
    (el) => el.name.toLowerCase() === decodedCategory.toLowerCase()
  );

  const filteredProducts = subCategoryProduct
    .filter((product) => {
      const matchesSearch = product.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesBrand =
        selectedBrands.length === 0 ||
        selectedBrands.includes(String(product.brand));
      const matchesPrice =
        product.price >= priceRange[0] && product.price <= priceRange[1];
      const matchesRating =
        selectedRatings.length === 0 ||
        selectedRatings.includes(Math.floor(product.ratings));
      return matchesSearch && matchesBrand && matchesPrice && matchesRating;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price;
        case "price-high":
          return b.price - a.price;
        case "rating":
          return b.ratings - a.ratings;
        default:
          return 0;
      }
    });

  const handleRoute = (name: string, id: any) => {
    const proCategory = filteredProducts.find(
      (el) => el.id.toString() === String(id)
    );
    setIsLoading(true);
    const param = new URLSearchParams();
    param.set("id", id);
    router.push(
      `/category/${category}/${
        proCategory?.subCategory
      }/${name}?${param.toString()}`
    );
  };

  const subCategoryRoute = (name: string, id: any) => {
    setIsLoading(true);
    const param = new URLSearchParams();
    param.set("id", String(id));
    router.push(
      `/category/${category}/${name.toLowerCase()}?${param.toString()}`
    );
  };

  const handleBuyNow = (id: any) => {
    const quantity = 1;
    setIsLoading(true);

    localStorage.setItem("buyProductQuantity", quantity.toString());
    const param = new URLSearchParams();
    param.set("Buy", id);
    router.push(`/pages/cart/checkout?${param.toString()}`);
  };

  return {
    isLoading,
    gridView,
    setGridView,
    showFilters,
    setShowFilters,
    searchQuery,
    setSearchQuery,
    selectedBrands,
    setSelectedBrands,
    sortBy,
    setSortBy,
    category,
    subFilter,
    capitalizeWords,
    handleAddToCart,
    handleAddToFavourite,
    handleBuyNow,
    filteredProducts,
    handleRoute,
    categoryData,
    router,
    items,
    subCategoryRoute,
  };
}

export default useCategoryContex;
