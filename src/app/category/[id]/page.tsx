"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";

export default function CategoryDetail() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id ? String(params.id) : "";

  const [formData, setFormData] = useState<{
    category_name?: string;
    description?: string;
  }>({});
  const [loading, setLoading] = useState(false);

  console.log("fetch by id:", formData);
  console.log("Fetching category with ID:", id);

  useEffect(() => {
    if (id) {
      fetchCategoryById(id);
    }
  }, [id]);

  const fetchCategoryById = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/category/${id}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const result = await response.json();
        console.log("Fetched category data:", result);
        setFormData(result.data);
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/category/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        alert("category updated successfully!");
        router.push("/category");
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
      const token = localStorage.getItem("token");
      const response = await fetch(
        `https://hr-inventory-be.final25.psewmad.org/api/category/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        router.push("/category");
      } else {
        alert("Failed to delete category");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };
  return (
    <div className="p-6 mt-25">
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
          <div>
            <label className="block text-[#2D579A] mb-2">Category Name</label>
            <input
              type="text"
              name="category_name"
              value={formData.category_name}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
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
          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleDelete} label="Delete" variant="delete" />
            <Button onClick={handleUpdate} label="Update" variant="update" />
          </div>
        </div>
      </div>
    </div>
  );
}
