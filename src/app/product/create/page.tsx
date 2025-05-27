"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Category {
  id: string;
  category_name: string;
}
export default function CreateProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    selectedCategoryId: "",
    category_name: "",
    product_code: "",
    name_en: "",
    name_kh: "",
    beginning_quantity: "",
    minimum_stock: "",
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchcategories = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/category/getAll`,
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
          setCategories(result.data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch category.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchcategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/create/${formData.selectedCategoryId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            category_name: formData.category_name,
            product_code: formData.product_code,
            name_en: formData.name_en,
            name_kh: formData.name_kh,
            beginning_quantity: Number(formData.beginning_quantity),
            minimum_stock: Number(formData.minimum_stock),
          }),
        }
      );

      if (response.ok) {
        router.push("/product");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to create product: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error creating product:", error);
      alert("An error occurred while creating the product.");
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
          Create New Product
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Category Name</label>
            <div className="relative">
              <select
                name="selectedCategoryId"
                value={formData.selectedCategoryId}
                onChange={(e) => {
                  const selectedCategory = categories.find(
                    (p) => p.id === e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    category_name: selectedCategory
                      ? selectedCategory.category_name
                      : "",
                    selectedCategoryId: selectedCategory
                      ? selectedCategory.id
                      : "",
                  }));
                }}
                className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category_name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="w-4 h-4 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[#2D579A] mb-2">Product Code</label>
            <input
              type="text"
              name="product_code"
              value={formData.product_code}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Name En</label>
            <input
              type="text"
              name="name_en"
              value={formData.name_en}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Name Kh</label>
            <input
              type="text"
              name="name_kh"
              value={formData.name_kh}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">
              Beginning Quantity
            </label>
            <input
              type="text"
              name="beginning_quantity"
              value={formData.beginning_quantity}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Minimum Stock</label>
            <input
              type="text"
              name="minimum_stock"
              value={formData.minimum_stock}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleSave} label="Save" variant="create" />
          </div>
        </div>
      </div>
    </div>
  );
}
