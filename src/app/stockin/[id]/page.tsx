"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import Button from "@/app/components/button";
import BackButton from "@/app/components/backButton";
import { useState } from "react";

export default function StockInDetail() {
  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleUpdate = () => {
    console.log("Update button clicked");
  };

  const [formData, setFormData] = useState({
    stockinDate: "",
    expireDate: "",
  });

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

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Content */}
        <main className="flex-1 p-6">
          <div className="flex items-center mb-4">
            <div className="mt-4.5 mr-4">
              <BackButton />
            </div>
            <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
              Stock In Detail
            </h1>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left Column */}
                <div>
                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Reference Name
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Product</label>
                    <input
                      type="text"
                      defaultValue=""
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Quantity
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Total Price
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>
                </div>

                {/* Right Column */}
                <div>
                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Supplier
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>

                  <div className="relative">
                    <label className="block text-[#2D579A] mb-2">
                      Stock In Date
                    </label>

                    <div className="relative">
                      {/* Main date input */}
                      <input
                        type="Date"
                        name="stockinDate"
                        value={formData.stockinDate}
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
                        type="Date"
                        name="stockinDate"
                        value={formData.stockinDate}
                        onChange={handleChange}
                        className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="mb-4 mt-4">
                    <label className="block text-[#2D579A] mb-2">
                      Unit Price
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
                    />
                  </div>

                  {/* Stockin Date */}
                  <div className="relative">
                    <label className="block text-[#2D579A] mb-2">
                      Stock In Date
                    </label>

                    <div className="relative">
                      {/* Main date input */}
                      <input
                        type="Date"
                        name="expireDate"
                        value={formData.expireDate}
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
                        type="Date"
                        name="expireDate"
                        value={formData.expireDate}
                        onChange={handleChange}
                        className="absolute inset-y-0 right-3 w-5 opacity-0 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <Button
                  onClick={handleDelete}
                  label="Delete"
                  variant="delete"
                />
                <Button
                  onClick={handleUpdate}
                  label="Update"
                  variant="update"
                />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
