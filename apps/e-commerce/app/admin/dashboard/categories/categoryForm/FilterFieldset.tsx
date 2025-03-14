import React from "react";
import { useFieldArray } from "react-hook-form";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function FilterFieldset({ index, register, remove, control }: any) {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray({
    control,
    name: `filters.${index}.options`,
  });

  return (
    <div className="p-4 border rounded-lg space-y-4">
      <div className="flex justify-between items-start">
        <div className="flex-1 mr-4">
          <Input
            {...register(`filters.${index}.name`, {
              required: "Filter name is required",
            })}
            placeholder="Filter Name (e.g., Color, Size)"
          />
        </div>
        <Button
          type="button"
          variant="destructive"
          size="sm"
          onClick={() => remove(index)}
        >
          <Minus className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-2">
        {optionFields.map((optionField, optionIndex) => (
          <div key={optionField.id} className="flex gap-2">
            <Input
              {...register(`filters.${index}.options.${optionIndex}`, {
                required: "Option is required",
              })}
              placeholder="Filter Option"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => removeOption(optionIndex)}
            >
              <Minus className="w-4 h-4" />
            </Button>
          </div>
        ))}
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => appendOption("")}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Option
        </Button>
      </div>
    </div>
  );
}
