"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CameraIcon, SearchIcon } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ImageSearch from "./ImageSearch";
import VoiceSearch from "./VoiceSearch";

const categories = [
  { value: "All", category: "All Products" },
  { value: "beauty", category: "Beauty" },
  { value: "fashion", category: "Fashion" },
  { value: "kitchen", category: "Kitchen" },
  { value: "electronics", category: "Electronics" },
];

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showPop, setShowPop] = useState(false);

  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const icon = (
    <CameraIcon
      className="hover:cursor-pointer hover:text-orange-500 transition duration-200"
      onClick={() => setShowPop((el) => !el)}
      size={22}
      aria-label="Search by Image"
    />
  );

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center focus-within:ring-1 focus-within:ring-orange-300 justify-between w-[600px] bg-white rounded-full shadow-md px-4 py-1 border border-gray-200">
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className=" space-x-1 focus:ring-0 focus:ring-orange-200 w-auto h-[30px] bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200">
            <SelectValue className="" placeholder={t("All Products")} />
          </SelectTrigger>
          <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-lg">
            {categories.map((el) => (
              <SelectGroup key={el.value}>
                <SelectItem value={el.value}>{el.category}</SelectItem>
              </SelectGroup>
            ))}
          </SelectContent>
        </Select>

        <div className="flex items-center flex-grow relative">
          <Input
            className="w-full py-2 px-4 text-gray-700 bg-transparent border-none shadow-none focus-visible:ring-0 focus:ring-0 placeholder-gray-500"
            placeholder={t("Search for products")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="flex items-center gap-3 absolute right-2 text-gray-500">
            <ImageSearch icon={icon} showPop={showPop} setShowPo={setShowPop} />

            <VoiceSearch setSearchQuery={setSearchQuery} />
          </div>
        </div>

        <Button
          onClick={() =>
            console.log(
              "Text Search:",
              searchQuery,
              "Category:",
              selectedCategory
            )
          }
          className="h-[30px] ml-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-[5px] rounded-full font-medium shadow-md transition duration-200"
          aria-label="Search"
        >
          <SearchIcon size={18} /> {t("search")}
        </Button>
      </div>
    </div>
  );
}
