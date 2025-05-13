"use client";

import Button from "@/app/components/button";
import type React from "react";
import BackButton from "@/app/components/backButton";
import { useState } from "react";

export default function CategoryDetail() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    employee: "",
    stockoutdate: "",
  });

  //   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //     const { name, value } = e.target
  //     setFormData((prev) => ({ ...prev, [name]: value }))
  //   }
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
  };

  const handleUpdate = () => {
    console.log("Updating category:", formData);
    // Here you would typically send the data to your backend
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      console.log("Deleting category:", formData);
      // Here you would typically send a delete request to your backend
    }
  };

  function handleSave(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-6">
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
          {/* Category Name */}
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Product Name</label>

            <div className="relative text-gray-600">
              <select
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="" className="text-gray-600">
                  Select a product
                </option>
                <option value="Banana" className="text-gray-600">
                  Banana
                </option>
                <option value="Apple" className="text-gray-600">
                  Apple
                </option>
                <option value="Bike" className="text-gray-600">
                  Bike
                </option>
              </select>

              {/* Custom dropdown icon */}
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
          </div>

          {/* Description */}
          <div>
            <label className="block text-[#2D579A] mb-2">Quantity</label>
            <input
              type="text"
              name="phoneNumber"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Employee</label>

            <div className="relative text-gray-600">
              <select
                name="productName"
                value={formData.productName}
                onChange={handleChange}
                className="w-full p-2 pr-10 text-[#2D579A] border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none"
              >
                <option value="" className="text-gray-600">
                  Select a product
                </option>
                <option value="Banana" className="text-gray-600">
                  Rika
                </option>
                <option value="Apple" className="text-gray-600">
                  Leakhena
                </option>
                <option value="Bike" className="text-gray-600">
                  Sophea
                </option>
              </select>

              {/* Custom dropdown icon */}
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
          </div>

          <div className="relative">
  <label className="block text-[#2D579A] mb-2">Stock Out Date</label>

  <div className="relative">
    {/* Main date input */}
    <input 
      id="stockoutdate"
      type="date"
      name="stockoutdate"
      value={formData.stockoutdate}
      onChange={handleChange}
      className="w-full p-2 pr-10 text-[#2D579A] border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 appearance-none 
        [&::-webkit-calendar-picker-indicator]:opacity-0"
    />

    {/* Custom calendar icon */}
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

    {/* Transparent clickable input to trigger calendar, bound to same state */}
    <input 
      type="date"
      name="stockoutdate"
      value={formData.stockoutdate}
      onChange={handleChange}
      className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
    />
  </div>
</div>






          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6 cursor-pointer">
            <Button onClick={handleSave} label="Save" variant="save" />
          </div>
        </div>
      </div>
    </div>
  );
}
