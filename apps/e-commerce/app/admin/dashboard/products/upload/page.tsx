/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, Plus, ArrowLeft, ImagePlus, Loader2 } from "lucide-react";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

interface ProductImage {
  id: number;
  url: string;
  preview: string;
}

export default function ProductUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [images, setImages] = useState<(File & { preview: string })[]>([]);
  const [specs, setSpecs] = useState<any[]>([]);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [categories] = useState([
    "Electronics",
    "Clothing",
    "Books",
    "Home & Garden",
    "Sports",
  ]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prev) => [...prev, ...newImages]);
    setValue("images", [...(watch("images") || []), ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    const currentImages = watch("images") || [];
    setValue(
      "images",
      currentImages.filter((_: any, i: number) => i !== index)
    );
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setSpecs([...specs, { key: specKey, value: specValue }]);
      setSpecKey("");
      setSpecValue("");
    }
  };

  const removeSpecification = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (!Array.isArray(data.images) || data.images.length < 5) {
      toast.error("Please select at least 5 images.");
      return;
    }
    const refined = { ...data, specifications: specs };

    console.log(refined);

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("name", refined.name);
      formData.append("category", refined.category);
      formData.append("price", refined.price.toString());
      formData.append("stock", refined.stock.toString());
      formData.append("description", refined.description);
      formData.append("discount", refined.discount.toString());
      formData.append("ratings", refined.ratings.toString());
      formData.append("brand", refined.brand);
      formData.append("specifications", JSON.stringify(refined.specifications));

      refined.images.forEach((image: File) => {
        formData.append("images", image);
      });

      // await axios.post("http://127.0.0.1:8000/api/product", formData, {
      //   headers: {
      //     "Content-Type": "multipart/form-data",
      //   },
      // });
      reset();
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Error uploading product");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* <Link
            href="/dashboard/products"
            className="text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-6 h-6" />
          </Link> */}
          <div>
            <h1 className="text-2xl font-semibold text-gray-800">
              Upload New Product
            </h1>
            <p className="text-gray-600 mt-1">
              Add a new product to your store
            </p>
          </div>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">Save as Draft</Button>
          {/* <Button className="bg-primary"> */}
          <Button className="bg-orange-500 hover:bg-orange-600">
            {isUploading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Publish Product
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Basic Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <Label>Product Name</Label>
                  <Input
                    {...register("name", { required: true })}
                    placeholder="Enter product name"
                  />
                </div>
                <div>
                  <Label>Brand</Label>
                  <Input
                    {...register("brand")}
                    placeholder="Enter brand name"
                  />
                </div>
              </div>
              <div>
                <Label>Description</Label>
                <Textarea
                  {...register("description", { required: true })}
                  rows={4}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Enter product description"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Media</h2>
            <div
              {...getRootProps()}
              className="border-2 border-dashed rounded-lg p-6 cursor-pointer hover:border-primary/50 transition-colors"
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center">
                <ImagePlus className="w-12 h-12 text-gray-400" />
                <p className="mt-2 text-sm text-gray-500">
                  Drag & drop images here, or click to select files
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-lg overflow-hidden group"
                >
                  <img
                    src={image.preview}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 p-1 bg-red-500 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Specifications</h2>
            <div className="space-y-4">
              <div className="flex space-x-3">
                <Input
                  type="text"
                  placeholder="Key (e.g., Color)"
                  value={specKey}
                  onChange={(e) => setSpecKey(e.target.value)}
                />
                <Input
                  type="text"
                  placeholder="Value (e.g., Red)"
                  value={specValue}
                  onChange={(e) => setSpecValue(e.target.value)}
                />
                <Button
                  className="bg-orange-500 hover:bg-orange-600"
                  type="button"
                  onClick={addSpecification}
                >
                  Add
                </Button>
              </div>
              <ul className="space-y-2">
                {specs.map((spec, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <span>
                      {spec.key}: {spec.value}
                    </span>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => removeSpecification(index)}
                    >
                      Remove
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Pricing</h2>
            <div className="space-y-4">
              <div>
                <Label>Regular Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    {...register("price", { required: true, min: 0 })}
                    className="pl-8"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <Label>Regular Price</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                    $
                  </span>
                  <Input
                    type="number"
                    {...register("SalePrice", { required: true, min: 0 })}
                    className="pl-8"
                    placeholder="0.00"
                  />
                </div>
              </div>
              <div>
                <Label>Discount (%)</Label>
                <Input
                  type="number"
                  {...register("discount", { min: 0, max: 100 })}
                  placeholder="0"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Organization</h2>
            <div className="space-y-4">
              <div>
                <Label>Category</Label>
                <select
                  {...register("category", { required: true })}
                  className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Initial Rating (0-5)</Label>
                <Input
                  type="number"
                  {...register("ratings", { min: 0, max: 5 })}
                  placeholder="0"
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-lg font-medium mb-4">Inventory</h2>
            <div className="space-y-4">
              <div>
                <Label>SKU</Label>
                <Input {...register("sku")} placeholder="Enter SKU" />
              </div>
              <div>
                <Label>Stock Quantity</Label>
                <Input
                  type="number"
                  {...register("stock", { required: true, min: 0 })}
                  placeholder="Enter quantity"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
