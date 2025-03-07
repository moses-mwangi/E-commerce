/* eslint-disable @next/next/no-img-element */
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
import { CameraIcon, SearchIcon, MicIcon } from "lucide-react";
import React, { useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import ImageSearch from "./ImageSearch";

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
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { t, i18n } = useTranslation();
  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
  };

  const handleVoiceSearch = useCallback(() => {
    if (!window.SpeechRecognition && !window.webkitSpeechRecognition) {
      setErrorMessage("Voice search is not supported in this browser.");
      return;
    }

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = "en-US";

    recognition.onstart = () => setErrorMessage("");
    recognition.onresult = (event: any) =>
      setSearchQuery(event.results[0][0].transcript);
    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);
      if (event.error === "not-allowed") {
        setErrorMessage(
          "Microphone access is denied. Please allow microphone access."
        );
      } else {
        setErrorMessage(
          "An error occurred while using voice recognition. Please try again."
        );
      }
    };

    try {
      recognition.start();
    } catch (error) {
      setErrorMessage("Failed to start speech recognition.");
    }
  }, []);

  const handleImageSearch = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith("image/")) {
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
        setErrorMessage("");
      } else {
        setErrorMessage("Please select an image file.");
      }
    }
  };

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
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageSelect}
            />
            <ImageSearch />
            <MicIcon
              onClick={handleVoiceSearch}
              className="hover:cursor-pointer hover:text-orange-500 transition duration-200"
              size={20}
              aria-label="Search by Voice"
            />
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

      {selectedImage && (
        <div className="mt-4 relative">
          <img
            src={selectedImage}
            alt="Selected image"
            className="max-h-40 rounded-lg shadow-md"
          />
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            ×
          </button>
        </div>
      )}

      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
