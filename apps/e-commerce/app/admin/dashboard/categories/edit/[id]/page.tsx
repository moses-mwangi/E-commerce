"use client";

import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Minus, Loader2, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  fetchCategories,
  fetchCategory,
  updateCategory,
} from "@/redux/slices/categorySlice";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { useParams } from "next/navigation";
import { UpdateFilterFieldset } from "./UpdateFilterFieldset";
import { UpdateSubcategoryFieldset } from "./UpdateSubcategoryFieldset";

interface CategoryFormData {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon?: string;
  banner?: string;
  color?: string;
  featured: boolean;
  trending: boolean;
  filters: {
    name: string;
    options: string[];
  }[];
  subcategories: {
    name: string;
    slug: string;
    description: string;
    banner?: string;
    featured: boolean;
    filters: {
      name: string;
      options: string[];
    }[];
  }[];
}

export default function UpdateCategoryForm() {
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();

  const { categories, selectedCategory } = useSelector(
    (state: RootState) => state.category
  );
  const categorySelect = categories.find((el) => el.id === Number(id));

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CategoryFormData>({
    // defaultValues: category,
  });

  const {
    fields: filterFields,
    append: appendFilter,
    remove: removeFilter,
  } = useFieldArray({
    control,
    name: "filters",
  });

  const {
    fields: subcategoryFields,
    append: appendSubcategory,
    remove: removeSubcategory,
  } = useFieldArray({
    control,
    name: "subcategories",
  });

  useEffect(() => {
    dispatch(fetchCategory(Number(id)));
    dispatch(fetchCategories());
  }, [dispatch, id]);

  const categoryFormSubmit = async (
    data: CategoryFormData,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.preventDefault();
    try {
      setIsLoading(true);
      // dispatch(updateCategory(data));
      toast.success("Category updated successfully");
    } catch (error) {
      toast.error("Failed to update category");
    } finally {
      setIsLoading(false);
    }
  };
  const n = String(categorySelect?.trending) === "true" ? true : false;

  return (
    <div>
      <form
        onSubmit={handleSubmit(categoryFormSubmit)}
        className="space-y-7 p-7"
      >
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Update Category</h1>
          <Button
            disabled={isLoading}
            className="bg-blue-500 w-40 hover:bg-blue-600"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Upload className="w-4 h-4 mr-2" />
            )}
            Update Category
          </Button>
        </div>
        <Card className="space-y-4 p-5">
          <Input
            defaultValue={categorySelect?.name}
            {...register("name", { required: "Name is required" })}
            placeholder="Category Name"
          />
          <Textarea
            defaultValue={categorySelect?.description}
            {...register("description", {
              required: "Description is required",
            })}
            placeholder="Category Description"
          />
          <Input
            defaultValue={categorySelect?.slug}
            {...register("slug", { required: "Slug is required" })}
            placeholder="Slug"
          />
          <label className="flex items-center gap-2">
            <Switch {...register("featured")} /> Featured
          </label>
          <label className="flex items-center gap-2">
            <Switch {...register("trending")} defaultChecked={n} />
            Trending
          </label>
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
          {filterFields.map((field, index) => (
            <UpdateFilterFieldset
              key={field.id}
              index={index}
              register={register}
              remove={removeFilter}
              control={control}
              prefix="filters"
              filters={categorySelect?.filters}
            />
          ))}
        </Card>

        {/* Subcategories */}
        <Card className="space-y-4 p-5">
          <h3 className="text-lg text-gray-800">Subcategories</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendSubcategory({
                name: "",
                slug: "",
                description: "",
                featured: false,
                filters: [{ name: "", options: [""] }],
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" /> Add Subcategory
          </Button>
          {subcategoryFields.map((field, index) => (
            <UpdateSubcategoryFieldset
              key={field.id}
              index={index}
              register={register}
              remove={removeSubcategory}
              control={control}
            />
          ))}
        </Card>
      </form>
    </div>
  );
}
