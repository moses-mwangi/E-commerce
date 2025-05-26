import useCategoryContex from "@/hooks/useCategoryContex";
import { fetchProducts } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function useBrowsingHistory() {
  const t = useState();
  const dispatch: AppDispatch = useDispatch();
  const { products, status } = useSelector((state: RootState) => state.product);
  const { recentlyViewed } = useSelector((state: RootState) => state.recently);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchProducts());
    }
  }, [dispatch, status]);

  return { recentlyViewed };
}

export default useBrowsingHistory;
