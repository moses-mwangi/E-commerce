"use client";
import ButtonLoader from "@/app/components/loaders/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { addSubcategory } from "@/redux/slices/categorySlice";
import { AppDispatch } from "@/redux/store";
import { ArrowLeft, Loader2, Plus, Upload } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { FilterFieldset } from "../../../../new_category/FilterFieldset";

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
  filters: {
    name: string;
    options: string[];
  }[];
  subcategories: {
    name: string;
    itemCount: number;
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

export default function AddNewSubcategory() {
  const { id } = useParams();
  const { back, push } = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      filters: [{ name: "", options: [""] }],
      subcategories: [
        {
          name: "",
          slug: "",
          itemCount: 0,
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

  const categoryFormSubmit = async (
    data: any,
    event?: React.BaseSyntheticEvent
  ) => {
    event?.preventDefault();

    console.log(data);
    try {
      setIsLoading(true);
      const newCategory = { id: Number(id), data: data };
      dispatch(addSubcategory(newCategory));
      console.log(newCategory);
    } catch (error) {
      toast.error("Failed to create category");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(categoryFormSubmit)}
      className="space-y-7 px-3 sm:px-6 py-4 sm:py-6"
    >
      <div className="flex flex-col gap-1 sm:gap-0 sm:flex-row items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            Create New Subcategory
          </h1>
          <h1 className="text-gray-600 sm:mt-1">
            Add a new subcategory to your store
          </h1>
        </div>
        <div className="flex items-center space-x-3">
          <Label
            className="bg-gray-100 text-gray-800 transition-all duration-150 hidden sm:flex items-center gap-1 cursor-pointer hover:bg-gray-200 px-3 py-2 rounded-md"
            onClick={() => {
              push(`/admin/dashboard/categories/edit/${id}`);
              push(`/admin/dashboard/categories/edit/${id}/subcategories`);
            }}
          >
            <ArrowLeft size={17} />
            Back
          </Label>
          <Button variant="outline">Save as Draft</Button>

          <Button
            disabled={isLoading === true}
            className="bg-orange-500 w-[179px] hover:bg-orange-600"
          >
            {isLoading === false ? (
              <div className="flex justify-between items-center">
                {isLoading ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Upload className="w-4 h-4 mr-2" />
                )}
                Publish Subcategory
              </div>
            ) : (
              <ButtonLoader />
            )}
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1  gap-6">
        <div className="space-y-6 grid lg:grid-cols-[1.7sssfr,1aafr]">
          <Card className="space-y-4 p-3 sm:p-5">
            <h2 className="text-lg text-gray-800">Category Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <Input
                  className="text-[15px]"
                  {...register("name", { required: "Name is required" })}
                  placeholder="Category Name"
                />
                {errors.name && (
                  <span className="text-red-500">{errors.name.message}</span>
                )}
              </div>
              <div>
                <Input
                  className="text-[15px]"
                  {...register("icon")}
                  placeholder="Icon (optional)"
                />
              </div>
            </div>
            <div className=" grid grid-cols-2 gap-5">
              <div>
                <Input
                  className="text-[15px]"
                  {...register("itemCount", {
                    required: "itemCount is required",
                  })}
                  type="number"
                  placeholder="itemCount 10, 50, 200"
                />
                {errors.itemCount && (
                  <span className="text-red-500">
                    {errors.itemCount.message}
                  </span>
                )}
              </div>
              <div>
                <Input
                  className="text-[15px]"
                  {...register("slug", { required: "Name is required" })}
                  placeholder="Slug Details"
                />
                {errors.slug && (
                  <span className="text-red-500">{errors.slug.message}</span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input
                className="text-[15px]"
                {...register("banner")}
                placeholder="Banner URL (optional)"
              />
              <Input
                className="text-[15px]"
                {...register("color")}
                placeholder="Color Theme (optional)"
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
                className="text-[15px]"
                {...register("description", {
                  required: "Description is required",
                })}
                placeholder="Category Description"
              />
            </div>
          </Card>

          <Card className="space-y-4 p-3 sm:p-5">
            <div className="flex justify-between items-center">
              <h3 className="text-lg text-gray-800">Category Filters</h3>
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
                ///
                prefix="filters"
              />
            ))}
          </Card>
        </div>
      </div>
    </form>
  );
}
