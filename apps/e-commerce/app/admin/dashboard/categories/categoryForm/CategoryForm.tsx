import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Plus, Minus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FilterFieldset } from "./FilterFieldset";
import { SubcategoryFieldset } from "./SubcategoryFieldset";

interface CategoryFormData {
  name: string;
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
    description: string;
    banner?: string;
    featured: boolean;
    filters: {
      name: string;
      options: string[];
    }[];
  }[];
}

export function CategoryForm({ onSubmit, initialData }: any) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: initialData || {
      filters: [{ name: "", options: [""] }],
      subcategories: [
        {
          name: "",
          description: "",
          featured: false,
          filters: [{ name: "", options: [""] }],
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

  const {
    fields: subcategoryFields,
    append: appendSubcategory,
    remove: removeSubcategory,
  } = useFieldArray({
    control,
    name: "subcategories",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Main Category Fields */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Category Details</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <Input
              {...register("name", { required: "Name is required" })}
              placeholder="Category Name"
            />
            {errors.name && (
              <span className="text-red-500">{errors.name.message}</span>
            )}
          </div>
          <div>
            <Input {...register("icon")} placeholder="Icon (optional)" />
          </div>
        </div>
        <Textarea
          {...register("description", { required: "Description is required" })}
          placeholder="Category Description"
        />
        <div className="grid grid-cols-2 gap-4">
          <Input {...register("banner")} placeholder="Banner URL (optional)" />
          <Input {...register("color")} placeholder="Color Theme (optional)" />
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
      </div>

      {/* Category Filters */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Category Filters</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => appendFilter({ name: "", options: [""] })}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Filter
          </Button>
        </div>
        {filterFields.map((field, index) => (
          <FilterFieldset
            key={field.id}
            index={index}
            register={register}
            remove={removeFilter}
            control={control}
          />
        ))}
      </div>

      {/* Subcategories */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Subcategories</h3>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() =>
              appendSubcategory({
                name: "",
                description: "",
                featured: false,
                filters: [{ name: "", options: [""] }],
              })
            }
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Subcategory
          </Button>
        </div>
        {subcategoryFields.map((field, index) => (
          <SubcategoryFieldset
            key={field.id}
            index={index}
            register={register}
            remove={removeSubcategory}
            control={control}
          />
        ))}
      </div>

      <Button type="submit" className="w-full">
        <Save className="w-4 h-4 mr-2" />
        Save Category
      </Button>
    </form>
  );
}
