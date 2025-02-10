import { HeartIcon } from "lucide-react";
import React from "react";

export default function FavouriteProduct() {
  return (
    <div>
      <div className="cursor-pointer">
        <HeartIcon color="gray" className="w-7 h-7" />
      </div>
    </div>
  );
}
