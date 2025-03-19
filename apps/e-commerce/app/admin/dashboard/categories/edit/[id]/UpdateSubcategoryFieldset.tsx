"use client";

import React from "react";

import { useFieldArray } from "react-hook-form";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { UpdateFilterFieldset } from "./UpdateFilterFieldset";

export function UpdateSubcategoryFieldset({
  index,
  register,
  remove,
  control,
}: any) {
  const {
    fields: filterFields,
    append: appendFilter,
    remove: removeFilter,
  } = useFieldArray({
    control,
    name: `subcategories.${index}.filters`,
  });

  return (
    <div className="p-6 border rounded-lg space-y-6">
      <div className="flex justify-between items-start">
        <h4 className="text-lg font-medium">Subcategory {index + 1}</h4>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => remove(index)}
        >
          <Minus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-4">
        <Input
          {...register(`subcategories.${index}.name`, {
            required: "Subcategory name is required",
          })}
          placeholder="Subcategory Name"
        />
        <div>
          <Input
            {...register(`subcategories.${index}.slug`, {
              required: "Name is required",
            })}
            placeholder="Slug Details"
          />
        </div>
        <Textarea
          {...register(`subcategories.${index}.description`, {
            required: "Description is required",
          })}
          placeholder="Subcategory Description"
        />
        <Input
          {...register(`subcategories.${index}.banner`)}
          placeholder="Banner URL (optional)"
        />
        <label className="flex items-center gap-2">
          <Switch {...register(`subcategories.${index}.featured`)} />
          Featured
        </label>

        {/* Subcategory Filters */}
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h5 className="font-medium">Subcategory Filters</h5>
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
          {filterFields.map((field, filterIndex) => (
            <UpdateFilterFieldset
              key={field.id}
              index={filterIndex}
              // parentIndex={index}
              register={register}
              remove={removeFilter}
              control={control}
              prefix={`subcategories.${index}.filters`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
