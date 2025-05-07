"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";

export default function Supplier() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  const suppliers = Array(10).fill({
    id: "001",
    name: "2437658765",
    phone: "2437658765",
    address: "Football",
    company: "Football",
    createdAt: "2025-09-23",
    updatedAt: "2025-09-23",
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
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Supplier</h1>
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
                <th className="px-8 py-3 font-semibold text-[18px]">
                  Supplier Name
                </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Phone Number
                </th>
                <th className="px-10 py-3 font-semibold text-[18px]">
                    Address
                    </th>
                <th className="px-4 py-3 font-semibold text-[18px]">
                  Company Name
                </th>
                <th className="px-10 py-3 font-semibold text-[18px]">
                  Create At
                </th>
                <th className="px-2 py-3 font-semibold text-[18px]">
                  Update At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {suppliers.map((supplier, index) => (
                <tr key={index} className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer">
                  <td className="px-5 py-3 text-[16px]">{supplier.id}</td>
                  <td className="px-8 py-3 text-[16px]">{supplier.name}</td>
                  <td className="px-4 py-3 text-[16px]">{supplier.phone}</td>
                  <td className="px-10 py-3 text-[16px]">{supplier.address}</td>
                  <td className="px-4 py-3 text-[16px]">{supplier.company}</td>
                  <td className="px-10 py-3 cursor-pointer text-[16px]">
                    {supplier.createdAt}
                  </td>
                  <td className="px-3 py-3 text-[16px]">
                    {supplier.updatedAt}
                  </td>
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
