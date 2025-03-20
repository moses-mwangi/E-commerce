// "use client";
// import React from "react";
// import { useFieldArray } from "react-hook-form";
// import { Plus, Minus } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Filter } from "@/app/types/category";

// interface Update {
//   index: any;
//   register: any;
//   remove: any;
//   control: any;
//   prefix: any;
//   filters?: Filter[] | undefined;
//   parentIndex?: any;
// }

// export function UpdateFilterFieldset({
//   index,
//   register,
//   remove,
//   control,
//   prefix,
//   filters,
// }: Update) {
//   const {
//     fields: optionFields,
//     append: appendOption,
//     remove: removeOption,
//   } = useFieldArray({
//     control,
//     // name: `filters.${index}.options`,
//     name: `${prefix}.${index}.options`,
//   });

//   return (
//     <div className="p-4 border rounded-lg space-y-4">
//       {filters?.map((filter) => (
//         <div key={filter.id} className="">
//           <div className="flex justify-between items-start">
//             <div className="flex-1 mr-4">
//               <Input
//                 {...register(`${prefix}.${index}.name`, {
//                   required: "Filter name is required",
//                 })}
//                 defaultValue={filter.name}
//                 placeholder="Filter Name (e.g., Color, Size)"
//               />
//             </div>
//             <Button
//               type="button"
//               variant="destructive"
//               size="sm"
//               onClick={() => remove(index)}
//             >
//               <Minus className="w-4 h-4" />
//             </Button>
//           </div>

//           <div className="space-y-2">
//             {filter.options.map((el) => (
//               <div key={el.option}>
//                 {optionFields.map((optionField, optionIndex) => (
//                   <div key={optionField.id} className="flex gap-2">
//                     <Input
//                       {...register(
//                         `${prefix}.${index}.options.${optionIndex}`,
//                         {
//                           required: "Option is required",
//                         }
//                       )}
//                       defaultValue={el.option}
//                       placeholder="Filter Option"
//                     />
//                     <Button
//                       type="button"
//                       variant="outline"
//                       size="sm"
//                       onClick={() => removeOption(optionIndex)}
//                     >
//                       <Minus className="w-4 h-4" />
//                     </Button>
//                   </div>
//                 ))}
//               </div>
//             ))}
//             <Button
//               type="button"
//               variant="outline"
//               size="sm"
//               onClick={() => appendOption("")}
//             >
//               <Plus className="w-4 h-4 mr-2" />
//               Add Option
//             </Button>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

"use client";
import React from "react";
import { useFieldArray } from "react-hook-form";
import { Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Filter } from "@/app/types/category";

// Define the structure of an option
interface Option {
  id: string; // Required by useFieldArray
  name: string; // Assuming each option has a `name` property
  // Add other properties if needed
}

interface Update {
  index: number;
  register: any;
  remove: (index: number) => void;
  control: any;
  prefix: string;
  filters?: Filter[];
}

export function UpdateFilterFieldset({
  index,
  register,
  remove,
  control,
  prefix,
  filters,
}: Update) {
  const {
    fields: optionFields,
    append: appendOption,
    remove: removeOption,
  } = useFieldArray<{
    [key: string]: Option[]; // Define the structure of the field array
  }>({
    control,
    name: `${prefix}.${index}.options`, // Correctly scoped name
  });

  return (
    <div className="p-4 border rounded-lg space-y-4">
      {filters?.map((filter, filterIndex) => (
        <div key={filter.id} className="space-y-4">
          <div className="flex justify-between items-start">
            <div className="flex-1 mr-4">
              <Input
                // {...register(`${prefix}.${index}.name`, {
                //   required: "Filter name is required",
                // })}

                // {...register(
                //   `${prefix && index ? `${prefix}.${index}.name` : "name"} `,
                //   {
                //     required: "Filter name is required",
                //   }
                // )}
                value={filter.name}
                onChange={
                  (e) => console.log("")
                  // setFormData({ ...formData, price: e.target.value })
                }
                //
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
            {filter.options.map((el, idx) => (
              <div key={idx}>
                {optionFields.map((optionField, optionIndex) => (
                  <div key={optionField.id} className="flex gap-2">
                    <Input
                      // {...register(
                      //   `${prefix}.${index}.options.${optionIndex}.name`,
                      //   {
                      //     required: "Option is required",
                      //   }
                      // )}

                      // {...register(
                      //   `${
                      //     prefix && index && optionIndex
                      //       ? `${prefix}.${index}.options.${optionIndex}.name`
                      //       : "name"
                      //   } `,
                      //   {
                      //     required: "Option is required",
                      //   }
                      // )}
                      value={el.option} // Ensure defaultValue is set
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
              </div>
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => appendOption({ id: "", name: "" })} // Append a valid option object
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Option
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
