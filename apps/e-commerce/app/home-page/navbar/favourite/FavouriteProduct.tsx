import { HeartIcon } from "lucide-react";
import React from "react";

export default function FavouriteProduct() {
  return (
    <div>
      <div
        className="cursor-pointer"
        onClick={() => {
          console.log("/pages/favourites");
        }}
      >
        <HeartIcon color="gray" className="w-[26px] h-[26px]" />
      </div>
    </div>
  );
}
