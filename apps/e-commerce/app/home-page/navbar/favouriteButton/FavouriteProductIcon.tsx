"use client";

import { setFav } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import { HeartIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import LoadingState from "@/app/components/loaders/LoadingState";

export default function FavouriteProduct() {
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  const { items: favItems } = useSelector(
    (state: RootState) => state.favourite
  );

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("fav") || "[]");
    dispatch(setFav(savedFav));
  }, [dispatch]);

  const showLoading = () => {
    setIsLoading(true);
    router.push("/pages/favourites");
  };

  return (
    <div>
      {isLoading === true && <LoadingState />}
      <div className="cursor-pointer" onClick={() => showLoading()}>
        <HeartIcon
          fill={favItems.length > 0 ? "#fca5a5" : "none"}
          color={favItems.length > 0 ? "#fca5a5" : "gray"}
          className="w-[26px] h-[26px]"
        />
      </div>
    </div>
  );
}
