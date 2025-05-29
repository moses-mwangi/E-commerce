"use client";

import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { fetchCategories } from "@/redux/slices/categorySlice";
import { fetchProductById, updateProduct } from "@/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ArrowLeft, Upload, X } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface ProductImage {
  id: number;
  url: string;
  isMain: boolean;
}

interface Specification {
  key: string;
  value: string;
}

interface FormData {
  name: string;
  category: string;
  subCategory: string;
  brand: string;
  price: string | number;
  costPrice: string | number;
  stock: string | number;
  discount: string | number;
  ratings: string | number;
  description: string;
  specifications: Specification[];
  status: "In Stock" | "Out of Stock";
  images: ProductImage[];
  newImages: File[];
  deletedImages: number[];
}

export default function EditProductPage() {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { selectedProduct } = useSelector((state: RootState) => state.product);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>(
    {}
  );

  const [formData, setFormData] = useState<FormData>({
    name: "",
    category: "",
    subCategory: "",
    brand: "",
    price: "",
    costPrice: "",
    stock: "",
    discount: "",
    ratings: "",
    description: "",
    specifications: [],
    status: "In Stock",
    images: [],
    newImages: [],
    deletedImages: [],
  });

  const { categories } = useSelector((state: RootState) => state.category);
  const category = categories.map((el) => el.name);

  const subCategory = categories
    .find(
      // (el) => el.name.toLowerCase() === selectedProduct?.category.toLowerCase()
      (el) => el.name.toLowerCase() === formData.category.toLowerCase()
    )
    ?.subcategories.map((el) => el.name);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    dispatch(fetchCategories());
  }, [id, dispatch]);

  useEffect(() => {
    if (selectedProduct) {
      setFormData({
        name: selectedProduct.name || "",
        category: selectedProduct.category || "",
        subCategory: selectedProduct.subCategory || "",
        brand: selectedProduct.brand || "",
        price: selectedProduct.price || "",
        costPrice: selectedProduct.costPrice || "",
        stock: selectedProduct.stock || "",
        discount: selectedProduct.discount || "",
        ratings: selectedProduct.ratings || "",
        description: selectedProduct.description || "",
        specifications:
          (selectedProduct.specifications as Specification[]) || [],
        status: "In Stock",
        images: selectedProduct.productImages || [],
        newImages: [],
        deletedImages: [],
      });
      setIsLoading(false);
    }
  }, [selectedProduct]);

  const validateForm = () => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Product name is required";
    }

    if (!formData.price || isNaN(Number(formData.price))) {
      newErrors.price = "Valid price is required";
    }

    if (!formData.stock || isNaN(Number(formData.stock))) {
      newErrors.stock = "Valid stock quantity is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (!formData.subCategory) {
      newErrors.category = "SubCategory is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    // setIsSaving(true);
    try {
      setIsSaving(true);
      const updatingData = {
        id: Number(id),
        formData: {
          ...formData,
        },
        images: formData.newImages,
        deletedImages: formData.deletedImages,
      };

      dispatch(updateProduct(updatingData)).unwrap();
      setIsSaving(false);
    } catch (error) {
      toast.error("Failed to update product");
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData((prev) => ({
      ...prev,
      newImages: [...prev.newImages, ...files],
    }));
  };

  const removeImage = (index: number, type: "existing" | "new") => {
    setFormData((prev) => ({
      ...prev,
      ...(type === "existing"
        ? {
            images: prev.images.filter((_, i) => i !== index),
            deletedImages: [...prev.deletedImages, prev.images[index].id],
          }
        : { newImages: prev.newImages.filter((_, i) => i !== index) }),
    }));
  };

  const setMainImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.map((img, i) => ({
        ...img,
        isMain: i === index,
      })),
    }));
  };

  const addSpecification = () => {
    setFormData((prev) => ({
      ...prev,
      specifications: [...prev.specifications, { key: "", value: "" }],
    }));
  };

  const removeSpecification = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.filter((_, i) => i !== index),
    }));
  };

  const updateSpecification = (
    index: number,
    field: "key" | "value",
    value: string
  ) => {
    setFormData((prev) => ({
      ...prev,
      specifications: prev.specifications.map((spec, i) =>
        i === index ? { ...spec, [field]: value } : spec
      ),
    }));
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-64 bg-gray-200 rounded"></div>
          <div className="h-[600px] bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/dashboard/products")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </Button>
          <h1 className="text-2xl font-semibold text-gray-800">Edit Product</h1>
        </div>
        <Button
          variant="outline"
          onClick={() => router.push(`/admin/dashboard/products/${id}`)}
        >
          View Product
        </Button>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                required
                className=" focus-visible:ring-orange-400"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                required
                className=" focus-visible:ring-orange-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select
                value={formData.category}
                onValueChange={(value) =>
                  setFormData({ ...formData, category: value })
                }
              >
                <SelectTrigger className=" focus:ring-orange-400">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {category?.map((cat, idx) => (
                      <SelectItem key={idx} value={cat.toLowerCase()}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
              {errors.category && (
                <p className="text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="subCategory">SubCategory</Label>
              <Select
                value={formData.subCategory}
                onValueChange={(value) =>
                  setFormData({ ...formData, subCategory: value })
                }
              >
                <SelectTrigger className=" focus:ring-orange-400">
                  <SelectValue placeholder="Select subCategory" />
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
              {errors.subCategory && (
                <p className="text-sm text-red-500">{errors.subCategory}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Sell Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                required
                className=" focus-visible:ring-orange-400"
              />
              {errors.price && (
                <p className="text-sm text-red-500">{errors.price}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="costPrice">Cost Price ($)</Label>
              <Input
                id="costPrice"
                type="number"
                step="0.01"
                value={formData.costPrice}
                onChange={(e) =>
                  setFormData({ ...formData, costPrice: e.target.value })
                }
                required
                className=" focus-visible:ring-orange-400"
              />
              {errors.costPrice && (
                <p className="text-sm text-red-500">{errors.costPrice}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                required
                className=" focus-visible:ring-orange-400"
              />
              {errors.stock && (
                <p className="text-sm text-red-500">{errors.stock}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="discount">Discount (%)</Label>
              <Input
                id="discount"
                type="number"
                min="0"
                max="100"
                value={formData.discount}
                onChange={(e) =>
                  setFormData({ ...formData, discount: e.target.value })
                }
                className=" focus-visible:ring-orange-400"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ratings">Ratings</Label>
              <Input
                id="ratings"
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={formData.ratings}
                onChange={(e) =>
                  setFormData({ ...formData, ratings: e.target.value })
                }
                className=" focus-visible:ring-orange-400"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
              className=" focus-visible:ring-orange-400"
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Specifications</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={addSpecification}
              >
                Add Specification
              </Button>
            </div>
            <div className="space-y-4">
              {formData.specifications.map((spec, index) => (
                <div key={index} className="flex gap-4 items-start">
                  <div className="flex-1">
                    <Input
                      placeholder="Specification (e.g., Color)"
                      value={spec.key}
                      onChange={(e) =>
                        updateSpecification(index, "key", e.target.value)
                      }
                      className=" focus-visible:ring-orange-400"
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Value (e.g., Midnight Black)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
                      className=" focus-visible:ring-orange-400"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="destructive"
                    size="icon"
                    onClick={() => removeSpecification(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <Label>Product Images</Label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {formData.images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group aspect-square rounded-lg overflow-hidden border"
                >
                  <Image
                    src={image.url}
                    alt={`Product ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                    onClick={() => {
                      setSelectedImage(image.url);
                      setShowImagePreview(true);
                    }}
                  />

                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Button
                      type="button"
                      variant="secondary"
                      size="sm"
                      onClick={() => setMainImage(index)}
                      className={image.isMain ? "bg-green-500 text-white" : ""}
                    >
                      {image.isMain ? "Main Image" : "Set as Main"}
                    </Button>
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(index, "existing")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {formData.newImages.map((file, index) => (
                <div
                  key={index}
                  className="relative group aspect-square rounded-lg overflow-hidden border"
                >
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={`New Upload ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      onClick={() => removeImage(index, "new")}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <label className="aspect-square rounded-lg border-2 border-dashed flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-8 h-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600">Upload New Image</p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button
              className="w-32 bg-orange-500/95 hover:bg-orange-600/85"
              type="submit"
              disabled={isSaving === true}
            >
              {isSaving === true ? (
                <>
                  <ButtonLoader />
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
