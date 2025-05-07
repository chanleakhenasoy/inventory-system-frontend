"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";

export default function StockIn() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const stockIn = Array(10).fill({
    id: "001",
    product_name: "leakhena",
    supplier_name: "mararika",
    quantity: "34",
    createdAt: "2025-09-23",
    updatedAt: "2025-10-23",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search Bar */}
        <div className="mb-4 w-full sm:w-[50%]">
          <SearchBar />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Stock In</h1>
          <button className="px-6 py-1.5 bg-[#2D579A] text-white rounded-lg hover:bg-[#6499EF] transition cursor-pointer">
            create
          </button>
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Product Name
                </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Supplier Name
                </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                    Quantity
                    </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Create At
                </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Update At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {stockIn.map((stockin, index) => (
                <tr key={index} className="hover:bg-[#F3F3F3] h-[55px]">
                  <td className="px-5 py-3 text-[16px]">{stockin.id}</td>
                  <td className="px-4 py-3 text-[16px]">{stockin.product_name}</td>
                  <td className="px-4 py-3 text-[16px]">{stockin.supplier_name}</td>
                  <td className="px-4 py-3 text-[16px]">{stockin.quantity}</td>
                  <td className="px-4 py-3 text-[16px]">{stockin.createdAt}</td>
                  <td className="px-4 py-3 text-[16px]">{stockin.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 space-x-2">
          <Pagination
            totalPages={totalPages}
            initialPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      </main>
    </div>
  );
}
