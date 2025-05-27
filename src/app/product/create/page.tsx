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
  const [formData, setFormData] = useState({
    selectedCategoryId: "",
    category_name: "",
    product_code: "",
    name_en: "",
    name_kh: "",
    beginning_quantity: "",
    minimum_stock: "",
  });
  const [validationErrors, setValidationErrors] = useState<{
    selectedCategoryId?: string;
    product_code?: string;
    name_en?: string;
    name_kh?: string;
    beginning_quantity?: string;
    minimum_stock?: string;
  }>({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
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
          setValidationErrors({
            selectedCategoryId: errorData.message || "Failed to fetch categories.",
          });
        }
      } catch (err) {
        setValidationErrors({
          selectedCategoryId: "Network error. Please try again.",
        });
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being edited
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;
    const selectedCategory = categories.find((p) => p.id === value);
    setFormData((prev) => ({
      ...prev,
      category_name: selectedCategory ? selectedCategory.category_name : "",
      selectedCategoryId: selectedCategory ? selectedCategory.id : "",
    }));
    setValidationErrors((prev) => ({ ...prev, selectedCategoryId: "" })); // Clear error for category
  };

  const checkProductExists = async (
    field: "product_code" | "name_en" | "name_kh",
    value: string
  ): Promise<boolean> => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/check-existence`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ [field]: value }),
        }
      );

      if (response.ok) {
        const result = await response.json();
        return result.exists; // Assuming API returns { exists: true/false }
      }
      return false; // If API fails, assume it doesn't exist to avoid blocking the user
    } catch (error) {
      console.error(`Error checking ${field} existence:`, error);
      return false;
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setValidationErrors({}); // Clear previous errors

    // Step 1: Validate required fields
    const newErrors: {
      selectedCategoryId?: string;
      product_code?: string;
      name_en?: string;
      name_kh?: string;
      beginning_quantity?: string;
      minimum_stock?: string;
    } = {};
    if (!formData.selectedCategoryId) {
      newErrors.selectedCategoryId = "Please select category name.";
    }
    if (!formData.product_code.trim()) {
      newErrors.product_code = "Please enter product code.";
    }
    if (!formData.name_en.trim()) {
      newErrors.name_en = "Please enter name en.";
    }
    if (!formData.name_kh.trim()) {
      newErrors.name_kh = "Please enter name kh.";
    }
    if (!formData.beginning_quantity.trim()) {
      newErrors.beginning_quantity = "Please enter beginning quantity.";
    }
    if (!formData.minimum_stock.trim()) {
      newErrors.minimum_stock = "Please enter minimum stock.";
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setLoading(false);
      return;
    }

    // Step 2: Check for duplicates (only for product_code, name_en, name_kh)
    const duplicateChecks = await Promise.all([
      checkProductExists("product_code", formData.product_code).then((exists) =>
        exists ? { product_code: "Product code already exists!" } : {}
      ),
      checkProductExists("name_en", formData.name_en).then((exists) =>
        exists ? { name_en: "Name en already exists!" } : {}
      ),
      checkProductExists("name_kh", formData.name_kh).then((exists) =>
        exists ? { name_kh: "Name kh already exists!" } : {}
      ),
    ]);

    const duplicateErrors = duplicateChecks.reduce(
      (acc, curr) => ({ ...acc, ...curr }),
      {}
    );

    if (Object.keys(duplicateErrors).length > 0) {
      setValidationErrors(duplicateErrors);
      setLoading(false);
      return;
    }

    // Step 3: Proceed with product creation if validations pass
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
        const newErrors: {
          product_code?: string;
          name_en?: string;
          name_kh?: string;
        } = {};
        if (errorData.message.toLowerCase().includes("product_code")) {
          newErrors.product_code = "Product code already exists!";
        } else if (errorData.message.toLowerCase().includes("name_en")) {
          newErrors.name_en = "Name en already exists!";
        } else if (errorData.message.toLowerCase().includes("name_kh")) {
          newErrors.name_kh = "Name kh already exists!";
        } else {
          newErrors.product_code = `Failed to create product: ${errorData.message || "Unknown error"}`;
        }
        setValidationErrors(newErrors);
      }
    } catch (error) {
      setValidationErrors({
        product_code: "Network error. Please try again.",
      });
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
                onChange={handleSelectChange}
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
            {validationErrors.selectedCategoryId && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.selectedCategoryId}
              </p>
            )}
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
            {validationErrors.product_code && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.product_code}
              </p>
            )}
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
            {validationErrors.name_en && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.name_en}
              </p>
            )}
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
            {validationErrors.name_kh && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.name_kh}
              </p>
            )}
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
            {validationErrors.beginning_quantity && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.beginning_quantity}
              </p>
            )}
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
            {validationErrors.minimum_stock && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.minimum_stock}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleSave} label="Save" variant="create" />
          </div>
        </div>
      </div>
    </div>
  );
}