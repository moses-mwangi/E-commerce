/* eslint-disable @next/next/no-img-element */
"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { useDropzone } from "react-dropzone";
import { motion } from "framer-motion";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";
import { Stepper } from "@/components/ui/Stepper";

const ProductForm = () => {
  const [step, setStep] = useState(1);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [images, setImages] = useState<(File & { preview: string })[]>([]);

  const [specs, setSpecs] = useState<any[]>([]);
  const [specKey, setSpecKey] = useState("");
  const [specValue, setSpecValue] = useState("");
  const [showDel, setShowDel] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [step]);

  const onDrop = (acceptedFiles: File[]) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, { preview: URL.createObjectURL(file) })
    );
    setImages((prev) => [...prev, ...newImages]);
    setValue("images", [...(watch("images") || []), ...newImages]);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const addSpecification = () => {
    if (specKey && specValue) {
      setSpecs([...specs, { key: specKey, value: specValue }]);
      setSpecKey("");
      setSpecValue("");
    }
  };

  const removeSpecification = (index: number) => {
    setSpecs((prev) => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (!Array.isArray(data.images) || data.images.length < 5) {
      toast.error("Please select at least 5 images.");
      return;
    }
    const refined = { ...data, specifications: specs };

    try {
      const formData = new FormData();
      formData.append("name", refined.name);
      formData.append("category", refined.category);
      formData.append("price", refined.price.toString());
      formData.append("stock", refined.stock.toString());
      formData.append("description", refined.description);
      formData.append("discount", refined.discount.toString());
      formData.append("ratings", refined.ratings.toString());
      formData.append("brand", refined.brand);
      formData.append("specifications", JSON.stringify(refined.specifications));

      // formData.append("specifications", refined.specifications);

      refined.images.forEach((image: File) => {
        formData.append("images", image);
      });

      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await axios.post("http://127.0.0.1:8000/api/product", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast.success("Product added successfully!");
    } catch (error) {
      toast.error("Error uploading product");
      console.error(error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 p-6 bg-white shadow-2xl rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Product Upload
      </h2>
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`absolute h-full bg-blue-500 transition-all duration-300`}
          style={{ width: `${(step / 4) * 100}%` }}
        ></div>
      </div>
      <Stepper
        currentStep={step}
        steps={[
          "Basic Info",
          "Specifications",
          "Pricing",
          "Images",
          "Review & Submit",
        ]}
      />
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 mt-4">
        {step === 1 && (
          <div className=" flex flex-col gap-5">
            <h3 className="text-xl font-semibold">Step 1: Basic Information</h3>
            <div className=" space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Product Name
              </Label>
              <Input {...register("name", { required: true })} />
            </div>
            <div className="flex flex-col space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Category
              </Label>

              <select
                {...register("category", { required: "Category is required" })}
                className="w-full p-2 border rounded cursor-pointer text-[15px]"
              >
                <option value="">Select Category</option>
                <option value="beauty">Beauty</option>
                <option value="fashion">Fashion</option>
                <option value="electronics">Electronics</option>
                <option value="kitchen">Kitchen</option>
              </select>
            </div>
            <div className="mt-3 space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Brand (Optional)
              </Label>
              <Input {...register("brand")} />
            </div>
            <div className=" space-y-2">
              <Label className="text-base font-medium text-gray-700">
                Description
              </Label>
              <Textarea
                className=" h-24"
                {...register("description", { required: true })}
              />
            </div>
          </div>
        )}

        {step === 2 && (
          <div>
            <h1 className="text-lg font-semibold py-4">
              step 2: Uploading Images
            </h1>
            <Label className=" mb-2">Upload Images</Label>
            <div
              {...getRootProps()}
              className="border-2 border-dashed p-6 text-center cursor-pointer rounded-lg"
            >
              <input {...getInputProps()} />
              <p>Drag & drop images here, or click to upload</p>
            </div>
            <div className="flex flex-wrap gap-3 mt-4">
              {images.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={(file as any).preview}
                    className="w-20 h-20 object-cover cursor-pointer rounded-lg shadow-md"
                    alt="Preview"
                  />
                  {showDel === false && (
                    <Button
                      type="button"
                      className="absolute h-5 w-5 -top-3 -right-3 bg-red-500 text-white p-1 rounded-full"
                      onClick={() => removeImage(index)}
                    >
                      X
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className=" flex flex-col gap-6">
            <h3 className="text-xl font-semibold">Step 3: Pricing & Stock</h3>
            <div className=" space-y-[5px]">
              <Label>Price ($)</Label>
              <Input type="number" {...register("price", { required: true })} />
            </div>
            <div className=" space-y-[5px]">
              <Label>Stock</Label>
              <Input type="number" {...register("stock", { required: true })} />
            </div>
            <div className=" space-y-[5px]">
              <Label>Discount % (Optional)</Label>
              <Input type="number" {...register("discount")} />
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <Label>Specifications</Label>
            <div className="flex space-x-3">
              <Input
                type="text"
                placeholder="Key"
                value={specKey}
                onChange={(e) => setSpecKey(e.target.value)}
              />
              <Input
                type="text"
                placeholder="Value"
                value={specValue}
                onChange={(e) => setSpecValue(e.target.value)}
              />
              <Button type="button" onClick={addSpecification}>
                Add
              </Button>
            </div>
            <ul className="mt-2">
              {specs.map((spec, index) => (
                <li
                  key={index}
                  className="flex justify-between bg-gray-50 p-2 rounded-lg"
                >
                  <span>
                    {(spec as any).key}: {(spec as any).value}
                  </span>
                  <button
                    type="button"
                    className="text-red-500 text-[15px]"
                    onClick={() => removeSpecification(index)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <div className=" space-y-[5px]">
              <Label>Ratings (0-10)</Label>
              <Input type="number" {...register("ratings")} />
            </div>
          </div>
        )}

        {step === 5 && (
          <div>
            <h3 className="text-xl font-semibold">Step 5: Review & Submit</h3>

            <div className="mt-4">
              <h4 className="text-lg font-medium">Product Details</h4>
              <p>
                <strong>Name:</strong> {watch("name")}
              </p>
              <p>
                <strong>Category:</strong> {watch("category")}
              </p>
              <p>
                <strong>Brand:</strong> {watch("brand") || "N/A"}
              </p>
              <p>
                <strong>Description:</strong> {watch("description")}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-medium">Pricing & Stock</h4>
              <p>
                <strong>Price:</strong> ${watch("price")}
              </p>
              <p>
                <strong>Stock:</strong> {watch("stock")}
              </p>
              <p>
                <strong>Discount:</strong> {watch("discount") || "None"}
              </p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-medium">Specifications</h4>
              <ul className="list-disc pl-5">
                {specs.length > 0 ? (
                  specs.map((spec, index) => (
                    <li key={index}>
                      <strong>{spec.key}:</strong> {spec.value}
                    </li>
                  ))
                ) : (
                  <p>No specifications added.</p>
                )}
              </ul>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-medium">Ratings</h4>
              <p>{watch("ratings") || "Not provided"}</p>
            </div>

            <div className="mt-4">
              <h4 className="text-lg font-medium">Uploaded Images</h4>
              <div className="flex flex-wrap gap-3 mt-2">
                {images.length > 0 ? (
                  images.map((file, index) => (
                    <img
                      key={index}
                      src={file.preview}
                      className="w-20 h-20 object-cover rounded-lg shadow-md"
                      alt={`Product Image ${index + 1}`}
                    />
                  ))
                ) : (
                  <p>No images uploaded.</p>
                )}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <div
              className="flex items-center justify-center px-4 rounded-md hover:bg-gray-50 cursor-pointer text-sm border border-1 border-gray-200"
              onClick={() => setStep(step - 1)}
            >
              Back
            </div>
          )}
          {step >= 5 && (
            <Button type="submit" className="bg-green-600 text-white">
              Submit
            </Button>
          )}
          {step < 5 && (
            <div
              className="flex bg-black/85 text-white items-center justify-center px-4 py-2 rounded-md hover:bg-gray-600 cursor-pointer text-sm border border-1 border-gray-200"
              onClick={() => setStep(step + 1)}
            >
              Next
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
