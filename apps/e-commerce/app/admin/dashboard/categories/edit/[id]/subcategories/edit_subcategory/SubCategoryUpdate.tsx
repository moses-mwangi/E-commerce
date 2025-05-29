"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  getSubcategories,
  updateSubcategory,
} from "@/redux/slices/categorySlice";
import { AppDispatch, RootState } from "@/redux/store";
import { ArrowLeft, Loader2, Minus, Plus, Upload } from "lucide-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
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

export default function SubCategoryUpdate() {
  const dispatch: AppDispatch = useDispatch();
  const { id } = useParams();
  const { back } = useRouter();
  const subId = useSearchParams().get("subId");
  const [isLoading, setIsLoading] = useState(false);

  const { selectedSubCategories, status, error } = useSelector(
    (state: RootState) => state.category
  );

  const subcategory = selectedSubCategories?.find(
    (el) => el.id === Number(subId)
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
      filters: [],
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
      dispatch(getSubcategories(Number(id)));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (subcategory) {
      reset({
        name: subcategory?.name || "",
        slug: subcategory?.slug || "",
        itemCount: subcategory?.itemCount || 0,
        description: subcategory?.description || "",
        // icon: subcategory?.icon || "",
        // banner: subcategory?.banner || "",
        // color: subcategory?.color || "",
        featured: subcategory?.featured || false,
        // trending: subcategory?.trending || false,
        filters: subcategory?.filters
          ? subcategory?.filters.map((filter) => ({
              name: filter.name || "",
              options: filter.options
                ? filter.options.map((opt) => opt.option)
                : [],
            }))
          : [],
      });
    }
  }, [subcategory, reset]);

  const addOption = (filterIndex: number) => {
    const updatedFilters = [...filterFields];
    updatedFilters[filterIndex].options.push("");
    reset({ filters: updatedFilters });
  };

  const removeOption = (filterIndex: number, optionIndex: number) => {
    const updatedFilters = [...filterFields];
    updatedFilters[filterIndex].options.splice(optionIndex, 1);
    reset({ filters: updatedFilters });
  };

  const categoryFormSubmit = async (data: CategoryFormData) => {
    try {
      setIsLoading(true);
      const formData = { ...data, itemCount: Number(data.itemCount) };
      const updatingData = {
        categoryId: Number(id),
        subcategoryId: Number(subId),
        formData,
      };
      await dispatch(updateSubcategory(updatingData));
      // toast.success("Subcategory updated successfully");
    } catch (error) {
      toast.error("Failed to update subcategory");
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
    <div className="px-10 py-7">
      <form onSubmit={handleSubmit(categoryFormSubmit)} className="space-y-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Update Subcategory</h1>
          <div className="flex items-center gap-4">
            <Label
              className="bg-gray-100 text-gray-800 transition-all duration-150 flex items-center gap-1 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md"
              onClick={() => {
                back();
              }}
            >
              <ArrowLeft size={17} />
              Back
            </Label>
            <Button
              disabled={isLoading}
              className="bg-orange-500 h-8 w-44 hover:bg-orange-600"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Upload className="w-4 h-4 mr-1" />
              )}
              Update Subcategory
            </Button>
          </div>
        </div>

        {/* Category Details */}
        <Card className="space-y-4 p-5">
          <h2 className="text-lg text-gray-800">Category Details</h2>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                {...register("name", { required: "Name is required" })}
                placeholder="Category Name"
                className="focus-visible:ring-orange-500"
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name.message}</p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-5">
              <Input
                {...register("color")}
                placeholder="Color Theme (optional)"
                className="focus-visible:ring-orange-500"
              />
              <Input
                {...register("itemCount")}
                placeholder="Item Count (optional)"
                className="focus-visible:ring-orange-500"
                type="number"
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                {...register("slug", { required: "Slug is required" })}
                placeholder="Slug"
                className="focus-visible:ring-orange-500"
              />
              {errors.slug && (
                <p className="text-sm text-red-500">{errors.slug.message}</p>
              )}
            </div>
            <Input
              {...register("banner")}
              placeholder="Banner URL (optional)"
              className="focus-visible:ring-orange-500"
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
              className="h-24 focus-visible:ring-orange-500"
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>
        </Card>

        {/* Filters */}
        <Card className="space-y-4 p-5">
          <h3 className="text-lg text-gray-800">Category Filters</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendFilter({ name: "", options: [""] })}
          >
            <Plus className="w-4 h-4 mr-2" /> Add Filter
          </Button>
          <div className="grid grid-cols-2 gap-6">
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
                <Card className="bg-gray-50/85">
                  <div className="space-y-2 mt-2 px-6 py-3">
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
                            className="focus-visible:ring-orange-500"
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
