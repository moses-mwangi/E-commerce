"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { fetchCategory, updateCategory } from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ArrowLeft, EyeIcon, Loader2, Minus, Plus, Upload } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

interface Filter {
  name: string;
  options: string[];
}

interface CategoryFormData {
  name: string;
  slug: string;
  itemCount: number;
  description: string;
  icon?: string;
  banner?: string;
  color?: string;
  featured: boolean;
  trending: boolean;
  filters: Filter[];
}

export default function CategoryUpdate() {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { back, push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const { selectedCategory, status, error } = useSelector(
    (state: RootState) => state.category
  );

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      slug: "",
      itemCount: 0,
      description: "",
      icon: "",
      banner: "",
      color: "",
      featured: false,
      trending: false,
      // filters: [],
      filters: [
        {
          name: "",
          options: [""],
        },
      ],
    },
  });

  const {
    fields: filterFields,
    append: appendFilter,
    remove: removeFilter,
  } = useFieldArray({
    control,
    name: "filters",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchCategory(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedCategory) {
      reset({
        name: selectedCategory.name || "",
        slug: selectedCategory.slug || "",
        itemCount: selectedCategory.itemCount || 0,
        description: selectedCategory.description || "",
        icon: selectedCategory.icon || "",
        banner: selectedCategory.banner || "",
        color: selectedCategory.color || "",
        featured: selectedCategory.featured || false,
        trending: selectedCategory.trending || false,
        // filters: selectedCategory.filters || [],
        filters: selectedCategory.filters
          ? selectedCategory.filters.map((filter) => ({
              name: filter.name || "",
              options: filter.options
                ? filter.options.map((opt) => opt.option)
                : [],
            }))
          : [],
      });
    }
  }, [selectedCategory, reset]);

  const addOption = (filterIndex: number) => {
    const updatedFilters = [...filterFields];
    updatedFilters[filterIndex].options.push("");
    reset({ filters: updatedFilters });
  };

  const removeOption = (filterIndex: number, optionIndex: number) => {
    const updatedFilters = [...filterFields];
    updatedFilters[filterIndex].options.splice(optionIndex, 1);
    // const removeId=[{name:}]
    reset({ filters: updatedFilters });
  };

  const categoryFormSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      const updatingData = { id: Number(id), data };
      dispatch(updateCategory(updatingData));
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="px-4 sm:px-8 py-4">
      <form onSubmit={handleSubmit(categoryFormSubmit)} className="space-y-7">
        <div className="flex flex-col gap-[6px] sm:gap-0 sm:flex-row items-center justify-between">
          <h1 className="text-xl md:text-2xl font-bold">Update Category</h1>
          <div className="flex gap-2 items-center">
            <Label
              className="bg-gray-100 hidden text-gray-800 transition-all duration-150 sm:flex items-center gap-1 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => {
                // back();
                push("/admin/dashboard/categories");
              }}
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Label>
            <Link
              href={`/admin/dashboard/categories/edit/${id}/subcategories`}
              className="bg-orange-500/80 px-3 py-[6px] hover:bg-orange-600/80 text-sm font-medium flex gap-1 items-center justify-between rounded-md text-white"
            >
              <EyeIcon className="w-4 h-4 mr-1" />
              Subcategories
            </Link>
            <Button
              disabled={isLoading}
              className="bg-orange-500/80 w-40 h-8 hover:bg-orange-600/80"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-2" />
              )}
              Update Category
            </Button>
          </div>
        </div>

        {/* Category Details */}
        <Card className="space-y-4 p-4 sm:p-5">
          <h2 className="text-lg text-gray-800">Category Details</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Category Name"
                className="focus-visible:ring-orange-500 text-gray-700 text-[15px]"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <Input
              {...register("icon")}
              placeholder="Icon (optional)"
              className="focus-visible:ring-orange-500 text-gray-700 text-[15px]"
            />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                {...register("slug", { required: "Slug is required" })}
                placeholder="Slug"
                className="focus-visible:ring-orange-500 text-gray-700 text-[15px]"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>
            <Input
              {...register("banner")}
              placeholder="Banner URL (optional)"
              className="focus-visible:ring-orange-500 text-gray-700 text-[15px]"
            />
          </div>

          <div className="grid grid-cols-2 gap-5">
            <Input
              {...register("color")}
              placeholder="Color Theme (optional)"
              className="focus-visible:ring-orange-500 text-gray-700 text-[15px]"
            />
            <Input
              {...register("itemCount")}
              placeholder="itemCount (optional)"
              className="focus-visible:ring-orange-500 text-gray-700 text-[15px]"
            />
          </div>
          <div className="flex gap-8">
            <label className="flex items-center gap-2">
              <Switch {...register("featured")} />
              Featured
            </label>
            <label className="flex items-center gap-2">
              <Switch {...register("trending")} />
              Trending
            </label>
          </div>
          <div>
            <Textarea
              {...register("description", {
                required: "Description is required",
              })}
              placeholder="Category Description"
              className=" h-24 focus-visible:ring-orange-500 text-gray-700 text-[15px]"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </Card>

        <Card className="space-y-4 p-4 sm:p-5">
          <h3 className="text-lg text-gray-800">Category Filters</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendFilter({ name: "", options: [""] })}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Filter
          </Button>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {filterFields.map((filter, idx) => (
              <div key={filter.id} className="mt-4">
                <div className="flex gap-3 pb-2 justify-between items-start">
                  <Input
                    {...register(`filters.${idx}.name`, {
                      required: "Filter name is required",
                    })}
                    placeholder="Filter Name (e.g., Color, Size)"
                    className="focus-visible:ring-orange-500"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFilter(idx)}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                </div>
                <Card className=" bg-gray-50/85">
                  <div className="space-y-2 mt-2 px-3 sm:px-6 py-3">
                    {filter.options.map((_, optionIdx) => (
                      <div key={optionIdx}>
                        <div className="flex gap-2">
                          <Input
                            {...register(
                              `filters.${idx}.options.${optionIdx}`,
                              {
                                required: "Option is required",
                              }
                            )}
                            placeholder="Filter Option"
                            className="focus-visible:ring-orange-500 text-[15px] text-gray-700"
                          />
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeOption(idx, optionIdx)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addOption(idx)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Add Option
                      </Button>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </Card>
      </form>
    </div>
  );
}
