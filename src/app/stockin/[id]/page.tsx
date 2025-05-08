"use client";

import Image from "next/image";
import { Calendar } from "lucide-react";
import Button from "@/app/components/button";

export default function StockInDetail() {
  const handleDelete = () => {
    console.log("Delete button clicked");
  };

  const handleUpdate = () => {
    console.log("Update button clicked");
  };

  return (
    <div className="flex h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col ">
        {/* Content */}
        <main className="flex-1 p-6">
          <h1 className="text-[30px] font-bold text-[#2D579A] mb-9">
            Stock In Detail
          </h1>

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
                      defaultValue="Mararika"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">Product</label>
                    <input
                      type="text"
                      defaultValue="Mararika"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Quantity
                    </label>
                    <input
                      type="text"
                      defaultValue="34"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Total Price
                    </label>
                    <input
                      type="text"
                      defaultValue="100.00"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
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
                      defaultValue="Mararika Supplier"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Stock In Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="2025-09-23"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Unit Price
                    </label>
                    <input
                      type="text"
                      defaultValue="10.00"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="block text-[#2D579A] mb-2">
                      Expire Date
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        defaultValue="2025-12-31"
                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                      <Calendar
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                        size={20}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-3 mt-6">
                <Button onClick={handleDelete} label="Delete" variant="delete" />
                <Button onClick={handleUpdate} label="Update" variant="update" />
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}
