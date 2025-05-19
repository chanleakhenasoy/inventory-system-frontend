"use client";

import { useState, useEffect } from "react";
import Pagination from "@/app/components/pagination";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function StockIn() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [stockIn, setStockIn] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const itemsPerPage = 10;

  useEffect(() => {
    const fetchStockIn = async () => {
      const token = localStorage.getItem("token");
      setError("");
      setLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockIn/getAll`,
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
          setStockIn(result.data || []);
        } else {
          const errorData = await response.json();
          setError(errorData.message || "Failed to fetch stock in.");
        }
      } catch (err) {
        setError("Network error. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchStockIn();
  }, []);

  const handleClickToStockinCreate = () => {
    router.push("/stockin/create");
  };

  const handleClickToStockinId = (id: any) => {
    router.push(`/stockin/${id}`);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Filter by product name (name_en inside items[])
  const filteredStockIn = stockIn.filter((stockin) =>
    stockin.items.some((item: any) =>
      item.name_en?.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const totalPages = Math.ceil(filteredStockIn.length / itemsPerPage);

  const displayedStockIn = filteredStockIn.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search */}
        <div className="mb-4 w-full sm:w-[50%]">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <input
              type="text"
              className="bg-white border border-gray-300 text-gray-600 text-sm rounded-3xl focus:outline-none focus:ring-1 focus:ring-[#2D579A] focus:border-[#2D579A] block w-full pl-10 p-2.5 transition-colors"
              placeholder="Search by product name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Stock In
          </h1>
          <Button onClick={handleClickToStockinCreate} label="Create" />
        </div>

        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">No</th>
                <th className="px-16 py-3 font-semibold text-[18px]">
                  Reference Number
                </th>
                <th className="px-12 py-3 font-semibold text-[18px]">
                  Product Name
                </th>
                <th className="px-14 py-3 font-semibold text-[18px]">
                  Supplier Name
                </th>
                <th className="px-14 py-3 font-semibold text-[18px]">
                  Quantity
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Created At
                </th>
                <th className="px-10 py-3 font-semibold text-[18px]">
                  Updated At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {displayedStockIn.map((stockin, stockinIndex) =>
                stockin.items.map((item: any, itemIndex: number) => {
                  if (
                    item.name_en
                      ?.toLowerCase()
                      .includes(searchTerm.toLowerCase())
                  ) {
                    return (
                      <tr
                        key={`${stockin.id}-${itemIndex}`}
                        className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer"
                        onClick={() => handleClickToStockinId(stockin.id)}
                      >
                        <td className="px-5 py-3">
                          {(currentPage - 1) * itemsPerPage + stockinIndex + 1}
                        </td>
                        <td className="px-14 py-3">
                          {stockin.reference_number}
                        </td>
                        <td className="px-14 py-3">{item.name_en}</td>
                        <td className="px-8 py-3">{stockin.supplier_name}</td>
                        <td className="px-8 py-3">{item.quantity}</td>
                        <td className="px-18 py-3">
                          {new Date(stockin.created_at).toLocaleString()}
                        </td>
                        <td className="px-2 py-3">
                          {new Date(stockin.updated_at).toLocaleString()}
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })
              )}
            </tbody>
          </table>
        </div>

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
