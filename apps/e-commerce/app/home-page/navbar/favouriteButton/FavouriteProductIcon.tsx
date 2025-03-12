"use client";

import { setFav } from "@/redux/slices/favoriteSlice";
import { RootState } from "@/redux/store";
import { HeartIcon } from "lucide-react";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

export default function FavouriteProduct() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { items: favItems } = useSelector(
    (state: RootState) => state.favourite
  );

  useEffect(() => {
    const savedFav = JSON.parse(localStorage.getItem("fav") || "[]");
    dispatch(setFav(savedFav));
  }, [dispatch]);

  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => router.push("/pages/favourites")}
      >
        <HeartIcon
          fill={favItems.length > 0 ? "#fca5a5" : "none"}
          color={favItems.length > 0 ? "#fca5a5" : "gray"}
          className="w-[26px] h-[26px]"
        />
      </div>
    </div>
  );
}
