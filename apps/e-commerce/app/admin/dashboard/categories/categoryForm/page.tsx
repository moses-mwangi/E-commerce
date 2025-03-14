"use client";

import React from "react";
// import { CategoryForm } from "@/components/admin/category/CategoryForm";
import toast from "react-hot-toast";
import { CategoryForm } from "./CategoryForm";
// import { toast } from "sonner";

export default function CategoryManagementPage() {
  const handleSubmit = async (data: any) => {
    try {
      const response = await fetch("/api/v1/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create category");
      }

      const result = await response.json();
      toast.success("Category created successfully!");

      // Optionally redirect or update UI
    } catch (error) {
      toast.error("Failed to create category");
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-8">Create Category</h1>
      <div className="max-w-3xl mx-auto">
        <CategoryForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
