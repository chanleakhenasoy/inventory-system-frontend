"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryDetail() {
  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
  });
  console.log(formData);

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ category_name?: string; description?: string }>(
    {}
  ); 
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSave = async () => {
    setLoading(true);
    setErrors({}); // Clear previous errors

    // Step 1: Validate required fields
    const newErrors: { category_name?: string; description?: string } = {};
    if (!formData.category_name.trim()) {
      newErrors.category_name = "Please enter category name.";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Please enter description.";
    }

    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setLoading(false);
      return;
    }

  
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`https://hr-inventory-be.final25.psewmad.org/category/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push("/category");
      } else {
        const errorData = await response.json();
        const newErrors: { category_name?: string; description?: string } = {};
        if (errorData.message && errorData.message.toLowerCase().includes("already exists")) {
          newErrors.category_name = "Category name already exists!";
        } else {
          newErrors.category_name = `Failed to create category: ${errorData.message || "Unknown error"}`;
        }
        setErrors(newErrors);
      }
    } catch (error) {
      console.error("Error creating category:", error);
      setErrors({ category_name: "An error occurred while creating the category." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 mt-25">
      <div className="flex items-center mb-4">
        <div className="mt-4.5 mr-4">
          <BackButton />
        </div>
        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
          Create New Category
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-[#2D579A] mb-2">Category Name</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.category_name && (
              <p className="text-red-600 text-sm mt-1">{errors.category_name}</p>
            )}
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outl
              ine-none focus:ring-1 focus:ring-blue-500"
            />
            {errors.description && (
              <p className="text-red-600 text-sm mt-1">{errors.description}</p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleSave} label="Create" variant="create" />
          </div>
        </div>
      </div>
    </div>
  );
}