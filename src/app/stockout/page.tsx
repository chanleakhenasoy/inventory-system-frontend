"use client";

import { useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import { useRouter } from "next/navigation";
import Button from "../components/button";

export default function StockOut() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
    const router = useRouter();

  const stockOut = Array(10).fill({
    id: "001",
    product_name: "Bikecycle",
    quantity: "12",
    employee: "Sopheak",
    stockout_date: "2025-10-23",
  });

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  function handleCreat() {
    router.push("/stockout/create");
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search Bar */}
        <div className="mb-4 w-full sm:w-[50%]">
          <SearchBar />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Stock Out
          </h1>

          <Button onClick={handleCreat} label="Create" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-left">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">ID</th>
                <th className="px-34 py-3 font-semibold text-[18px]">
                  Product Name
                </th>
                <th className="px-18 py-3 font-semibold text-[18px]">
                    Quantity
                    </th>
                <th className="px-30 py-3 font-semibold text-[18px]">
                  Employee
                </th>
                <th className="px-2 py-3 font-semibold text-[18px]">
                  Stock Out Date
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {stockOut.map((stockout, index) => (
                <tr key={index} className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer">
                  <td className="px-6 py-3 text-[16px]">{stockout.id}</td>
                  <td className="px-34 py-3 text-[16px]">{stockout.product_name}</td>
                  <td className="px-18 py-3 text-[16px]">{stockout.quantity}</td>
                  <td className="px-30 py-3 text-[16px]">{stockout.employee}</td>
                  <td className="px-2 py-3 text-[16px]">{stockout.stockout_date}</td>
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
