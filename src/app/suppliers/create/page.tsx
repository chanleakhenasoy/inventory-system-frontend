"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CategoryDetail() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    supplier_name: "",
    phone_number: "",
    address: "",
    company_name: "",
  });
  console.log(formData);
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{
    supplier_name?: string;
    phone_number?: string;
    address?: string;
    company_name?: string;
  }>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setValidationErrors((prev) => ({ ...prev, [name]: "" })); // Clear error for the field being edited
  };

  const handleSave = async () => {
    setLoading(true);
    setValidationErrors({}); // Clear previous errors

    // Step 1: Validate required fields
    const newErrors: {
      supplier_name?: string;
      phone_number?: string;
      address?: string;
      company_name?: string;
    } = {};
    if (!formData.supplier_name.trim()) {
      newErrors.supplier_name = "Please enter supplier name.";
    }
    if (!formData.phone_number.trim()) {
      newErrors.phone_number = "Please enter phone number.";
    }
    if (!formData.address.trim()) {
      newErrors.address = "Please enter address.";
    }
    if (!formData.company_name.trim()) {
      newErrors.company_name = "Please enter company name.";
    }

    if (Object.keys(newErrors).length > 0) {
      setValidationErrors(newErrors);
      setLoading(false);
      return;
    }

    // Step 2: Proceed with supplier creation if validations pass
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/supplier/create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        router.push("/suppliers");
      } else {
        const errorData = await response.json();
        alert(
          `Failed to create supplier: ${errorData.message || "Unknown error"}`
        );
      }
    } catch (error) {
      console.error("Error creating supplier:", error);
      alert("An error occurred while creating the supplier.");
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
          Create New Supplier
        </h1>
      </div>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <label className="block text-[#2D579A] mb-2">Supplier Name</label>
            <input
              type="text"
              name="supplier_name"
              value={formData.supplier_name}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {validationErrors.supplier_name && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.supplier_name}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Phone Number</label>
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {validationErrors.phone_number && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.phone_number}
              </p>
            )}
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {validationErrors.address && (
              <p className="text-red-600 text-sm mt-1">{validationErrors.address}</p>
            )}
          </div>
          <div>
            <label className="block text-[#2D579A] mb-2">Company Name</label>
            <input
              type="text"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {validationErrors.company_name && (
              <p className="text-red-600 text-sm mt-1">
                {validationErrors.company_name}
              </p>
            )}
          </div>
          <div className="flex justify-end space-x-3 mt-6 cursor-pointer">
            <Button onClick={handleSave} label="Create" variant="create" />
          </div>
        </div>
      </div>
    </div>
  );
}