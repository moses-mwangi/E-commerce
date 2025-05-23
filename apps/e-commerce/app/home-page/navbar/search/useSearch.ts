/* eslint-disable react-hooks/exhaustive-deps */
import { AppDispatch, RootState } from "@/redux/store";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Category } from "../../../types/category";
import { Product } from "../../../types/products";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProducts } from "@/redux/slices/productSlice";
import { debounce } from "lodash";

type SearchSuggestion = {
  type:
    | "product"
    | "subProduct"
    | "category"
    | "categorySlung"
    | "subCategoryName"
    | "subCategorySlung"
    | "brand"
    | "recent"
    | "popular"
    | string;
  data: Product | Category | object | string;
};

function useSearch() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [suggestionsCount, setSuggestionsCount] = useState(10);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [isLoading, setIsLoading] = useState(false);
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const dispatch: AppDispatch = useDispatch();
  const { categories } = useSelector((state: RootState) => state.category);
  const { products, status } = useSelector((state: RootState) => state.product);

  // Enhanced features state
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [popularSearches, setPopularSearches] = useState<string[]>([]);
  const [trendingCategories, setTrendingCategories] = useState<string[]>([]);
  const [popularBrands, setPopularBrands] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (isInitialLoad) {
      dispatch(fetchCategories());
      dispatch(fetchProducts());
      setIsInitialLoad(false);
    }
  }, [dispatch, isInitialLoad, setIsInitialLoad]);

  useEffect(() => {
    if (suggestionsCount > 0) {
      setSuggestionsCount(suggestionsCount);
    }
  }, [suggestionsCount]);

  useEffect(() => {
    const storedRecent = JSON.parse(
      localStorage.getItem("recentSearches") || "[]"
    );
    setRecentSearches(storedRecent);

    setPopularSearches([
      "iPhone 15 Pro",
      "Air Fryer XXL",
      "Yoga Mat Premium",
      "Blender Pro 2000",
      'Smart TV 4K 65"',
    ]);

    setTrendingCategories([
      "Gaming Laptops",
      "Wireless Earbuds",
      "Smart Home",
      "Fitness Trackers",
      "Organic Skincare",
    ]);

    setPopularBrands(products?.map((el) => String(el.brand)));
  }, [products]);

  useEffect(() => {
    if (typeof window !== "undefined" && "webkitSpeechRecognition" in window) {
      recognitionRef.current = new (window as any).webkitSpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = "en-US";

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setQuery(transcript);
        setIsListening(false);
        handleSearch({ preventDefault: () => {} });
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error("Voice recognition error", event.error);
        setIsListening(false);
      };
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filterProductsName = useCallback(
    (query: string, category: string) => {
      const lowerQuery = query.toLowerCase();
      return products.filter(
        (product) =>
          product.name?.toLowerCase().includes(lowerQuery) &&
          (category === "All Categories" ||
            product.category.toLowerCase() === category.toLowerCase())
      );
    },
    [products]
  );

  const filterSubProductsName = useCallback(
    (query: string, category: string) => {
      const lowerQuery = query.toLowerCase();
      return products.filter(
        (product) =>
          product.subCategory?.toLowerCase().includes(lowerQuery) &&
          (category === "All Categories" ||
            product.category.toLowerCase() === category.toLowerCase())
      );
    },
    [products]
  );

  const filterCategoriesName = useCallback(
    (query: string) => {
      return categories.filter(
        (cat) =>
          cat.name !== "All Categories" &&
          cat.name?.toLowerCase().includes(query.toLowerCase())
      );
    },
    [categories]
  );

  const filterCategoriesSlung = useCallback(
    (query: string) => {
      return categories.filter(
        (cat) =>
          cat.name !== "All Categories" &&
          cat.slug?.toLowerCase().includes(query.toLowerCase())
      );
    },
    [categories]
  );

  const filterSubCategoriesName = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return categories
        .filter((cat) => cat.name !== "All Categories")
        .flatMap((cat) =>
          cat.subcategories.filter((sub) =>
            sub.name.toLowerCase().includes(lowerQuery)
          )
        );
    },
    [categories]
  );

  const filterSubCategoriesSlung = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return categories
        .filter((cat) => cat.name !== "All Categories")
        .flatMap((cat) =>
          cat.subcategories?.filter((sub) =>
            sub?.slug?.toLowerCase().includes(lowerQuery)
          )
        );
    },
    [categories]
  );

  const filterBrands = useCallback(
    (query: string) => {
      return popularBrands.filter((brand) =>
        brand.toLowerCase().includes(query.toLowerCase())
      );
    },
    [popularBrands]
  );

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async (query: string, category: string) => {
      if (query.length < 2) {
        setSuggestions([]);
        return;
      }

      setIsLoading(true);
      try {
        const filteredProducts = filterProductsName(query, category);
        const filteredSubProducts = filterSubProductsName(query, category);

        const matchedCategories = filterCategoriesName(query);
        const matchedCategoriesSlung = filterCategoriesSlung(query);

        const matchedSubCategoriesName = filterSubCategoriesName(query);
        const matchedSubCategoriesSlung = filterSubCategoriesSlung(query);

        const matchedBrands = filterBrands(query);

        const newSuggestions: SearchSuggestion[] = [
          ...(matchedCategories ?? []).map((cat: any) => ({
            type: "category",
            data: cat,
          })),
          ...(matchedCategoriesSlung ?? []).map((cat: any) => ({
            type: "categorySlung",
            data: cat,
          })),
          ...(matchedSubCategoriesName ?? []).map((cat: any) => ({
            type: "subCategoryName",
            data: cat,
          })),
          ...(matchedSubCategoriesSlung ?? []).map((cat: any) => ({
            type: "subCategorySlung",
            data: cat,
          })),

          ...(matchedBrands ?? []).map((brand: any) => ({
            type: "brand",
            data: brand,
          })),

          ...filteredProducts.map((product) => ({
            type: "product",
            data: product,
          })),
          ...filteredSubProducts.map((product) => ({
            type: "subProduct",
            data: product,
          })),
        ];

        setSuggestions(newSuggestions);
      } catch (error) {
        console.error("Search error:", error);
        setSuggestions([]);
      } finally {
        setIsLoading(false);
      }
    }, 200),
    [filterProductsName, filterCategoriesName, filterBrands]
  );

  useEffect(() => {
    // if (query.trim()) {
    if (query) {
      debouncedSearch(query, selectedCategory);
    } else {
      setSuggestions([]);
    }

    return () => debouncedSearch.cancel();
  }, [query, selectedCategory, debouncedSearch]);

  const handleSearch = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (!query.trim()) {
      setShowSuggestions(false);
      return;
    }

    // Save to recent searches
    const updatedRecent = [
      query,
      ...recentSearches.filter(
        (item) => item.toLowerCase() !== query.toLowerCase()
      ),
    ].slice(0, 5);

    setRecentSearches(updatedRecent);
    localStorage.setItem("recentSearches", JSON.stringify(updatedRecent));

    console.log(updatedRecent);

    setShowSuggestions(false);
    inputRef.current?.blur();
  };

  const startVoiceSearch = () => {
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    } else {
      console.warn("Voice recognition not supported");
    }
  };

  return {
    query,
    setQuery,
    suggestions,
    setSuggestions,
    showSuggestions,
    setShowSuggestions,
    selectedCategory,
    setSelectedCategory,
    isLoading,
    setIsLoading,
    isInitialLoad,
    setIsInitialLoad,
    categories,
    products,
    status,

    //////

    recentSearches,
    setRecentSearches,
    popularSearches,
    setPopularSearches,
    trendingCategories,
    setTrendingCategories,
    popularBrands,
    setPopularBrands,
    isListening,
    setIsListening,

    searchRef,
    inputRef,
    recognitionRef,

    handleSearch,
    debouncedSearch,
    startVoiceSearch,
    setSuggestionsCount,
  };
}

export default useSearch;
