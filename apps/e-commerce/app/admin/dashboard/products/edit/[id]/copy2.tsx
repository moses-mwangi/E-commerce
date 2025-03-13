"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  ArrowLeft,
  Upload,
  Loader2,
  X,
  Image as ImageIcon,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-hot-toast";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";

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
  brand: string;
  price: string;
  stock: string;
  discount: string;
  ratings: string;
  description: string;
  specifications: Specification[];
  status: "In Stock" | "Out of Stock";
  images: ProductImage[];
  newImages: File[];
}

export default function EditProductPage() {
  const router = useRouter();
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
    brand: "",
    price: "",
    stock: "",
    discount: "",
    ratings: "",
    description: "",
    specifications: [],
    status: "In Stock",
    images: [],
    newImages: [],
  });

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        setFormData({
          name: "Smartphone X200",
          category: "Electronics",
          brand: "TechNova",
          price: "599.99",
          stock: "120",
          discount: "10",
          ratings: "4.7",
          description: "A powerful smartphone with an advanced AI camera...",
          specifications: [
            { key: "Color", value: "Midnight Black" },
            { key: "Screen Size", value: "6.7 inches" },
            { key: "Battery", value: "5000mAh" },
            { key: "Camera", value: "108MP AI Quad Camera" },
            { key: "Processor", value: "Snapdragon 8 Gen 2" },
            { key: "Storage", value: "256GB" },
          ],
          status: "In Stock",
          images: [
            {
              id: 1,
              url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1741860856/ecommerce-product/image_1741860854311.png",
              isMain: true,
            },
            {
              id: 2,
              url: "https://res.cloudinary.com/dijocmuzg/image/upload/v1741860856/ecommerce-product/image_1741860854313.webp",
              isMain: false,
            },
          ],
          newImages: [],
        });
      } catch (error) {
        toast.error("Failed to fetch product details");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSaving(true);
    try {
      // Simulated API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      toast.success("Product updated successfully");
      router.push("/admin/dashboard/products");
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
        ? { images: prev.images.filter((_, i) => i !== index) }
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
            onClick={() => router.back()}
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
                // error={errors.name}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand</Label>
              <Input
                id="brand"
                value={formData.brand}
                onChange={(e) =>
                  setFormData({ ...formData, brand: e.target.value })
                }
                // error={errors.brand}
                required
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
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="electronics">Electronics</SelectItem>
                  <SelectItem value="clothing">Clothing</SelectItem>
                  <SelectItem value="books">Books</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                // error={errors.price}
                required
              />
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
                // error={errors.stock}
                required
              />
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
                    />
                  </div>
                  <div className="flex-1">
                    <Input
                      placeholder="Value (e.g., Midnight Black)"
                      value={spec.value}
                      onChange={(e) =>
                        updateSpecification(index, "value", e.target.value)
                      }
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
            <Button type="submit" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Saving Changes...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </Card>

      <Dialog open={showImagePreview} onOpenChange={setShowImagePreview}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Image Preview</DialogTitle>
          </DialogHeader>
          {selectedImage && (
            <div className="relative aspect-video">
              <Image
                src={selectedImage}
                alt="Preview"
                fill
                className="object-contain"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
