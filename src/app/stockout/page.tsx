"use client";

import { useEffect, useState } from "react";
import Button from "@/app/components/button";
import Pagination from "@/app/components/pagination";
import { useRouter } from "next/navigation";

export default function StockOut() {
  const router = useRouter();
  const [stockouts, setStockouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Fetch data
  useEffect(() => {
    fetchStockouts(1);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [stockouts]);

  const fetchStockouts = async (page: number) => {
    const token = localStorage.getItem("token");
    setError("");
    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockout/getAll?page=${page}&limit=${itemsPerPage}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const result = await response.json();

      if (response.ok) {
        setStockouts(result.data || []); // Always update the suppliers, even if empty
        setCurrentPage(page);
        if ((result.data || []).length === 0) {
        }
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to fetch stock out.");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Filtered data based on search
  const filteredStockouts = stockouts.filter((item) =>
    item.name_en?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredStockouts.length / itemsPerPage);

  const displayedStockouts = filteredStockouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    fetchStockouts(page);
    // setCurrentPage(page);
  };

  const handleClickToStockoutCreate = () => {
    router.push("/stockout/create");
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [stockouts]);

  return (
    <div className="flex-1 flex flex-col overflow-hidden mt-25">
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
                xmlns="http://www.w3.org/2000/svg"
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
              placeholder="Product Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">
            Stock Out
          </h1>
          <Button onClick={handleClickToStockoutCreate} label="Create" />
        </div>

        {/* Error Message */}
        {error && <p className="text-red-500">{error}</p>}

        {/* Table */}
        <div className="overflow-x-auto bg-white rounded-md mt-10">
          <table className="min-w-full text-center">
            <thead className="bg-[#EEF1F7] text-[#2D579A] h-[70px]">
              <tr>
                <th className="px-6 py-3 font-semibold">No</th>
                <th className="px-20 py-3 font-semibold text-[18px]">
                  Product Name
                </th>
                <th className="px-16 py-3 font-semibold text-[18px]">
                  Quantity
                </th>
                <th className="px-20 py-3 font-semibold text-[18px]">
                  Employee
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Stock Out Date
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {stockouts.length > 0 ? (
                stockouts.map((stockout: any, index) => (
                  <tr key={stockout.id ?? index} className="hover:bg-[#F3F3F3] h-[55px]">
                    <td className="px-6 py-3 text-[16px]">
                      {(currentPage - 1) * itemsPerPage + index + 1}
                    </td>
                    <td className="px-6 py-3 text-[16px]">
                      {stockout.name_en}
                    </td>
                    <td className="px-6 py-3 text-[16px]">
                      {stockout.quantity}
                    </td>
                    <td className="px-6 py-3 text-[16px]">
                      {stockout.user_name}
                    </td>
                    <td className="px-6 py-3 text-[16px]">
                      {new Date(stockout.created_at).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                  This page data is empty.
                  </td>
                </tr>
              )}
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
