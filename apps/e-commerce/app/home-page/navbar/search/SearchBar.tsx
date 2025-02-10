/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

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
import React, { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

  // Voice Search Functionality
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

  return (
    <div className="flex space-x-3 items-center justify-between w-[500px] bg-white rounded-full shadow-md px-4 py-2 border border-gray-200">
      {/* Category Selector */}
      <Select value={selectedCategory} onValueChange={setSelectedCategory}>
        <SelectTrigger className="w-auto py-1 px-3 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 focus:ring-2 focus:ring-orange-500">
          <SelectValue placeholder={t("All Products")} />
        </SelectTrigger>
        <SelectContent className="bg-white shadow-lg border border-gray-200 rounded-lg">
          {categories.map((el) => (
            <SelectGroup key={el.value}>
              <SelectItem value={el.value}>{el.category}</SelectItem>
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>

      {/* Search Bar */}
      <div className="flex items-center flex-grow relative">
        <Input
          className="w-full py-2 px-4 text-gray-700 bg-transparent border-none focus:ring-0 placeholder-gray-500"
          placeholder={t("Search for products...")}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center gap-3 absolute right-2 text-gray-500">
          {/* Image Search Icon */}
          <CameraIcon
            onClick={() => console.log("Image Search")}
            className="hover:cursor-pointer hover:text-orange-500 transition duration-200"
            size={20}
            aria-label="Search by Image"
          />
          {/* Voice Search Mic Icon */}
          <MicIcon
            onClick={handleVoiceSearch}
            className="hover:cursor-pointer hover:text-orange-500 transition duration-200"
            size={20}
            aria-label="Search by Voice"
          />
        </div>
      </div>

      {/* Search Button */}
      <button
        onClick={() =>
          console.log(
            "Text Search:",
            searchQuery,
            "Category:",
            selectedCategory
          )
        }
        className="ml-2 flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-[5px] rounded-full font-medium shadow-md transition duration-200"
        aria-label="Search"
      >
        <SearchIcon size={18} /> {t("Search")}
      </button>

      {/* Error Message Display */}
      {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
    </div>
  );
}
