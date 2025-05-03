"use client";
import React, { useState, useRef } from "react";
import { FiCamera } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const ImageSearchPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState<string>();
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const handleSearchByImage = () => {
    if (selectedImage) {
      // Implement your image search logic here
      console.log("Searching with image:", selectedImage);
      setIsOpen(false);
    }
  };

  return (
    <>
      <button
        className="rounded-full text-gray-500 hover:text-gray-700"
        onClick={() => setIsOpen(true)}
      >
        <FiCamera size={18} />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Search by Image</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                isDragging
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-300 hover:border-gray-400"
              }`}
              onClick={triggerFileInput}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {selectedImage ? (
                <div className="relative w-full h-48">
                  <Image
                    src={selectedImage}
                    alt="Selected for search"
                    fill
                    className="object-contain rounded-md"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <FiCamera className="mx-auto h-12 w-12 text-gray-400" />
                  <p className="text-sm text-gray-500">
                    {isDragging
                      ? "Drop your image here"
                      : "Drag & drop an image or click to browse"}
                  </p>
                  <p className="text-xs text-gray-400">
                    Supports JPG, PNG, WEBP
                  </p>
                </div>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <Input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              <div className="flex gap-2 mt-4">
                <Input
                  placeholder="Paste the image URL"
                  className="flex-1 focus-visible:ring-orange-400/95"
                  value={String(url)}
                  onChange={(e) => setUrl(e.target.value)}
                />
                <Button
                  type="button"
                  variant="outline"
                  className=""
                  onClick={triggerFileInput}
                >
                  Browse Files
                </Button>
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  onClick={handleSearchByImage}
                  disabled={!selectedImage}
                >
                  Search
                </Button>
              </div>
            </div>

            {selectedImage && (
              <Button
                variant="ghost"
                className="w-full text-red-500 hover:text-red-600"
                onClick={() => setSelectedImage(null)}
              >
                Remove Image
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageSearchPopup;
