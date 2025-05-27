"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useEffect, useState } from "react";
import { useParams, useRouter} from "next/navigation";
interface Category {
  id: string;
  category_name: string;
}
interface ProductFormData {
  minimum_stock: string;
  beginning_quantity: string;
  name_kh: string;
  name_en: string;
  product_code: string;
  selectedCategoryId: string;
  category_name?: string;
}

export default function ProductDetail() {
   const router = useRouter();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const params = useParams();
  const id = typeof params.id === "string" ? params.id : "";

  const [formData, setFormData] = useState<ProductFormData>({
    selectedCategoryId: "",
    category_name:"",
    minimum_stock: "",
    beginning_quantity: "",
    name_kh: "",
    name_en: "",
    product_code: "",
    
  });
console.log(formData)
  useEffect(() => {
    const fetchCategories = async () => {
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
          setError(errorData.message || "Failed to fetch categories.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
  const fetchProductById = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`,
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
        console.log("Fetched product data:", result);
        setFormData({
          ...result.data,
          selectedCategoryId: result.data.category_id, 
        });
      } else {
        const errorData = await response.text();
        console.error("Failed to fetch product", errorData);
      }
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  if (id) {
    fetchProductById(id);
  }
}, [id]);


  const handleUpdate = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
          
        }
      );

      if (response.ok) {
        alert("Product updated successfully!");
        router.push("/product");
      } else {
        alert("Failed to update product");
      }
    } catch (error) {
      console.error("Error updating product:", error);
    } finally {
      setLoading(false);
    }
  };

 const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this product?"))
      return;

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/product/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        router.push("/product");
      } else {
        alert("Failed to delete product");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    if (name === "selectedCategoryId") {
      const selectedCategory = categories.find((cat) => cat.id === value);
      setFormData((prev) => ({
        ...prev,
        selectedCategoryId: value, // Update the dropdown value
        category_id: value, // Map to category_id for backend
        category_name: selectedCategory?.category_name || "", // Update display name
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <div className="p-6 mt-25">
      <div className="flex items-center mb-4">
        <div className="mt-4.5 mr-4">
          <BackButton />
        </div>
        <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
          Product Detail
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <label className="block text-[#2D579A] mb-2">Category Name</label>
          <div className="relative">
          <select
              name="selectedCategoryId"
              value={formData.selectedCategoryId}
              onChange={handleChange}
              className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none cursor-pointer"
            >
              <option value="">Select a category</option>
              {categories.map((categories) => (
                <option key={categories.id} value={categories.id}>
                  {categories.category_name}
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
              Benning Quantity
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
            <Button onClick={handleDelete} label="Delete" variant="delete" />
            <Button onClick={handleUpdate} label="Update" variant="update" />
          </div>
        </div>
      </div>
    </div>
  );
}

