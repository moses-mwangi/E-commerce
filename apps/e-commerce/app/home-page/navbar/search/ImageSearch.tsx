"use client";
import { CameraIcon, UploadCloudIcon, ImageIcon, X } from "lucide-react";
import React, { useState, ChangeEvent } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";

export default function ImageSearch() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [showPop, setShowPop] = useState(false);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        if (typeof result === "string") {
          setImagePreview(result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  return (
    <div className="relative">
      <CameraIcon
        className="hover:cursor-pointer hover:text-orange-500 transition duration-200"
        onClick={() => setShowPop((el) => !el)}
        size={22}
        aria-label="Search by Image"
      />

      {showPop === true && (
        <div className="absolute top-12 -right-36 w-96 mx-auto p-5 border rounded-lg shadow-lg bg-white">
          <div className="flex justify-between">
            <h2 className="text-[17px] font-semibold text-center mb-4">
              Find Products with Image Search
            </h2>
            <X
              size={20}
              className="cursor-pointer"
              onClick={() => {
                setShowPop(false);
                setImagePreview(null);
              }}
            />
          </div>

          <Card className="flex flex-col items-center bg-gray-50 gap-3 p-5 border border-dashed border-gray-300 rounded-md">
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Uploaded Preview"
                className="w-full h-40 object-cover rounded-md"
                width={50}
                height={80}
              />
            ) : (
              <div className="flex flex-col items-center text-gray-500">
                <ImageIcon size={40} />
                <p className="text-sm mt-2">No image selected</p>
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-md cursor-pointer hover:bg-gray-300 transition"
            >
              <UploadCloudIcon size={18} /> Upload an Image
            </label>
          </Card>
          <div className="flex gap-2 mt-4">
            <Input placeholder="Paste the image URL" className="flex-1" />
            <Button className="bg-orange-500 hover:bg-orange-600">
              Search
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
