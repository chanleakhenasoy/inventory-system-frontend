"use client"

import Button from "@/app/components/button"
import type React from "react"
import BackButton from "@/app/components/backButton"
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";



export default function CategoryDetail() {
const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("id");

  const [formData, setFormData] = useState({
    category_name: "",
    description: "",
    
  });
  const [loading, setLoading] = useState(false);

  // Fetch Supplier by ID
  useEffect(() => {
    if (categoryId) {
      fetchCategoryById(categoryId);
    }
  }, [categoryId]);

  const fetchCategoryById = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/category/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          category_name: data.category_name,
          description: data.description,
          
        });
      } else {
        console.error("Failed to fetch category");
      }
    } catch (error) {
      console.error("Error fetching supplier:", error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3001/api/supplier/${categoryId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("category updated successfully!");
        router.push("/suppliers");
      } else {
        alert("Failed to update category");
      }
    } catch (error) {
      console.error("Error updating category:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      const response = await fetch(
        `http://localhost:3001/api/supplier/${categoryId}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        alert("Category deleted successfully!");
        router.push("/suppliers");
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    
      <div className="p-6">
        <div className="flex items-center mb-4">
                  <div className="mt-4.5 mr-4">
                  <BackButton />
                  </div>
                  <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
                    Category Detail
                  </h1>
                </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">
          <div className="space-y-6">
            {/* Category Name */}
            <div>
              <label className="block text-[#2D579A] mb-2">Category Name</label>
              <input
                type="text"
                name="categoryName"
                value={formData.category_name}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-[#2D579A] mb-2">Description</label>
              <input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-3 mt-6">
                <Button onClick={handleDelete} label="Delete" variant="delete" />
                <Button onClick={handleUpdate} label="Update" variant="update" />
              </div>
          </div>
        </div>
      </div>
  
  )
}
