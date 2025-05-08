"use client";

import Button from "@/app/components/button";
import { Calendar } from "lucide-react";
import type React from "react";

import { useState } from "react";

export default function CreateNewStockOut() {
  const [formData, setFormData] = useState({
    productName: "",
    quantity: "",
    employee: "",
    stockOutDate: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function handleSave(): void {
    throw new Error("Function not implemented.");
  }

  return (
    <div className="p-6">
      <h1 className="text-[30px] font-bold text-[#2D579A] mb-12">
        Create New Stock Out
      </h1>

      <div className="bg-white rounded-lg p-6 shadow-sm">
        <div className="space-y-6">
          {/* Category Name */}
          <div>
            <label className="block text-[#2D579A] mb-2">Product Name</label>
            <input
              type="text"
              name="supplierName"
              value={formData.productName}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
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
          <div>
            <label className="block text-[#2D579A] mb-2">Employee</label>
            <input
              type="text"
              name="address"
              value={formData.employee}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          <div className="relative">
            <label className="block text-[#2D579A] mb-2">Stock Out Date</label>
            <input
              type="text"
              name="companyName"
              value={formData.stockOutDate}
              onChange={handleChange}
              className="w-full p-2 text-black border-gray-300 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 pr-10"
            />
            <Calendar
              className="absolute right-3 top-[2.6rem] text-gray-500 cursor-pointer"
              size={20}
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 mt-6">
            <Button onClick={handleSave} label="Save" variant="save" />
          </div>
        </div>
      </div>
    </div>
  );
}
