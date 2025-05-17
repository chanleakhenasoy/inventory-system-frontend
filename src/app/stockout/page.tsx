"use client";

import { useEffect, useState } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import Button from "@/app/components/button";
import { useRouter } from "next/navigation";

export default function StockOut() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [stockouts, setStockouts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(stockouts)

  useEffect(() => {
      const fetchStockouts = async () => {
        const token = localStorage.getItem("token");
        setError("");
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/stockout/getAll`,
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
            setStockouts(result.data); // Adjust according to your API response structure
          } else {
            const errorData = await response.json();
            setError(errorData.message || "Failed to fetch stockout.");
          }
        } catch (err) {
          setError("Network error. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchStockouts();
    }, [currentPage]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleClickToStockoutCreate = () => {
    router.push("/stockout/create"); // Replace with your route
  };

  const itemsPerPage = 10;
  const displayedStockout = Array.isArray(stockouts) ? stockouts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  ) : [];


  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        {/* Search Bar */}
        <div className="mb-4 w-full sm:w-[50%]">
          <SearchBar />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[30px] font-bold text-[#2D579A] mt-4">Stock Out</h1>
          <Button onClick={handleClickToStockoutCreate} label="Create" />
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
            {displayedStockout.length > 0 ? (
                displayedStockout.map((stockout: any, index) => (
                <tr key={index} className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer">
                  <td className="px-6 py-3 text-[16px]">
                    {(currentPage - 1) * itemsPerPage + index + 1}</td>
                  <td className="px-34 py-3 text-[16px]">{stockout.name_en}</td>
                  <td className="px-18 py-3 text-[16px]">{stockout.quantity}</td>
                  <td className="px-30 py-3 text-[16px]">{stockout.user_name}</td>
                  <td className="px-2 py-3 text-[16px]"> {new Date(stockout.created_at).toLocaleString()}</td>
                </tr>
              ))
              ) : (
                <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No suppliers found.
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
