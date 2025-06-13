"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, X, ImagePlus, Loader2 } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchCategories } from "@/redux/slices/categorySlice";
import Image from "next/image";

interface ProductImage {
  id: number;
  url: string;
  preview: string;
}

export default function ProductUploadPage() {
  const [isUploading, setIsUploading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubCategory, setSelectedSubCategory] = useState("");

  const [images, setImages] = useState<(File & { preview: string })[]>([]);
  const [specs, setSpecs] = useState<any[]>([]);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");

  const { categories } = useSelector((state: RootState) => state.category);
  const dispatch: AppDispatch = useDispatch();

  const category = categories.map((el) => el.name);
  const subCategory = categories
    .find((el) => el.name.toLowerCase() === selectedCategory.toLowerCase())
    ?.subcategories.map((el) => el.name);

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
    dispatch(fetchCategories());
  }, [dispatch]);

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
    console.log(data);
    if (!Array.isArray(data.images) || data.images.length < 5) {
      toast.error("Please select at least 5 images.");
      return;
    }

    const product = {
      ...data,
      specifications: specs,
      category: selectedCategory,
      subCategory: selectedSubCategory,
    };

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("category", product.category);
      formData.append("subCategory", product.subCategory);
      formData.append("price", product.price.toString());
      formData.append("costPrice", product.costPrice.toString());
      formData.append("stock", product.stock.toString());
      formData.append("description", product.description);
      formData.append("discount", product.discount.toString());
      formData.append("ratings", product.ratings.toString());
      formData.append("brand", product.brand);
      formData.append("specifications", JSON.stringify(product.specifications));

      product.images.forEach((image: File) => {
        formData.append("images", image);
      });

      // for (const [key, value] of formData.entries()) {
      //   console.log(key, value);
      // }

      await axios.post("http://127.0.0.1:8000/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      reset();
      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Error uploading product");
      // console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="px-3 py-3 sm:py-5 sm:px-6 space-y-6"
      >
        <div className="flex flex-col sm:flex-row gap-1 sm:gap-0 items-center justify-between">
          <div className="flex items-center space-x-4">
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
            <Card className="px-4 py-4 sm:py-5 sm:px-6">
              <h2 className="text-lg font-medium mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <Label>Product Name</Label>
                    <Input
                      className=" focus-visible:ring-orange-500"
                      {...register("name", { required: true })}
                      placeholder="Enter product name"
                    />
                  </div>
                  <div>
                    <Label>Brand</Label>
                    <Input
                      className=" focus-visible:ring-orange-500"
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
                    className="w-full focus-visible:ring-orange-500 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="Enter product description"
                  />
                </div>
              </div>
            </Card>

            <Card className="px-4 py-4 sm:py-5 sm:px-6">
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
                    <Image
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

            <Card className="px-4 py-4 sm:py-5 sm:px-6">
              <h2 className="text-lg font-medium mb-4">Specifications</h2>
              <div className="space-y-4">
                <div className="flex space-x-3">
                  <Input
                    className=" focus-visible:ring-orange-500"
                    type="text"
                    placeholder="Key (e.g., Color)"
                    value={specKey}
                    onChange={(e) => setSpecKey(e.target.value)}
                  />
                  <Input
                    className=" focus-visible:ring-orange-500"
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
            <Card className="px-4 py-4 sm:py-5 sm:px-6">
              <h2 className="text-lg font-medium mb-4">Pricing</h2>
              <div className="space-y-4">
                <div>
                  <Label>Selling Price</Label>
                  <div className="relative">
                    <span className="absolute text-[13px] left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      KES
                    </span>
                    <Input
                      type="number"
                      step="any"
                      {...register("price", {
                        required: true,
                        min: 0,
                        valueAsNumber: true,
                      })}
                      className="pl-11 focus-visible:ring-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label>Cost Price</Label>
                  <div className="relative">
                    <span className="absolute text-[13px] left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      KES
                    </span>
                    <Input
                      type="number"
                      step="any"
                      {...register("costPrice", {
                        required: true,
                        min: 0,
                        valueAsNumber: true,
                      })}
                      className="pl-11 focus-visible:ring-orange-500"
                      placeholder="0.00"
                    />
                  </div>
                </div>
                <div>
                  <Label>Discount (%)</Label>
                  <Input
                    className=" focus-visible:ring-orange-500"
                    type="number"
                    step="any"
                    {...register("discount", {
                      min: 0,
                      max: 100,
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                  />
                </div>
              </div>
            </Card>

            <Card className="px-4 py-4 sm:py-5 sm:px-6">
              <h2 className="text-lg font-medium mb-4">Organization</h2>
              <div className="space-y-4">
                <div>
                  <Label>Category</Label>
                  <Select onValueChange={(value) => setSelectedCategory(value)}>
                    <SelectTrigger className="w-full focus:ring-orange-500">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {category.map((cat, idx) => (
                          <SelectItem key={idx} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>SubCategory</Label>
                  <Select
                    onValueChange={(value) => setSelectedSubCategory(value)}
                  >
                    <SelectTrigger className="w-full focus:ring-orange-500">
                      <SelectValue placeholder="Select a subCategory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {subCategory?.map((cat, idx) => (
                          <SelectItem key={idx} value={cat.toLowerCase()}>
                            {cat}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Initial Rating (0-5)</Label>
                  <Input
                    className=" focus-visible:ring-orange-500"
                    type="number"
                    step="any"
                    {...register("ratings", {
                      min: 0,
                      max: 5,
                      valueAsNumber: true,
                    })}
                    placeholder="0"
                  />
                </div>
              </div>
            </Card>

            <Card className="px-4 py-4 sm:py-5 sm:px-6">
              <h2 className="text-lg font-medium mb-4">Inventory</h2>
              <div className="space-y-4">
                <div>
                  <Label>SKU</Label>
                  <Input
                    className=" focus-visible:ring-orange-500"
                    {...register("sku")}
                    placeholder="Enter SKU"
                  />
                </div>
                <div>
                  <Label>Stock Quantity</Label>
                  <Input
                    className=" focus-visible:ring-orange-500"
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
    </>
  );
}
