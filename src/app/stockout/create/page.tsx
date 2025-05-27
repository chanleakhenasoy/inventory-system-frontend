"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name_en: string;
}
interface User {
  id: string;
  user_name: string;
}

export default function CreateNewStockout() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [employees, setEmployees] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState<{
    selectedProductId?: string;
    quantity?: string;
    selectedUserId?: string;
    stockout_date?: string;
  }>({});
  const [formData, setFormData] = useState({
    selectedProductId: "",
    selectedUserId: "",
    name_en: "",
    quantity: "",
    user_name: "",
    stockout_date: "",
  });
  console.log(formData);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/product/getAll`,
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
          setProducts(result.data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch product.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    const fetchUsers = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/getAll`,
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
          setEmployees(result.data);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch employee.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being edited
  };

  const createStockout = async () => {
    setLoading(true);
    setValidationErrors({}); // Clear previous errors
    setError("");

    // Step 1: Validate required fields
    const newErrors: {
      selectedProductId?: string;
      quantity?: string;
      selectedUserId?: string;
      stockout_date?: string;
    } = {};
    if (!formData.selectedProductId) {
      newErrors.selectedProductId = "Please select product name.";
    }
    if (!formData.quantity.trim()) {
      newErrors.quantity = "Please enter quantity.";
    }
    if (!formData.selectedUserId) {
      newErrors.selectedUserId = "Please select employee.";
    }
    if (!formData.stockout_date) {
      newErrors.stockout_date = "Please select stock out date.";
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setLoading(false);
      return;
    }

    // Step 2: Proceed with stockout creation if validations pass
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockout/create/${formData.selectedProductId}/${formData.selectedUserId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name_en: formData.name_en,
            quantity: Number(formData.quantity),
            user_name: formData.user_name,
            stockout_date: formData.stockout_date,
          }),
        }
      );

      if (response.ok) {
        router.push("/stockout");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to create stockout.");
      }
    } catch (error) {
      console.error("Error creating stockout:", error);
      setError("Network error. Please try again.");
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
          Create New Stock Out
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Product Name</label>
            <div className="relative text-gray-600">
              <select
                name="selectedProductId"
                value={formData.selectedProductId}
                onChange={(e) => {
                  const selectedProduct = products.find(
                    (p) => p.id === e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    name_en: selectedProduct ? selectedProduct.name_en : "",
                    selectedProductId: selectedProduct
                      ? selectedProduct.id
                      : "",
                  }));
                  setValidationErrors((prev) => ({
                    ...prev,
                    selectedProductId: "",
                  })); // Clear error when selecting a product
                }}
                className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select a product</option>
                {products.map((product) => (
                  <option key={product.id} value={product.id}>
                    {product.name_en}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-[16px] flex items-center">
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
            {validationErrors.selectedProductId && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.selectedProductId}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {validationErrors.quantity && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.quantity}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Employee</label>
            <div className="relative">
              <select
                name="selectedUserId"
                value={formData.selectedUserId}
                onChange={(e) => {
                  const selectedUser = employees.find(
                    (u) => u.id === e.target.value
                  );
                  setFormData((prev) => ({
                    ...prev,
                    user_name: selectedUser ? selectedUser.user_name : "",
                    selectedUserId: selectedUser ? selectedUser.id : "",
                  }));
                  setValidationErrors((prev) => ({
                    ...prev,
                    selectedUserId: "",
                  })); // Clear error when selecting an employee
                }}
                className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="">Select an employee</option>
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.user_name}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-[16px] flex items-center">
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
            {validationErrors.selectedUserId && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.selectedUserId}
              </p>
            )}
          </div>
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Stock Out Date</label>
            <div className="relative">
              <input
                id="stockout_date"
                type="date"
                name="stockout_date"
                value={formData.stockout_date}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0"
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <input
                type="date"
                name="stockout_date"
                value={formData.stockout_date}
                onChange={handleChange}
                className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
              />
            </div>
            {validationErrors.stockout_date && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.stockout_date}
              </p>
            )}
          </div>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="flex justify-end space-x-3 mt-6 cursor-pointer">
            <Button onClick={createStockout} label="Create" variant="create" />
          </div>
        </div>
      </div>
    </div>
  );
}