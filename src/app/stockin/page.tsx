"use client";

import { useState, useEffect } from "react";
import SearchBar from "@/app/components/search";
import Pagination from "@/app/components/pagination";
import Link from "next/link";
import Button from "../components/button";
import { useRouter } from "next/navigation";
import React from "react";

export default function StockIn() {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [stockIn, setStockIn] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("stock in", stockIn);

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
  }, [currentPage]);

  const handleClickToStockinCreate = () => {
    router.push("/stockin/create"); // Replace with your route
  };

  const handleClickToStockinId = (id: any) => {
    router.push("/stockin/[id]"); // Replace with your route
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const itemsPerPage = 10;
  const displayedStockin = Array.isArray(stockIn)
    ? stockIn.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : [];
  
  return (
    <div className="flex-1 flex flex-col overflow-hidden">
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mb-4 w-full sm:w-[50%]">
          <SearchBar />
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
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Reference Number
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Product Name
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Supplier Name
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Quantity
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Create At
                </th>
                <th className="px-6 py-3 font-semibold text-[18px]">
                  Update At
                </th>
              </tr>
            </thead>
            <tbody className="text-[#2B5190]">
              {displayedStockin.map((stockin, index) =>
                stockin.items.map((item: any, itemIndex: any) => (
                  <tr key={itemIndex} className="hover:bg-[#F3F3F3] h-[55px] cursor-pointer" onClick={() => handleClickToStockinId(stockin.id)}>
                    <td className="px-5 py-3">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                    <td className="px-14 py-3">{stockin.reference_number}</td>
                    <td className="px-14 py-3">{item.product_name}</td>
                    <td className="px-8 py-3">{stockin.supplier_name}</td>
                    <td className="px-8 py-3">{item.quantity}</td>
                    <td className="px-18 py-3">{new Date(stockin.created_at).toLocaleString()}</td>
                    <td className="px-2 py-3">{new Date(stockin.updated_at).toLocaleString()}</td>
                  </tr>
                ))
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
